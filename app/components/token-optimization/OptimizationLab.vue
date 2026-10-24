<template>
  <div>
    <p class="token-opt-stats">
      Ative otimizações para ver economia estimada. Use <strong>Medir com SDK</strong> quando
      <code>CURSOR_API_KEY</code> estiver configurada no servidor.
      <span v-if="config"> Modo servidor: {{ config.hasApiKey ? 'live disponível' : 'somente fallback' }}.</span>
    </p>
    <div class="token-opt-toggle-grid">
      <div v-for="scenario in scenarios" :key="scenario.id" class="token-opt-card">
        <h3>{{ scenario.title }}</h3>
        <p>{{ scenario.description }}</p>
        <label class="token-opt-stats" style="display: flex; gap: 0.4rem; align-items: center; margin-top: 0.5rem">
          <input v-model="enabled[scenario.id]" type="checkbox" />
          Aplicar neste exercício
        </label>
        <div class="token-opt-compare">
          <span>Antes: ~{{ formatNumber(scenario.beforeTokens) }} tokens</span>
          <span>Depois: ~{{ formatNumber(effectiveAfter(scenario)) }} tokens</span>
          <span>Economia: ~{{ savingsPercent(scenario) }}%</span>
          <span>Custo estimado depois: {{ formatCost(estimateCost(effectiveAfter(scenario))) }}</span>
        </div>
      </div>
    </div>
    <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem">
      <button type="button" class="token-opt-btn" :disabled="running" @click="measure('verbose')">
        Medir prompt verboso
      </button>
      <button type="button" class="token-opt-btn" :disabled="running" @click="measure('concise')">
        Medir prompt conciso
      </button>
    </div>
    <div v-if="lastRun" class="token-opt-status" aria-live="polite">
      <p>
        <strong>{{ lastRun.mode === 'live' ? 'SDK (live)' : 'Fallback / estimativa' }}</strong>
        — {{ lastRun.note }}
        <span v-if="lastRun.throttled"> (limite: {{ lastRun.throttleReason }})</span>
        <span v-if="lastRun.sdkError"> Erro SDK: {{ lastRun.sdkError }}</span>
      </p>
      <p v-if="lastRun.usage">
        Tokens: entrada {{ lastRun.usage.inputTokens }}, saída {{ lastRun.usage.outputTokens }}, total
        {{ lastRun.usage.totalTokens }} ({{ lastRun.usage.source }})
      </p>
      <p v-if="lastRun.cost">Custo {{ lastRun.cost.label }}: ~US$ {{ lastRun.cost.costUsd.toFixed(4) }}</p>
      <div class="token-opt-output">{{ lastRun.output }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RunResponse, TokenOptConfig } from '~/composables/useTokenOptimization'

const props = defineProps<{
  config: TokenOptConfig | null
}>()

const { runDemo } = useTokenOptimization()
const running = ref(false)
const lastRun = ref<RunResponse | null>(null)

const scenarios = computed(() => props.config?.scenarios ?? [])

const enabled = reactive<Record<string, boolean>>({
  prompt: true,
  context: false,
  rules: false,
  skills: false,
  mcp: false,
  subagents: false,
  model: false
})

function effectiveAfter(scenario: { beforeTokens: number; afterTokens: number; id: string }) {
  if (!enabled[scenario.id]) {
    return scenario.beforeTokens
  }
  return scenario.afterTokens
}

function savingsPercent(scenario: { beforeTokens: number; afterTokens: number; id: string }) {
  const before = scenario.beforeTokens
  const after = effectiveAfter(scenario)
  if (!before) {
    return 0
  }
  return Math.round(((before - after) / before) * 100)
}

function estimateCost(tokens: number) {
  const inputRatio = 0.85
  const inputTokens = tokens * inputRatio
  const outputTokens = tokens * (1 - inputRatio)
  return (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('pt-BR').format(n)
}

function formatCost(usd: number) {
  return `~US$ ${usd.toFixed(4)}`
}

async function measure(scenarioId: string) {
  running.value = true
  try {
    lastRun.value = await runDemo(scenarioId)
  } finally {
    running.value = false
  }
}
</script>
