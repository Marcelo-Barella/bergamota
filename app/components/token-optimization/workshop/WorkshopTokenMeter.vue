<template>
  <div class="ws-meter" role="status" aria-live="polite">
    <span class="ws-meter-num">{{ value }}</span>
    <span class="ws-meter-label">{{ label }}</span>
    <span v-if="delta != null" class="ws-meter-delta" :class="{ 'ws-meter-delta--down': delta < 0 }">
      {{ delta > 0 ? '+' : '' }}{{ delta }}%
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number | string
  label: string
  delta?: number | null
}>()
</script>
