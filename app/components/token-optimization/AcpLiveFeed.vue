<template>
  <div>
    <p class="token-opt-stats">
      Feed <strong>ACP</strong> (Agent Client Protocol) via <code>agent acp</code> — stdio JSON-RPC. Eventos em tempo real
      para a sala (thinking, tools, texto). Token usage: repassado quando o payload incluir campos
      <code>usage</code> (não confirmado na doc pública do Cursor).
    </p>
    <div class="token-opt-stats" aria-live="polite">
      <span>Estado: <strong>{{ statusLabel }}</strong></span>
      <span v-if="lastUsage">Último usage: <strong>{{ lastUsage }}</strong></span>
    </div>
    <label class="sr-only" for="acp-prompt">Prompt ACP</label>
    <textarea id="acp-prompt" v-model="prompt" class="token-opt-textarea" rows="3" />
    <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap">
      <button type="button" class="token-opt-btn" :disabled="sending" @click="sendPrompt">Enviar via ACP</button>
      <button type="button" class="token-opt-btn" :disabled="cloudRunning" @click="runCloud">Cloud Agent (SDK)</button>
    </div>
    <div
      ref="feedEl"
      class="token-opt-status token-opt-feed"
      role="log"
      aria-label="Eventos ACP"
      tabindex="0"
    >
      <div v-for="(line, idx) in lines" :key="idx" class="token-opt-feed-line">
        <span class="token-opt-feed-type">{{ line.type }}</span>
        <span>{{ line.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const prompt = ref('Explique em 2 frases o que é um token no contexto do Cursor.')
const lines = ref<Array<{ type: string; text: string }>>([])
const connected = ref(false)
const sending = ref(false)
const cloudRunning = ref(false)
const lastUsage = ref('')
const feedEl = ref<HTMLElement | null>(null)

const statusLabel = computed(() => {
  if (connected.value) {
    return 'conectado ao SSE'
  }
  return 'conectando…'
})

function pushLine(type: string, text: string) {
  lines.value.push({ type, text })
  if (lines.value.length > 120) {
    lines.value.shift()
  }
  nextTick(() => {
    feedEl.value?.scrollTo({ top: feedEl.value.scrollHeight, behavior: 'smooth' })
  })
}

function formatEvent(data: Record<string, unknown>) {
  if (data.type === 'meta') {
    return `meta — ACP ${data.acpEnabled ? 'on' : 'off'}, CLI ${data.agentCliFound ? 'ok' : 'ausente'}`
  }
  if (data.type === 'token_usage') {
    const p = data.payload as Record<string, number | string | boolean>
    lastUsage.value = `${p.totalTokens} tokens (${p.source}${p.unconfirmed ? ', não confirmado' : ''})`
    return lastUsage.value
  }
  if (data.type === 'session_update') {
    const payload = data.payload as { update?: Record<string, unknown> }
    const update = payload.update ?? {}
    const kind = String(update.sessionUpdate ?? 'update')
    if (kind === 'agent_message_chunk') {
      const content = update.content as { text?: string }
      return content?.text ?? '(chunk)'
    }
    return `${kind}: ${JSON.stringify(update).slice(0, 240)}`
  }
  return JSON.stringify(data).slice(0, 280)
}

onMounted(() => {
  const source = new EventSource('/api/token-optimization/acp/events')
  source.onopen = () => {
    connected.value = true
  }
  source.onmessage = (message) => {
    try {
      const data = JSON.parse(message.data) as Record<string, unknown>
      pushLine(String(data.type ?? 'event'), formatEvent(data))
    } catch {
      pushLine('raw', message.data)
    }
  }
  source.onerror = () => {
    connected.value = false
    pushLine('error', 'SSE desconectado — recarregue a página se o feed parar.')
  }
  onBeforeUnmount(() => source.close())
})

async function sendPrompt() {
  sending.value = true
  try {
    const res = await $fetch<{ ok: boolean; mode: string; note?: string }>('/api/token-optimization/acp/prompt', {
      method: 'POST',
      body: { prompt: prompt.value }
    })
    pushLine('api', `${res.mode}: ${res.note ?? 'ok'}`)
  } catch (e) {
    pushLine('api', e instanceof Error ? e.message : 'erro ao enviar')
  } finally {
    sending.value = false
  }
}

async function runCloud() {
  cloudRunning.value = true
  try {
    const res = await $fetch<{ mode: string; runtime?: string; output?: string; note?: string }>(
      '/api/token-optimization/cloud-run',
      { method: 'POST', body: { prompt: prompt.value } }
    )
    pushLine('sdk-cloud', `${res.mode}/${res.runtime ?? 'n/a'}: ${res.note ?? ''}`)
    if (res.output) {
      pushLine('sdk-cloud-out', res.output)
    }
  } catch (e) {
    pushLine('sdk-cloud', e instanceof Error ? e.message : 'erro cloud')
  } finally {
    cloudRunning.value = false
  }
}
</script>

<style scoped>
.token-opt-feed {
  margin-top: 0.75rem;
  max-height: 16rem;
  overflow: auto;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
}

.token-opt-feed-line {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0.5rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--tok-border) 50%, transparent);
}

.token-opt-feed-type {
  color: var(--tok-accent);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
