import { encode } from 'gpt-tokenizer'
import {
  WORKSHOP_LEVELS,
  estimateCostUsd,
  type WorkshopLevel,
  type WorkshopLevelId
} from '~/data/token-optimization-levels'
import type { RunResponse } from '~/composables/useTokenOptimization'

export function useTokenWorkshop() {
  const contextWindow = ref(200_000)
  const activeLevel = ref<WorkshopLevelId>(0)
  const visited = ref<Set<number>>(new Set([0]))
  const thresholds = ref({ notice: 55, recommend: 75, compact: 88 })

  const promptText = ref(
    'Refatore a função anexa mantendo a API pública. Inclua contexto do projeto inteiro e explique cada passo em detalhes.'
  )
  const concisePrompt = ref('Refatore a função anexa; mantenha a API; um teste mínimo.')
  const multipleChoice = ref<'A' | 'B' | 'C'>('B')
  const useRules = ref(true)
  const useAtMention = ref(true)
  const confirmBeforeTools = ref(true)
  const routeCheapFirst = ref(true)
  const blockRiskyTools = ref(true)
  const returnSummaryNotFile = ref(true)
  const parallelFilter = ref(true)
  const modelId = ref('composer-2.5')

  const liveRun = ref<RunResponse | null>(null)
  const measuring = ref(false)
  const latencyMs = ref<number | null>(null)

  const level = computed(() => WORKSHOP_LEVELS.find((l) => l.id === activeLevel.value)!)

  const tokenizerCount = computed(() => {
    try {
      return encode(promptText.value).length
    } catch {
      return 0
    }
  })

  const simulatedFillTokens = computed(() => {
    const lv = level.value
    let base = lv.beforeTokens || 4000

    if (activeLevel.value === 0) {
      return Math.max(tokenizerCount.value, Math.min(contextWindow.value, Math.round(contextWindow.value * 0.08)))
    }
    if (activeLevel.value >= 1 && concisePrompt.value.length < promptText.value.length) {
      base = Math.round(base * (activeLevel.value === 1 ? 0.35 : 0.85))
    }
    if (activeLevel.value >= 2) {
      base = Math.round(base * 0.72)
    }
    if (activeLevel.value >= 3 && useRules.value) {
      base = Math.round(base * 0.55)
    }
    if (activeLevel.value >= 3 && useAtMention.value) {
      base = Math.round(base * 0.85)
    }
    if (activeLevel.value >= 4 && confirmBeforeTools.value) {
      base = Math.round(base * 0.75)
    }
    if (activeLevel.value >= 5 && routeCheapFirst.value) {
      base = Math.round(base * 0.6)
    }
    if (activeLevel.value >= 6 && blockRiskyTools.value) {
      base = Math.round(base * 0.7)
    }
    if (activeLevel.value >= 7) {
      const pct = fillPercent.value
      if (pct >= thresholds.value.compact) {
        base = Math.round(base * 0.45)
      } else if (pct >= thresholds.value.recommend) {
        base = Math.round(base * 0.65)
      }
    }
    if (activeLevel.value >= 8 && returnSummaryNotFile.value) {
      base = Math.max(0, base - 4000)
    }
    if (activeLevel.value >= 9 && parallelFilter.value) {
      base = Math.round(base * 0.42)
    }
    return Math.min(contextWindow.value, base)
  })

  const fillPercent = computed(() =>
    contextWindow.value ? Math.min(100, Math.round((simulatedFillTokens.value / contextWindow.value) * 100)) : 0
  )

  const effectiveAfterTokens = computed(() => {
    if (liveRun.value?.usage?.totalTokens && liveRun.value.mode === 'live') {
      return liveRun.value.usage.totalTokens
    }
    if (activeLevel.value === 0) {
      return tokenizerCount.value
    }
    return level.value.afterTokens
  })

  const effectiveBeforeTokens = computed(() => {
    if (liveRun.value?.usage?.totalTokens && liveRun.value.mode === 'live' && activeLevel.value === 1) {
      return liveRun.value.usage.totalTokens + 800
    }
    return level.value.beforeTokens || simulatedFillTokens.value
  })

  const dataSourceLabel = computed(() => {
    if (liveRun.value?.mode === 'live' && liveRun.value.usage) {
      return 'real (SDK)'
    }
    if (activeLevel.value === 10) {
      return 'misto (ACP usage não confirmado)'
    }
    if (activeLevel.value === 0) {
      return 'estimativa (cl100k_base)'
    }
    return 'simulado'
  })

  function setLevel(id: WorkshopLevelId) {
    activeLevel.value = id
    visited.value.add(id)
    liveRun.value = null
    latencyMs.value = null
  }

  function progressPercent() {
    return Math.round((visited.value.size / WORKSHOP_LEVELS.length) * 100)
  }

  function levelRows(): Array<{
    level: WorkshopLevel
    before: number
    after: number
    costBefore: number
    costAfter: number
    source: string
  }> {
    return WORKSHOP_LEVELS.map((lv) => ({
      level: lv,
      before: lv.beforeTokens || 100,
      after: lv.afterTokens || lv.beforeTokens,
      costBefore: estimateCostUsd(lv.beforeTokens || 100),
      costAfter: estimateCostUsd(lv.afterTokens || lv.beforeTokens),
      source: lv.id === 0 ? 'estimativa' : lv.id === 10 ? 'misto' : 'simulado'
    }))
  }

  async function measureWithSdk(runDemo: (scenarioId: string, prompt?: string) => Promise<RunResponse>) {
    measuring.value = true
    const started = performance.now()
    try {
      const scenarioId = activeLevel.value === 1 ? 'concise' : 'verbose'
      const prompt =
        activeLevel.value === 1
          ? concisePrompt.value
          : activeLevel.value === 2
            ? `Escolha ${multipleChoice.value}: refatorar com teste mínimo (responda só a letra).`
            : promptText.value
      liveRun.value = await runDemo(scenarioId, prompt)
      latencyMs.value = liveRun.value.durationMs ?? Math.round(performance.now() - started)
    } finally {
      measuring.value = false
    }
  }

  return {
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
  }
}
