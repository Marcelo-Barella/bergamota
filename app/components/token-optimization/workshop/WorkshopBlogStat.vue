<template>
  <a
    class="ws-blog-stat"
    :href="figure.href"
    target="_blank"
    rel="noopener noreferrer"
    :title="figure.quote"
  >
    <span class="ws-blog-stat-val">{{ figure.label }}</span>
    <span class="ws-blog-stat-src">Cursor · set/2026</span>
  </a>
</template>

<script setup lang="ts">
import type { BlogFigure } from '~/data/token-optimization-blog'

defineProps<{ figure: BlogFigure }>()
</script>
