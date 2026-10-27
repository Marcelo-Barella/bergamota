<template>
  <div class="token-workshop">
    <TokenOptimizationWorkshopStaircase
      :levels="WORKSHOP_LEVELS"
      :active="activeLevel"
      :visited="visited"
      :progress="progressPercent()"
      @select="setLevel"
    />

    <TokenOptimizationWorkshopContextBar
      :fill-percent="fillPercent"
      :tokens="simulatedFillTokens"
      :context-window="contextWindow"
      :thresholds="thresholds"
    />

    <div class="ws-center">
      <div class="ws-hero-mini">
        <h1>Otimização de tokens — níveis 0 a 10</h1>
        <p>Workshop UPF · Cursor, Composer-2.5, Rules, MCP, Subagents, Cloud Agents, ACP</p>
      </div>

      <div class="ws-main">
      <section class="ws-pane" aria-label="Entradas e toggles">
        <TokenOptimizationWorkshopControls
          v-model:prompt-text="promptText"
          v-model:concise-prompt="concisePrompt"
          v-model:multiple-choice="multipleChoice"
          v-model:use-rules="useRules"
          v-model:use-at-mention="useAtMention"
          v-model:confirm-before-tools="confirmBeforeTools"
          v-model:route-cheap-first="routeCheapFirst"
          v-model:block-risky-tools="blockRiskyTools"
          v-model:return-summary-not-file="returnSummaryNotFile"
          v-model:parallel-filter="parallelFilter"
          v-model:thresholds="thresholds"
          :level="level"
          :tokenizer-count="tokenizerCount"
          :fill-percent="fillPercent"
          :measuring="measuring"
          :live-run="liveRun"
          @measure="onMeasure"
        />
      </section>

      <section class="ws-pane" aria-label="Snippet SDK ou ACP">
        <h2 class="ws-pane-title">Código (atualiza com toggles)</h2>
        <TokenOptimizationWorkshopSnippet
          :level="activeLevel"
          :model-id="modelId"
          :block-tools="blockRiskyTools"
          :use-cloud="activeLevel === 10"
          :confirm-before="confirmBeforeTools"
        />
      </section>

      <section class="ws-pane" aria-label="Fluxo e JSON">
        <TokenOptimizationWorkshopFlowPanel
          :nodes="level.flowNodes"
          :payload="jsonPayload"
          :latency-ms="latencyMs"
          :source-label="dataSourceLabel"
        />
      </section>
      </div>
    </div>

    <TokenOptimizationWorkshopCompareTable :rows="compareRows" :active-level="activeLevel" />
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/token-optimization.css'
import { useTokenWorkshop } from '~/composables/useTokenWorkshop'
import { useTokenOptimization } from '~/composables/useTokenOptimization'

definePageMeta({ layout: false })

useHead({
  title: 'Otimização de tokens — Bergamota',
  meta: [
    {
      name: 'description',
      content: 'Playground em 10 níveis: tokens, contexto, SDK e ACP no Cursor (workshop UPF).'
    }
  ],
  htmlAttrs: { class: 'dark' }
})

const { config, loadConfig, runDemo } = useTokenOptimization()
await loadConfig()

const {
  WORKSHOP_LEVELS,
  contextWindow,
  activeLevel,
  visited,
  thresholds,
  promptText,
  concisePrompt,
  multipleChoice,
  useRules,
  useAtMention,
  confirmBeforeTools,
  routeCheapFirst,
  blockRiskyTools,
  returnSummaryNotFile,
  parallelFilter,
  modelId,
  level,
  liveRun,
  measuring,
  latencyMs,
  tokenizerCount,
  simulatedFillTokens,
  fillPercent,
  effectiveAfterTokens,
  effectiveBeforeTokens,
  dataSourceLabel,
  setLevel,
  progressPercent,
  levelRows,
  measureWithSdk,
  estimateCostUsd
} = useTokenWorkshop()

if (config.value?.contextWindowTokens) {
  contextWindow.value = config.value.contextWindowTokens
}
if (config.value?.defaultModel) {
  modelId.value = config.value.defaultModel
}

const jsonPayload = computed(() => ({
  level: activeLevel.value,
  model: modelId.value,
  tokens: {
    fill: simulatedFillTokens.value,
    before: effectiveBeforeTokens.value,
    after: effectiveAfterTokens.value,
    contextWindow: contextWindow.value,
    fillPercent: fillPercent.value
  },
  thresholds: thresholds.value,
  toggles: {
    multipleChoice: multipleChoice.value,
    useRules: useRules.value,
    useAtMention: useAtMention.value,
    confirmBeforeTools: confirmBeforeTools.value,
    routeCheapFirst: routeCheapFirst.value,
    blockRiskyTools: blockRiskyTools.value,
    returnSummaryNotFile: returnSummaryNotFile.value,
    parallelFilter: parallelFilter.value
  },
  liveRun: liveRun.value
    ? {
        mode: liveRun.value.mode,
        usage: liveRun.value.usage,
        cached: liveRun.value.cached,
        throttled: liveRun.value.throttled
      }
    : null,
  source: dataSourceLabel.value
}))

const compareRows = computed(() => {
  const rows = levelRows()
  if (activeLevel.value === 1 && liveRun.value?.usage && liveRun.value.mode === 'live') {
    const row = rows.find((r) => r.level.id === 1)
    if (row) {
      row.after = liveRun.value.usage.totalTokens
      row.costAfter = estimateCostUsd(row.after)
      row.source = 'real (SDK)'
    }
  }
  return rows
})

async function onMeasure() {
  await measureWithSdk(runDemo)
}
</script>
