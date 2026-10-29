<template>
  <aside
    ref="drawerEl"
    class="section-agent-drawer"
    :class="drawerClass"
    :aria-hidden="phase === 'closed'"
    aria-label="Agente da seção"
  >
    <header class="section-agent-drawer__head">
      <h2 class="section-agent-drawer__title">{{ title }}</h2>
      <button type="button" class="section-agent-drawer__close" aria-label="Fechar" @click="emit('close')">
        ×
      </button>
    </header>
    <div ref="scrollEl" class="section-agent-drawer__transcript">
      <template v-for="(entry, idx) in transcript" :key="idx">
        <p v-if="entry.kind === 'user'" class="section-agent-drawer__user">{{ entry.text }}</p>
        <p v-else-if="entry.kind === 'thought'" class="section-agent-drawer__thought">{{ entry.text }}</p>
        <div v-else-if="entry.kind === 'tool'" class="section-agent-drawer__tool">
          <span class="section-agent-drawer__tool-label">{{ entry.label }}</span>
          <span class="section-agent-drawer__tool-path">{{ entry.path }}</span>
          <span v-if="entry.added" class="section-agent-drawer__tool-add">+{{ entry.added }}</span>
          <span v-if="entry.removed" class="section-agent-drawer__tool-del">−{{ entry.removed }}</span>
        </div>
        <p v-else class="section-agent-drawer__assistant">{{ entry.text }}</p>
      </template>
    </div>
    <div class="section-agent-drawer__composer">
      <div v-if="chips.length" class="section-agent-drawer__chips">
        <span v-for="chip in chips" :key="chip.key" class="section-agent-drawer__chip">{{ chip.label }}</span>
      </div>
      <textarea
        :value="draft"
        class="section-agent-drawer__textarea"
        rows="3"
        :placeholder="draft ? '' : 'Plan, search, build anything...'"
        @input="onDraftInput"
      />
      <div class="section-agent-drawer__footer">
        <span class="section-agent-drawer__pill">Agent</span>
        <span class="section-agent-drawer__pill">Composer 2.5</span>
        <button
          type="button"
          class="section-agent-drawer__send"
          :disabled="!draft.trim() || sendPhase === 'sending'"
          aria-label="Enviar"
          @click="emit('send')"
        >
          ↑
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { DrawerPhase, SendPhase } from '~/data/token-optimization-section-prompts'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

export type SectionAgentChip = { key: string; label: string }

export type SectionAgentTranscriptEntry =
  | { kind: 'user'; text: string }
  | { kind: 'assistant'; text: string }
  | { kind: 'thought'; text: string }
  | {
      kind: 'tool'
      path: string
      label: string
      tone: 'mcp' | 'file'
      added?: number
      removed?: number
    }

const props = defineProps<{
  phase: DrawerPhase
  title: string
  draft: string
  chips: SectionAgentChip[]
  transcript: SectionAgentTranscriptEntry[]
  sendPhase: SendPhase
}>()

const emit = defineEmits<{
  close: []
  'update:draft': [value: string]
  send: []
}>()

const reduced = usePrefersReducedMotion()
const drawerEl = ref<HTMLElement | null>(null)
const scrollEl = ref<HTMLElement | null>(null)
const visibilityHidden = ref(true)

const drawerClass = computed(() => ({
  'section-agent-drawer--open': props.phase === 'open',
  'section-agent-drawer--closed': props.phase !== 'open',
  'section-agent-drawer--no-motion': reduced.value,
  'section-agent-drawer--hidden': visibilityHidden.value
}))

watch(
  () => props.phase,
  (next, prev) => {
    if (next !== 'closed') {
      visibilityHidden.value = false
    }
    if (prev !== 'closed' && next === 'closed' && reduced.value) {
      visibilityHidden.value = true
    }
  }
)

function onDrawerTransitionEnd(event: TransitionEvent) {
  if (event.propertyName !== 'transform') {
    return
  }
  if (props.phase === 'closed') {
    visibilityHidden.value = true
  }
}

onMounted(() => {
  drawerEl.value?.addEventListener('transitionend', onDrawerTransitionEnd as EventListener)
})

onBeforeUnmount(() => {
  drawerEl.value?.removeEventListener('transitionend', onDrawerTransitionEnd as EventListener)
})

watch(
  () => props.transcript.length,
  () => {
    nextTick(() => {
      const el = scrollEl.value
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    })
  }
)

function onDraftInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:draft', target.value)
}
</script>

<style src="./section-agent-drawer.css" scoped></style>
