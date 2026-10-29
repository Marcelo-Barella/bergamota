<template>
  <section class="ws-lab" aria-label="Subagents">
    <div class="ws-lab-head">
      <h3 class="ws-lab-title">Subagents</h3>
      <nav class="ws-lab-links">
        <a :href="SUBAGENTS_DOCS" target="_blank" rel="noopener">docs/subagents</a>
        <a :href="TOKEN_EFF_POST" target="_blank" rel="noopener">token-efficiency</a>
      </nav>
    </div>

    <label class="ws-check">
      <input v-model="useSubagent" type="checkbox" />
      Explore no subagent (só resumo no pai)
    </label>
    <div class="ws-split-meters">
      <TokenOptimizationWorkshopTokenMeter :value="parentTokens" label="contexto do pai (ilustrativo)" />
      <TokenOptimizationWorkshopTokenMeter
        v-if="!useSubagent"
        :value="noiseTokens"
        label="lixo no pai"
      />
    </div>

    <label class="ws-range">
      Subagents em paralelo: {{ parallelCount }}
      <input v-model.number="parallelCount" type="range" min="1" max="6" />
    </label>
    <TokenOptimizationWorkshopTokenMeter :value="totalParallelTokens" label="tokens totais ~linear (ilustrativo)" />

    <TokenOptimizationWorkshopClickReveal summary="Modelos">
      <p class="ws-reveal-line">Padrão: `model: inherit` · Explore: modelo mais rápido.</p>
      <p class="ws-reveal-line">Blog: planejador caro + implementador barato (ex. composer-2).</p>
    </TokenOptimizationWorkshopClickReveal>

    <p class="ws-lab-prompt">Anti-padrão. Toque o que é OK:</p>
    <div class="ws-quiz">
      <button
        v-for="c in SUBAGENT_QUIZ"
        :key="c.id"
        type="button"
        class="ws-chip"
        :class="{
          'ws-chip--on': picks.has(c.id),
          'ws-chip--ok': picks.has(c.id) && c.kind === 'ok',
          'ws-chip--bad': picks.has(c.id) && c.kind === 'anti'
        }"
        @click="togglePick(c.id)"
      >
        {{ c.text }}
      </button>
    </div>

    <TokenOptimizationWorkshopClickReveal summary="`.cursor/agents/*.md`">
      <pre class="ws-build-preview">{{ SUBAGENT_FRONTMATTER }}</pre>
      <p class="ws-reveal-line">`/name` ou linguagem natural · built-ins Explore e Browser.</p>
      <p class="ws-reveal-line">Herdam tools e MCP do pai (docs).</p>
    </TokenOptimizationWorkshopClickReveal>

    <p class="ws-lab-note">
      Economiza com muito lixo intermediário ou modelo mais barato; custa mais em paralelo ou tarefa simples.
    </p>
  </section>
</template>

<script setup lang="ts">
import {
  SUBAGENT_FRONTMATTER,
  SUBAGENT_QUIZ,
  SUBAGENTS_DOCS,
  TOKEN_EFF_POST
} from '~/data/token-optimization-subagents'

const useSubagent = defineModel<boolean>('useSubagent', { default: true })
const parallelCount = defineModel<number>('parallelCount', { default: 1 })
const parentContextTokens = defineModel<number>('parentContextTokens', { default: 9000 })
const totalSpendTokens = defineModel<number>('totalSpendTokens', { default: 9000 })

const PARENT_BASE = 9000
const NOISE = 36000
const SUMMARY_ONLY = 1200
const PER_SUBAGENT = 18000

const noiseTokens = NOISE
const parentTokens = computed(() =>
  useSubagent.value ? PARENT_BASE + SUMMARY_ONLY : PARENT_BASE + NOISE
)
const totalParallelTokens = computed(() => {
  const parent = useSubagent.value ? PARENT_BASE + SUMMARY_ONLY : PARENT_BASE + NOISE
  return parent + parallelCount.value * PER_SUBAGENT
})

watch(
  [useSubagent, parallelCount],
  () => {
    parentContextTokens.value = parentTokens.value
    totalSpendTokens.value = totalParallelTokens.value
  },
  { immediate: true }
)

const picks = ref(new Set<string>())

function togglePick(id: string) {
  const next = new Set(picks.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  picks.value = next
}
</script>
