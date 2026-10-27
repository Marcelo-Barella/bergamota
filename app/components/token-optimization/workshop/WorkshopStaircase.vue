<template>
  <aside class="ws-staircase" aria-label="10 níveis do workshop">
    <header class="ws-staircase-head">
      <NuxtLink to="/" class="ws-brand">Bergamota</NuxtLink>
      <p class="ws-progress" aria-live="polite">
        Progresso <strong>{{ progress }}%</strong>
      </p>
      <div class="ws-progress-track" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
        <div class="ws-progress-fill" :style="{ width: `${progress}%` }" />
      </div>
    </header>
    <ol class="ws-stairs">
      <li v-for="lv in levels" :key="lv.id">
        <button
          type="button"
          class="ws-stair"
          :class="{
            'ws-stair--active': lv.id === active,
            'ws-stair--done': visited.has(lv.id),
            [`ws-stair--tier-${lv.tier}`]: true
          }"
          :style="{ '--stair-offset': `${(lv.id - 1) * 4}px` }"
          :aria-current="lv.id === active ? 'step' : undefined"
          @click="emit('select', lv.id)"
        >
          <span class="ws-stair-num">{{ lv.id }}</span>
          <span class="ws-stair-text">
            <span class="ws-stair-title">{{ lv.title }}</span>
            <span v-if="lv.id === active" class="ws-stair-sub">{{ lv.subtitle }}</span>
          </span>
        </button>
      </li>
    </ol>
  </aside>
</template>

<script setup lang="ts">
import type { WorkshopLevel, WorkshopLevelId } from '~/data/token-optimization-levels'

defineProps<{
  levels: WorkshopLevel[]
  active: WorkshopLevelId
  visited: Set<number>
  progress: number
}>()

const emit = defineEmits<{ select: [id: WorkshopLevelId] }>()
</script>
