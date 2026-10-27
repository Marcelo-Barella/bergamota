<template>
  <div class="ws-controls">
    <h2 class="ws-pane-title">Nível {{ level.id }} — {{ level.title }}</h2>
    <p class="ws-pane-desc">{{ level.subtitle }}</p>

    <template v-if="level.id === 0">
      <label for="ws-prompt-base">Texto base (tokenizer)</label>
      <textarea id="ws-prompt-base" v-model="promptText" class="ws-input" rows="4" />
      <p class="ws-hint">
        <strong>{{ tokenizerCount }}</strong> tokens (estimativa cl100k_base). Janela Composer-2.5: referência 200k.
      </p>
    </template>

    <template v-else-if="level.id === 1">
      <label for="ws-verbose">Antes (verboso)</label>
      <textarea id="ws-verbose" v-model="promptText" class="ws-input" rows="3" />
      <label for="ws-concise">Depois (decisão simples)</label>
      <textarea id="ws-concise" v-model="concisePrompt" class="ws-input" rows="2" />
      <button type="button" class="ws-btn" :disabled="measuring" @click="emit('measure')">
        Medir com SDK (Composer-2.5)
      </button>
    </template>

    <template v-else-if="level.id === 2">
      <p class="ws-hint">Múltipla escolha no prompt reduz tokens vs. parágrafo aberto.</p>
      <fieldset class="ws-mc">
        <legend>Opção</legend>
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="A" /> A — só refatorar</label>
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="B" /> B — refatorar + teste</label>
        <label class="ws-check"><input v-model="multipleChoice" type="radio" value="C" /> C — documentar tudo</label>
      </fieldset>
      <button type="button" class="ws-btn" :disabled="measuring" @click="emit('measure')">Medir opção no SDK</button>
    </template>

    <template v-else-if="level.id === 3">
      <label class="ws-check"><input v-model="useRules" type="checkbox" /> Rules com critérios fixos</label>
      <label class="ws-check"><input v-model="useAtMention" type="checkbox" /> @-mentions (trecho, não repo)</label>
    </template>

    <template v-else-if="level.id === 4">
      <label class="ws-check"><input v-model="confirmBeforeTools" type="checkbox" /> Confirmar antes de tools (plan/ask)</label>
      <p class="ws-hint">Evita dumps de shell/MCP no contexto sem aprovação.</p>
    </template>

    <template v-else-if="level.id === 5">
      <label class="ws-check"><input v-model="routeCheapFirst" type="checkbox" /> Router: modelo mais barato primeiro</label>
    </template>

    <template v-else-if="level.id === 6">
      <label class="ws-check"><input v-model="blockRiskyTools" type="checkbox" /> Guardrails: `tools: []` / sem shell e MCP</label>
    </template>

    <template v-else-if="level.id === 7">
      <label>Threshold notice (%) <input v-model.number="thresholds.notice" type="range" min="30" max="70" /></label>
      <label>Threshold recommend (%) <input v-model.number="thresholds.recommend" type="range" min="50" max="85" /></label>
      <label>Threshold compact (%) <input v-model.number="thresholds.compact" type="range" min="70" max="98" /></label>
      <p class="ws-hint">Hora de compactar quando a barra cruza os marcadores.</p>
    </template>

    <template v-else-if="level.id === 8">
      <label class="ws-check"><input v-model="returnSummaryNotFile" type="checkbox" /> Leitura barata: resumo/diff (~4k tokens)</label>
    </template>

    <template v-else-if="level.id === 9">
      <label class="ws-check"><input v-model="parallelFilter" type="checkbox" /> Pré-filtrar arquivos em paralelo</label>
    </template>

    <template v-else-if="level.id === 10">
      <p class="ws-hint">Agêntico: Cloud Agents + ACP (usage ACP: não confirmado).</p>
      <TokenOptimizationAcpLiveFeed />
    </template>

    <div v-if="liveRun" class="ws-live-box" aria-live="polite">
      <strong>{{ liveRun.mode === 'live' ? 'SDK real' : 'Fallback' }}</strong>
      <p v-if="liveRun.usage">tokens {{ liveRun.usage.totalTokens }} ({{ liveRun.usage.source }})</p>
      <p class="ws-live-out">{{ liveRun.output?.slice(0, 280) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  level: WorkshopLevel
  tokenizerCount: number
  fillPercent: number
  measuring: boolean
  liveRun: RunResponse | null
}>()

const emit = defineEmits<{ measure: [] }>()
</script>

<style scoped>
.ws-mc {
  border: 1px solid var(--tok-border, #2a2a30);
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
