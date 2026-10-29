<template>
  <details class="ws-reveal">
    <summary>{{ summary }}</summary>
    <div class="ws-reveal-body">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
defineProps<{ summary: string }>()
</script>
