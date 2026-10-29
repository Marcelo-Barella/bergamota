<template>
  <div class="ws-quiz-block">
    <p class="ws-lab-prompt">Regra ou Skill?</p>
    <div v-for="c in RULE_SKILL_QUIZ" :key="c.id" class="ws-quiz-row">
      <span class="ws-quiz-q">{{ c.prompt }}</span>
      <button
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--ok': picks[c.id] === 'rule' && c.answer === 'rule' }"
        @click="pick(c.id, 'rule')"
      >
        Rule
      </button>
      <button
        type="button"
        class="ws-chip"
        :class="{ 'ws-chip--ok': picks[c.id] === 'skill' && c.answer === 'skill' }"
        @click="pick(c.id, 'skill')"
      >
        Skill
      </button>
      <span v-if="picks[c.id]" class="ws-quiz-hint" :class="{ 'ws-quiz-hint--ok': picks[c.id] === c.answer }">
        {{ picks[c.id] === c.answer ? 'ok' : c.hint }}
      </span>
    </div>
    <a class="ws-section-link" :href="LEARN_CUSTOMIZING" target="_blank" rel="noopener">customizing-agents</a>
  </div>
</template>

<script setup lang="ts">
import { LEARN_CUSTOMIZING, RULE_SKILL_QUIZ } from '~/data/token-optimization-learn'

const picks = ref<Record<string, 'rule' | 'skill'>>({})

function pick(id: string, choice: 'rule' | 'skill') {
  picks.value = { ...picks.value, [id]: choice }
}
</script>
