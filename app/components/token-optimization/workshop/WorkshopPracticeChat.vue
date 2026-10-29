<template>
  <div class="ws-chat">
    <p class="ws-chat-task">{{ task }}</p>
    <div ref="scrollEl" class="ws-chat-log">
      <div v-for="(m, i) in messages" :key="i" class="ws-chat-msg" :class="`ws-chat-msg--${m.role}`">
        <span v-if="m.usage" class="ws-chat-usage">{{ m.usage }} tokens</span>
        {{ m.content }}
      </div>
    </div>
    <form class="ws-chat-form" @submit.prevent="send">
      <input
        v-model="draft"
        type="text"
        class="ws-chat-input"
        :placeholder="placeholder"
        :disabled="sending"
        autocomplete="off"
      />
      <button type="submit" class="ws-btn ws-btn--sm" :disabled="sending || !draft.trim()">
        {{ sending ? '…' : 'Enviar' }}
      </button>
    </form>
    <p v-if="status" class="ws-chat-status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import type { RunResponse } from '~/composables/useTokenOptimization'

const props = defineProps<{
  levelId: number
  task: string
  placeholder?: string
}>()

const { sendChat } = useTokenOptimization()

type UiMessage = { role: 'user' | 'assistant'; content: string; usage?: number }

const messages = ref<UiMessage[]>([])
const draft = ref('')
const sending = ref(false)
const status = ref('')
const scrollEl = ref<HTMLElement | null>(null)

async function send() {
  const text = draft.value.trim()
  if (!text || sending.value) {
    return
  }
  messages.value.push({ role: 'user', content: text })
  draft.value = ''
  sending.value = true
  status.value = ''
  try {
    const history = messages.value.slice(0, -1).map((m) => ({ role: m.role, content: m.content }))
    const res = await sendChat(props.levelId, text, history)
    applyStatus(res)
    messages.value.push({
      role: 'assistant',
      content: res.output,
      usage: res.usage?.totalTokens
    })
  } catch {
    status.value = 'Erro de rede. Tente de novo.'
  } finally {
    sending.value = false
    await nextTick()
    scrollEl.value?.scrollTo({ top: scrollEl.value.scrollHeight, behavior: 'smooth' })
  }
}

function applyStatus(res: RunResponse) {
  if (res.throttled) {
    status.value = 'Limite do lab: resposta simulada.'
  } else if (res.mode === 'fallback') {
    status.value = 'Sem chave ou limite: modo demonstração.'
  } else if (res.sdkError) {
    status.value = 'SDK indisponível: fallback.'
  } else {
    status.value = ''
  }
}
</script>
