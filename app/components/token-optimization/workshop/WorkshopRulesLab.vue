<template>
  <section class="ws-lab" aria-label="Rules">
    <div class="ws-lab-head">
      <h3 class="ws-lab-title">Rules</h3>
      <nav class="ws-lab-links">
        <a :href="RULES_DOCS" target="_blank" rel="noopener">docs/rules</a>
        <a :href="AGENT_BP_POST" target="_blank" rel="noopener">agent-best-practices</a>
      </nav>
    </div>

    <TokenOptimizationWorkshopTokenMeter
      :value="ILLUSTRATIVE_TOKENS_PER_MESSAGE[ruleType]"
      label="tokens/msg (ilustrativo)"
    />

    <div class="ws-rule-types">
      <button
        v-for="(label, key) in RULE_TYPE_LABELS"
        :key="key"
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--on': ruleType === key }"
        @click="setType(key)"
      >
        {{ label }}
      </button>
    </div>
    <p class="ws-lab-note">dedução nossa, não está na doc</p>

    <TokenOptimizationWorkshopClickReveal summary="Quando criar?">
      <p class="ws-reveal-line">Só depois do mesmo erro repetir — <a :href="RULES_DOCS" target="_blank" rel="noopener">docs</a>.</p>
      <p class="ws-reveal-line">&lt;500 linhas, @file, sem ensinar o óbvio.</p>
      <p class="ws-reveal-line">Team Rules + AGENTS.md → comece mínimo.</p>
      <p class="ws-reveal-line">Custom Mode com skill fixa ≈ custo de rule.</p>
    </TokenOptimizationWorkshopClickReveal>

    <p class="ws-lab-prompt">Boa vs ruim — toque para classificar:</p>
    <ul class="ws-sort-list">
      <li v-for="card in cards" :key="card.id">
        <button
          type="button"
          class="ws-sort-card"
          :class="{
            'ws-sort-card--good': card.picked === 'good',
            'ws-sort-card--bad': card.picked === 'bad',
            'ws-sort-card--ok': card.picked === card.kind
          }"
          @click="togglePick(card)"
        >
          {{ card.text }}
        </button>
      </li>
    </ul>
    <p v-if="sortScore != null" class="ws-sort-score">{{ sortScore }}/{{ cards.length }} certas</p>
  </section>
</template>

<script setup lang="ts">
import {
  AGENT_BP_POST,
  ILLUSTRATIVE_TOKENS_PER_MESSAGE,
  RULE_SORT_CARDS,
  RULE_TYPE_LABELS,
  RULES_DOCS,
  type RuleApplyType
} from '~/data/token-optimization-rules'

const ruleType = defineModel<RuleApplyType>('ruleType', { default: 'glob' })
const tokensPerMessage = defineModel<number>('tokensPerMessage', { default: 420 })

const cards = ref(
  RULE_SORT_CARDS.map((c) => ({ ...c, picked: null as null | 'good' | 'bad' }))
)

function setType(t: RuleApplyType) {
  ruleType.value = t
  tokensPerMessage.value = ILLUSTRATIVE_TOKENS_PER_MESSAGE[t]
}

watch(
  ruleType,
  (t) => {
    tokensPerMessage.value = ILLUSTRATIVE_TOKENS_PER_MESSAGE[t]
  },
  { immediate: true }
)

function togglePick(card: { kind: 'good' | 'bad'; picked: null | 'good' | 'bad' }) {
  card.picked = card.picked === card.kind ? null : card.kind
}

const sortScore = computed(() => {
  const done = cards.value.filter((c) => c.picked != null)
  if (!done.length) {
    return null
  }
  return cards.value.filter((c) => c.picked === c.kind).length
})
</script>
