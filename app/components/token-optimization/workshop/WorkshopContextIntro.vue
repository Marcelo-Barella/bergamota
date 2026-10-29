<template>
  <section class="ws-context-intro" aria-label="Contexto">
    <h2 class="ws-context-intro-title">Contexto</h2>
    <p class="ws-context-intro-lead">
      Tudo que o modelo vê (system prompt, Rules, histórico, arquivos, resultados de tools) vira tokens numa
      janela limitada. Passou do limite, perde precisão; os níveis 0–10 ajudam a caber mais em menos espaço.
    </p>
    <p class="ws-context-intro-lead">
      Cada turno no mesmo chat empilha contexto. Um chat novo com um pedido costuma bem menos que vários turnos:
      recomeçar já é otimização.
    </p>

    <div class="ws-context-demo">
      <div class="ws-context-demo-bar" role="img" :aria-label="`Janela ${displayPct}%`">
        <div
          class="ws-context-demo-fill"
          :class="{ 'ws-context-demo-fill--compact': compacted }"
          :style="{ width: `${Math.min(100, displayPct)}%` }"
        />
        <span v-if="overflow" class="ws-context-demo-overflow">limite</span>
      </div>
      <TokenOptimizationWorkshopTokenMeter
        :value="displayTokens"
        :label="meterLabel"
      />
      <p v-if="compacted" class="ws-compact-flash">Compactou histórico (ilustrativo)</p>
      <div class="ws-context-demo-actions">
        <button type="button" class="ws-btn ws-btn--sm" @click="addTurn">+ mensagem</button>
        <button type="button" class="ws-btn ws-btn--sm ws-btn--ghost" @click="resetChat">Novo chat</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const contextWindow = 200_000
const BASE_TOKENS = 4_200
const PER_TURN = 8_500
const COMPACT_RATIO = 0.42

const turnCount = ref(1)
const compacted = ref(false)

const rawTokens = computed(() => BASE_TOKENS + (turnCount.value - 1) * PER_TURN)

const displayTokens = computed(() => {
  if (compacted.value) {
    return Math.round(rawTokens.value * COMPACT_RATIO)
  }
  return rawTokens.value
})

const overflow = computed(() => !compacted.value && rawTokens.value > contextWindow)
const displayPct = computed(() => Math.round((displayTokens.value / contextWindow) * 100))

const meterLabel = computed(() => {
  const turns = `${turnCount.value} turno(s)`
  return compacted.value ? `${turns} · compactado (ilustrativo)` : `${turns} (ilustrativo)`
})

function addTurn() {
  const next = turnCount.value + 1
  const nextRaw = BASE_TOKENS + (next - 1) * PER_TURN
  turnCount.value = next
  if (!compacted.value && nextRaw > contextWindow) {
    compacted.value = true
  }
}

function resetChat() {
  turnCount.value = 1
  compacted.value = false
}
</script>
