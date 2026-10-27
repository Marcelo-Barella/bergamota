<template>
  <div class="ws-pricing">
    <p class="ws-context-intro-lead">
      Otimizar tokens não é só usar menos: é mais cache, menos input/output fresco.
      Você paga por token de entrada e saída; cache reduz o custo de entrada repetida.
    </p>
    <label class="ws-range">Cache no input: {{ cachedPct }}%</label>
    <input v-model.number="cachedPct" type="range" min="0" max="95" />
    <label class="ws-range">Input tokens: {{ inputTokens }}</label>
    <input v-model.number="inputTokens" type="range" min="500" max="120000" step="500" />
    <label class="ws-range">Output tokens: {{ outputTokens }}</label>
    <input v-model.number="outputTokens" type="range" min="50" max="8000" step="50" />
    <TokenOptimizationWorkshopTokenMeter :value="`$${cost.total.toFixed(3)}`" label="custo estimado (turno)" />
    <p class="ws-lab-note">
      Preços listados para Composer 2.5 em
      <a :href="COMPOSER_25_RATES.source" target="_blank" rel="noopener">cursor.com/docs/models</a>
      (input ${{ COMPOSER_25_RATES.inputPerM }}/M · cache read ${{ COMPOSER_25_RATES.cacheReadPerM }}/M · output
      ${{ COMPOSER_25_RATES.outputPerM }}/M).
    </p>
  </div>
</template>

<script setup lang="ts">
import { COMPOSER_25_RATES, estimateComposerCost } from '~/data/token-optimization-pricing'

const cachedPct = ref(40)
const inputTokens = ref(12000)
const outputTokens = ref(800)

const cost = computed(() => estimateComposerCost(inputTokens.value, outputTokens.value, cachedPct.value / 100))
</script>
