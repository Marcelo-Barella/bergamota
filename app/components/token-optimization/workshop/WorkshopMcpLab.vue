<template>
  <section class="ws-lab" aria-label="MCP">
    <div class="ws-lab-head">
      <h3 class="ws-lab-title">MCP</h3>
      <nav class="ws-lab-links">
        <a :href="MCP_SPEC" target="_blank" rel="noopener">modelcontextprotocol.io</a>
        <a :href="DYNAMIC_CTX_POST" target="_blank" rel="noopener">dynamic-context</a>
      </nav>
    </div>

    <TokenOptimizationWorkshopClickReveal summary="USB-C para IA">
      <p class="ws-reveal-line">Porta universal: plugue só o que usa.</p>
    </TokenOptimizationWorkshopClickReveal>

    <ul v-if="showExtra" class="ws-sourced-list">
      <li v-for="fig in MCP_SOURCED_FIGURES" :key="fig.label">
        <span class="ws-badge" :class="`ws-badge--${fig.badge.replace(/\s/g, '-')}`">{{ fig.badge }}</span>
        <a :href="fig.href" target="_blank" rel="noopener">{{ fig.label }}</a>
        <span class="ws-sourced-detail">{{ fig.detail }}</span>
      </li>
    </ul>

    <p class="ws-lab-note">{{ MCP_ESTIMATE_ASSUMPTIONS }}</p>

    <label class="ws-range">
      Servidores MCP: {{ serverCount }}
      <input v-model.number="serverCount" type="range" min="10" max="50" step="1" />
    </label>
    <label class="ws-check">
      <input v-model="namesOnly" type="checkbox" />
      Só nomes (dinâmico)
    </label>
    <TokenOptimizationWorkshopTokenMeter :value="turnTokens" label="tokens/turno (estimativa nossa)" />

    <template v-if="showExtra">
    <p class="ws-lab-prompt">Onde encaixar?</p>
    <div class="ws-quiz">
      <button
        v-for="q in MCP_TOOL_QUIZ"
        :key="q.id"
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--on': quizPick === q.id, 'ws-chip--ok': quizRevealed && quizPick === q.id }"
        @click="pickQuiz(q)"
      >
        {{ q.text }}
      </button>
      <p v-if="quizRevealed" class="ws-quiz-ans">{{ quizAnswer }}</p>
    </div>
    <p class="ws-lab-note">CLI logado: conselho nosso, não da Cursor.</p>

    <div class="ws-chips-row">
      <a
        v-for="c in MCP_USE_CHIPS"
        :key="c"
        class="ws-chip ws-chip--link"
        :href="CURSOR_MARKETPLACE"
        target="_blank"
        rel="noopener"
        >{{ c }}</a
      >
    </div>
    </template>

    <TokenOptimizationWorkshopClickReveal summary="Prós e contras">
      <p class="ws-reveal-line">Idle: ~10 tokens/nome vs ~800/def (estimativa nossa).</p>
      <p class="ws-reveal-line">Ainda custa: processo stdio, inferência com nomes parecidos, OAuth.</p>
      <p class="ws-reveal-line">Desligue servidores · `.cursor/mcp.json` · tools com filtro/página.</p>
    </TokenOptimizationWorkshopClickReveal>
  </section>
</template>

<script setup lang="ts">
import {
  CURSOR_MARKETPLACE,
  DYNAMIC_CTX_POST,
  estimateMcpTurnTokens,
  MCP_ESTIMATE_ASSUMPTIONS,
  MCP_SPEC,
  MCP_SOURCED_FIGURES,
  MCP_TOOL_QUIZ
} from '~/data/token-optimization-mcp'

defineProps<{ showExtra?: boolean }>()

const serverCount = defineModel<number>('serverCount', { default: 10 })
const namesOnly = defineModel<boolean>('namesOnly', { default: true })
const turnTokens = defineModel<number>('turnTokens', { default: 1000 })

const quizPick = ref<string | null>(null)
const quizRevealed = ref(false)
const quizAnswer = ref('')

watch([serverCount, namesOnly], () => {
  turnTokens.value = estimateMcpTurnTokens(serverCount.value, namesOnly.value)
}, { immediate: true })

function pickQuiz(q: (typeof MCP_TOOL_QUIZ)[0]) {
  quizPick.value = q.id
  quizRevealed.value = true
  quizAnswer.value = `→ ${q.answerLabel}`
}
</script>
