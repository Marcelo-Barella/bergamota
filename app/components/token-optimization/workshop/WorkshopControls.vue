<template>
  <div class="ws-controls">
    <template v-if="!inPanel">
      <h2 class="ws-pane-title">{{ level.id }} · {{ level.title }}</h2>
      <p class="ws-pane-desc">{{ level.subtitle }}</p>
    </template>

    <template v-if="level.id === 0">
      <TokenOptimizationWorkshopTokenMeter :value="tokenizerCount" label="tokens (estimativa)" />
      <textarea
        id="ws-prompt-base"
        v-model="promptText"
        class="ws-input"
        rows="3"
        placeholder="Digite qualquer texto…"
      />
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.overall7" />
    </template>

    <template v-else-if="level.id === 1">
      <div class="ws-split-meters">
        <TokenOptimizationWorkshopTokenMeter :value="verboseTokens" label="verboso" />
        <TokenOptimizationWorkshopTokenMeter
          :value="conciseTokens"
          label="decisão única"
          :delta="conciseDelta"
        />
      </div>
      <textarea id="ws-verbose" v-model="promptText" class="ws-input" rows="2" />
      <textarea id="ws-concise" v-model="concisePrompt" class="ws-input" rows="2" />
      <button type="button" class="ws-btn" :disabled="measuring" @click="emit('measure')">
        Medir no Composer-2.5
      </button>
    </template>

    <template v-else-if="level.id === 2">
      <fieldset class="ws-mc">
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="A" /> A</label>
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="B" /> B</label>
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="C" /> C</label>
      </fieldset>
      <TokenOptimizationWorkshopTokenMeter :value="mcTokens" label="tokens no prompt" />
      <button type="button" class="ws-btn" :disabled="measuring" @click="emit('measure')">Medir opção</button>
    </template>

    <template v-else-if="level.id === 3">
      <TokenOptimizationWorkshopRulesLab
        v-model:rule-type="ruleType"
        v-model:tokens-per-message="rulesTokensPerMessage"
      />
      <label class="ws-check"><input v-model="useAtMention" type="checkbox" /> @ trecho</label>
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.systemTrim66" />
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="3" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 4">
      <TokenOptimizationWorkshopSkillsLab
        v-model:expanded="skillExpanded"
        v-model:skill-tokens="skillContextTokens"
      />
      <label class="ws-check"><input v-model="confirmBeforeTools" type="checkbox" /> Confirmar antes</label>
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="4" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 5">
      <TokenOptimizationWorkshopMcpLab
        v-model:server-count="mcpServerCount"
        v-model:names-only="mcpNamesOnly"
        v-model:turn-tokens="mcpTurnTokens"
      />
      <label class="ws-check"><input v-model="routeCheapFirst" type="checkbox" /> Router barato primeiro</label>
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="5" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 6">
      <label class="ws-check">
        <input v-model="builtinDynamic" type="checkbox" />
        Built-in offloaded
      </label>
      <TokenOptimizationWorkshopTokenMeter
        :value="builtinStaticTokens"
        label="tokens defs estáticas"
        :delta="builtinDynamic ? -60 : null"
      />
      <label class="ws-check"><input v-model="blockRiskyTools" type="checkbox" /> `tools: []`</label>
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.builtinOffload60" />
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="6" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 7">
      <label class="ws-check"><input v-model="stablePrefix" type="checkbox" /> Prefixo estável + breakpoint</label>
      <TokenOptimizationWorkshopTokenMeter
        :value="cacheMissPct"
        label="% cold cache miss"
        :delta="stablePrefix ? -20 : null"
      />
      <label class="ws-range">notice <input v-model.number="thresholds.notice" type="range" min="30" max="70" /></label>
      <label class="ws-range">recommend <input v-model.number="thresholds.recommend" type="range" min="50" max="85" /></label>
      <label class="ws-range">compact <input v-model.number="thresholds.compact" type="range" min="70" max="98" /></label>
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.cacheCold20" />
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="7" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 8">
      <label class="ws-check">
        <input v-model="sparseLineNumbers" type="checkbox" />
        Linha 1 em 10
      </label>
      <TokenOptimizationWorkshopTokenMeter :value="readTokenEstimate" label="tokens Read simulado" />
      <label class="ws-check"><input v-model="returnSummaryNotFile" type="checkbox" /> Resumo/diff</label>
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.readCompress16" />
      <TokenOptimizationWorkshopClickReveal summary="Como o Cursor numera linhas">
        <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.lineEvery10" />
      </TokenOptimizationWorkshopClickReveal>
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="8" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 9">
      <label class="ws-range">
        Arquivos no glob
        <input v-model.number="globFiles" type="range" min="5" max="80" />
      </label>
      <TokenOptimizationWorkshopTokenMeter :value="filteredFiles" label="após filtro paralelo" />
      <label class="ws-check"><input v-model="parallelFilter" type="checkbox" /> Pré-filtrar</label>
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="9" :task="practice.task" />
    </template>

    <template v-else-if="level.id === 10">
      <TokenOptimizationWorkshopSubagentsLab
        v-model:use-subagent="subagentIsolated"
        v-model:parallel-count="subagentParallel"
        v-model:parent-context-tokens="subagentParentTokens"
        v-model:total-spend-tokens="subagentTotalTokens"
      />
      <TokenOptimizationWorkshopBlogStat :figure="BLOG_FIGURES.overall7" />
      <TokenOptimizationAcpLiveFeed />
      <TokenOptimizationWorkshopPracticeChat v-if="practice" :level-id="10" :task="practice.task" />
    </template>

    <div v-if="liveRun && level.id <= 2" class="ws-live-box" aria-live="polite">
      <strong>{{ liveRun.mode === 'live' ? 'SDK' : 'Fallback' }}</strong>
      <span v-if="liveRun.usage"> · {{ liveRun.usage.totalTokens }} tokens</span>
      <p class="ws-live-out">{{ liveRun.output?.slice(0, 200) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { encode } from 'gpt-tokenizer'
import { BLOG_FIGURES } from '~/data/token-optimization-blog'
import { PRACTICE_BY_LEVEL } from '~/data/token-optimization-practice'
import type { RunResponse } from '~/composables/useTokenOptimization'
import type { WorkshopLevel } from '~/data/token-optimization-levels'
import TokenOptimizationAcpLiveFeed from '~/components/token-optimization/AcpLiveFeed.vue'

const promptText = defineModel<string>('promptText', { required: true })
const concisePrompt = defineModel<string>('concisePrompt', { required: true })
const multipleChoice = defineModel<'A' | 'B' | 'C'>('multipleChoice', { required: true })
const useRules = defineModel<boolean>('useRules', { required: true })
const useAtMention = defineModel<boolean>('useAtMention', { required: true })
const confirmBeforeTools = defineModel<boolean>('confirmBeforeTools', { required: true })
const routeCheapFirst = defineModel<boolean>('routeCheapFirst', { required: true })
const blockRiskyTools = defineModel<boolean>('blockRiskyTools', { required: true })
const returnSummaryNotFile = defineModel<boolean>('returnSummaryNotFile', { required: true })
const parallelFilter = defineModel<boolean>('parallelFilter', { required: true })
const thresholds = defineModel<{ notice: number; recommend: number; compact: number }>('thresholds', {
  required: true
})
const ruleType = defineModel<import('~/data/token-optimization-rules').RuleApplyType>('ruleType', {
  required: true
})
const rulesTokensPerMessage = defineModel<number>('rulesTokensPerMessage', { required: true })
const mcpServerCount = defineModel<number>('mcpServerCount', { required: true })
const mcpNamesOnly = defineModel<boolean>('mcpNamesOnly', { required: true })
const mcpTurnTokens = defineModel<number>('mcpTurnTokens', { required: true })
const skillExpanded = defineModel<boolean>('skillExpanded', { required: true })
const skillContextTokens = defineModel<number>('skillContextTokens', { required: true })
const subagentIsolated = defineModel<boolean>('subagentIsolated', { required: true })
const subagentParallel = defineModel<number>('subagentParallel', { required: true })
const subagentParentTokens = defineModel<number>('subagentParentTokens', { required: true })
const subagentTotalTokens = defineModel<number>('subagentTotalTokens', { required: true })

const props = defineProps<{
  level: WorkshopLevel
  tokenizerCount: number
  fillPercent: number
  measuring: boolean
  liveRun: RunResponse | null
  inPanel?: boolean
}>()

const emit = defineEmits<{ measure: [] }>()

const practice = computed(() => PRACTICE_BY_LEVEL[props.level.id])

const builtinDynamic = ref(true)
const stablePrefix = ref(true)
const sparseLineNumbers = ref(true)
const globFiles = ref(40)
function countTokens(text: string) {
  try {
    return encode(text).length
  } catch {
    return 0
  }
}

const verboseTokens = computed(() => countTokens(props.level.id === 1 ? promptText.value : ''))
const conciseTokens = computed(() => countTokens(concisePrompt.value))
const conciseDelta = computed(() => {
  if (!verboseTokens.value) {
    return null
  }
  return Math.round(((conciseTokens.value - verboseTokens.value) / verboseTokens.value) * 100)
})

const mcPrompt = computed(() =>
  `Escolha ${multipleChoice.value}: refatorar (A), refatorar+teste (B), documentar (C).`
)
const mcTokens = computed(() => countTokens(mcPrompt.value))

const builtinStaticTokens = computed(() => (builtinDynamic.value ? 3200 : 8000))
const cacheMissPct = computed(() => (stablePrefix.value ? 12 : 32))

const readLines = 400
const readTokenEstimate = computed(() => {
  const perLine = sparseLineNumbers.value ? 2.2 : 4
  const numbered = sparseLineNumbers.value ? readLines / 10 : readLines
  return Math.round(readLines * 8 + numbered * perLine)
})

const filteredFiles = computed(() => {
  if (!parallelFilter.value) {
    return globFiles.value
  }
  return Math.max(3, Math.round(globFiles.value * 0.15))
})

</script>

<style scoped>
.ws-mc {
  display: flex;
  gap: 0.75rem;
  border: 1px solid var(--tok-border, #2a2a30);
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0.35rem 0;
}
.ws-split-meters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.ws-range {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  margin: 0.35rem 0;
  gap: 0.25rem;
}
.ws-reveal-line {
  margin: 0.25rem 0;
  font-size: 0.75rem;
  color: var(--tok-muted, #9b9ba8);
}
</style>
