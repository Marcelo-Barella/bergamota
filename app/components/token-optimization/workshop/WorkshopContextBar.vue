<template>
  <div class="ws-ctx-bar" role="img" :aria-label="`Contexto ${fillPercent}% da janela`">
    <div class="ws-ctx-track">
      <div
        class="ws-ctx-fill"
        :class="{
          'ws-ctx-fill--notice': fillPercent >= thresholds.notice,
          'ws-ctx-fill--recommend': fillPercent >= thresholds.recommend,
          'ws-ctx-fill--compact': fillPercent >= thresholds.compact
        }"
        :style="{ height: `${fillPercent}%`, '--fill-w': `${fillPercent}%` }"
      />
      <div class="ws-ctx-mark" :style="{ bottom: `${thresholds.notice}%` }">
        <span>notice</span>
      </div>
      <div class="ws-ctx-mark ws-ctx-mark--rec" :style="{ bottom: `${thresholds.recommend}%` }">
        <span>recommend</span>
      </div>
      <div class="ws-ctx-mark ws-ctx-mark--compact" :style="{ bottom: `${thresholds.compact}%` }">
        <span>compact</span>
      </div>
    </div>
    <p class="ws-ctx-label">{{ formatNumber(tokens) }} / {{ formatNumber(contextWindow) }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fillPercent: number
  tokens: number
  contextWindow: number
  thresholds: { notice: number; recommend: number; compact: number }
}>()

function formatNumber(n: number) {
  return new Intl.NumberFormat('pt-BR').format(n)
}
</script>
