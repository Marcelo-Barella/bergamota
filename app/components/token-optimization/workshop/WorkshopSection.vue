<template>
  <component :is="tier === 'extra' ? 'details' : 'section'" class="ws-section" :class="`ws-section--${tier}`">
    <component :is="tier === 'extra' ? 'summary' : 'div'" class="ws-section-head">
      <h2 class="ws-section-title">{{ title }}</h2>
      <span class="ws-tier-tag" :class="`ws-tier-tag--${tier}`">{{ tier === 'core' ? 'core' : 'extra' }}</span>
      <a v-if="learnHref" class="ws-section-link" :href="learnHref" target="_blank" rel="noopener">cursor.com/learn</a>
    </component>
    <div class="ws-section-body">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tier: 'core' | 'extra'
  learnHref?: string
}>()
</script>
