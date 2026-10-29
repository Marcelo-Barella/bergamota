<template>
  <div class="token-opt-sala-page">
    <iframe class="token-opt-sala-frame" src="/token-optimization/sala.html" title="Lição" />
    <SectionAgentDrawer
      :phase="drawerPhase"
      :title="drawerTitle"
      :draft="activeDraft"
      :chips="drawerChips"
      :transcript="activeTranscript"
      :send-phase="sendPhase"
      @close="closeDrawer"
      @update:draft="onDraftUpdate"
      @send="onSend"
    />
  </div>
</template>

<script setup lang="ts">
import {
  type DrawerPhase,
  type SendPhase,
  sectionPromptById
} from '~/data/token-optimization-section-prompts'
import SectionAgentDrawer from '~/components/token-optimization/SectionAgentDrawer.vue'
import type {
  SectionAgentChip,
  SectionAgentTranscriptEntry
} from '~/components/token-optimization/SectionAgentDrawer.vue'

definePageMeta({ layout: false })

useHead({
  title: 'Otimização de tokens — Bergamota',
  meta: [
    {
      name: 'description',
      content: 'Lab interativo: contexto, tokens e eficiência no Cursor (Composer-2.5).'
    }
  ],
  htmlAttrs: { class: 'dark' }
})

const drawerPhase = ref<DrawerPhase>('closed')
const sendPhase = ref<SendPhase>('idle')
const activeSectionId = ref<string | null>(null)
const drafts = ref<Record<string, string>>({})
const transcripts = ref<Record<string, SectionAgentTranscriptEntry[]>>({})
const acpEverOpened = ref(false)
let eventSource: EventSource | null = null

const drawerTitle = computed(() => {
  if (!activeSectionId.value) {
    return ''
  }
  return sectionPromptById(activeSectionId.value)?.title ?? activeSectionId.value
})

const activeDraft = computed(() => {
  const id = activeSectionId.value
  if (!id) {
    return ''
  }
  return drafts.value[id] ?? ''
})

const activeTranscript = computed(() => {
  const id = activeSectionId.value
  if (!id) {
    return []
  }
  return transcripts.value[id] ?? []
})

const drawerChips = computed((): SectionAgentChip[] => {
  const id = activeSectionId.value
  if (!id) {
    return []
  }
  const entry = sectionPromptById(id)
  if (!entry) {
    return []
  }
  const chips: SectionAgentChip[] = []
  if (entry.file) {
    chips.push({ key: 'file', label: `@ ${entry.file}` })
  }
  chips.push({ key: 'chat', label: entry.chat })
  if (entry.rule) {
    chips.push({ key: 'rule', label: entry.rule })
  }
  if (entry.skill) {
    chips.push({ key: 'skill', label: entry.skill })
  }
  return chips
})

function ensureDraft(id: string) {
  if (drafts.value[id] != null && drafts.value[id] !== '') {
    return
  }
  const preset = sectionPromptById(id)?.preset ?? ''
  drafts.value = { ...drafts.value, [id]: preset }
}

function ensureTranscript(id: string) {
  if (!transcripts.value[id]) {
    transcripts.value = { ...transcripts.value, [id]: [] }
  }
}

function openDrawerForSection(id: string) {
  activeSectionId.value = id
  ensureDraft(id)
  ensureTranscript(id)
  acpEverOpened.value = true
  ensureEventSource()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  drawerPhase.value = 'opening'
  if (reduceMotion) {
    drawerPhase.value = 'open'
    return
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (activeSectionId.value === id && drawerPhase.value === 'opening') {
        drawerPhase.value = 'open'
      }
    })
  })
}

function closeDrawer() {
  drawerPhase.value = 'closed'
}

function onDraftUpdate(value: string) {
  const id = activeSectionId.value
  if (!id) {
    return
  }
  drafts.value = { ...drafts.value, [id]: value }
}

function buildPromptLines(id: string, body: string): string {
  const entry = sectionPromptById(id)
  const lines: string[] = [`Section: ${entry?.title ?? id}`]
  if (entry?.file) {
    lines.push(`File: ${entry.file}`)
  }
  lines.push(`Chat: ${entry?.chat ?? id}`)
  if (entry?.rule) {
    lines.push(`Rule: ${entry.rule}`)
  }
  if (entry?.skill) {
    lines.push(`Skill: ${entry.skill}`)
  }
  lines.push(body.trim())
  return lines.join('\n')
}

function appendTranscript(id: string, entry: SectionAgentTranscriptEntry) {
  ensureTranscript(id)
  const list = [...(transcripts.value[id] ?? []), entry]
  transcripts.value = { ...transcripts.value, [id]: list }
}

function appendAssistantChunk(id: string, chunk: string) {
  ensureTranscript(id)
  const list = [...(transcripts.value[id] ?? [])]
  const last = list[list.length - 1]
  if (last?.kind === 'assistant') {
    list[list.length - 1] = { kind: 'assistant', text: last.text + chunk }
  } else {
    list.push({ kind: 'assistant', text: chunk })
  }
  transcripts.value = { ...transcripts.value, [id]: list }
}

function parseAcpPayload(data: Record<string, unknown>): SectionAgentTranscriptEntry | null {
  if (data.type !== 'session_update') {
    return null
  }
  const payload = data.payload as { update?: Record<string, unknown> }
  const update = payload?.update ?? {}
  const kind = String(update.sessionUpdate ?? update.type ?? '')
  if (kind.includes('think') || kind === 'agent_thinking') {
    const text = String(update.text ?? update.content ?? '').slice(0, 400)
    if (!text) {
      return null
    }
    return { kind: 'thought', text }
  }
  if (kind === 'agent_message_chunk') {
    const content = update.content as { text?: string }
    const text = content?.text ?? ''
    return text ? { kind: 'assistant', text } : null
  }
  if (kind === 'tool_call' || update.name) {
    const name = String(update.name ?? 'tool')
    const args = update.args as { path?: string } | undefined
    const tone = name.toLowerCase().includes('mcp') ? 'mcp' : 'file'
    return {
      kind: 'tool',
      path: String(args?.path ?? update.path ?? name),
      label: name,
      tone
    }
  }
  if (kind.includes('edit') || kind.includes('write') || update.path) {
    const preview = String(update.preview ?? '')
    const added = preview.split('\n').filter((line) => line.startsWith('+')).length
    const removed = preview.split('\n').filter((line) => line.startsWith('-')).length
    return {
      kind: 'tool',
      path: String(update.path ?? 'arquivo'),
      label: String(update.operation ?? kind),
      tone: 'file',
      added: added || undefined,
      removed: removed || undefined
    }
  }
  return null
}

function handleAcpMessage(raw: string) {
  const id = activeSectionId.value
  if (!id) {
    return
  }
  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    const entry = parseAcpPayload(data)
    if (!entry) {
      return
    }
    if (entry.kind === 'assistant' && entry.text) {
      appendAssistantChunk(id, entry.text)
      return
    }
    appendTranscript(id, entry)
  } catch {
    return
  }
}

function ensureEventSource() {
  if (!import.meta.client || eventSource) {
    return
  }
  eventSource = new EventSource('/api/token-optimization/acp/events')
  eventSource.onmessage = (message) => {
    handleAcpMessage(message.data)
  }
}

function onSectionMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) {
    return
  }
  const data = event.data as { type?: string; id?: string; title?: string }
  if (data.type !== 'section-agent-open' || !data.id) {
    return
  }
  openDrawerForSection(data.id)
}

async function onSend() {
  const id = activeSectionId.value
  if (!id) {
    return
  }
  const body = drafts.value[id]?.trim() ?? ''
  if (!body || sendPhase.value === 'sending') {
    return
  }
  appendTranscript(id, { kind: 'user', text: body })
  sendPhase.value = 'sending'
  const prompt = buildPromptLines(id, body)
  try {
    await $fetch('/api/token-optimization/acp/prompt', {
      method: 'POST',
      body: { prompt, model: 'composer-2.5' }
    })
    sendPhase.value = 'idle'
  } catch (e) {
    sendPhase.value = 'failed'
    const message = e instanceof Error ? e.message : 'Erro ao enviar prompt'
    appendTranscript(id, { kind: 'assistant', text: message })
  }
}

onMounted(() => {
  window.addEventListener('message', onSectionMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onSectionMessage)
  eventSource?.close()
  eventSource = null
})
</script>

<style scoped>
.token-opt-sala-page {
  position: fixed;
  inset: 0;
  background: #f8f6f3;
}

.token-opt-sala-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
