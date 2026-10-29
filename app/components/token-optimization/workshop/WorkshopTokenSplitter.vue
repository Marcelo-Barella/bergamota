<template>
  <div class="ws-splitter">
    <input
      v-model="text"
      type="text"
      class="ws-chat-input"
      placeholder="Digite uma palavra ou frase…"
      autocomplete="off"
    />
    <div class="ws-splitter-tokens">
      <span v-for="(t, i) in tokens" :key="i" class="ws-token-chip">{{ t }}</span>
    </div>
    <TokenOptimizationWorkshopTokenMeter :value="tokenCount" label="tokens (estimativa)" />
    <div class="ws-splitter-costs">
      <span>input ~${{ cost.inputCost.toFixed(4) }}</span>
      <span>output ~${{ cost.outputCost.toFixed(4) }}</span>
      <span class="ws-splitter-total">~${{ cost.total.toFixed(4) }}</span>
    </div>
    <p class="ws-lab-note">
      Saída costuma custar mais que entrada —
      <a :href="COMPOSER_25_RATES.source" target="_blank" rel="noopener">Composer 2.5</a>
      (${{ COMPOSER_25_RATES.inputPerM }}/M in · ${{ COMPOSER_25_RATES.outputPerM }}/M out).
    </p>
  </div>
</template>

<script setup lang="ts">
import { encode } from 'gpt-tokenizer'
import { COMPOSER_25_RATES, estimateComposerCost } from '~/data/token-optimization-pricing'

const text = ref('refatorar função')

const tokenCount = computed(() => {
  try {
    return encode(text.value).length
  } catch {
    return 0
  }
})

const tokens = computed(() => {
  if (!text.value.trim()) {
    return []
  }
  return text.value.split(/(\s+)/).filter((p) => p.trim().length > 0)
})

const cost = computed(() => {
  const input = tokenCount.value
  const output = Math.max(32, Math.round(input * 1.4))
  const c = estimateComposerCost(input, output, 0)
  return { inputCost: c.inputCost, outputCost: c.outputCost, total: c.total }
})
</script>
