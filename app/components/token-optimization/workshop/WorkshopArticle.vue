<template>
  <article :id="anchor" class="ws-article">
    <header class="ws-article-head">
      <h2 class="ws-article-title">{{ title }}</h2>
      <span v-if="extra" class="ws-tier-tag ws-tier-tag--extra">extra</span>
    </header>
    <div class="ws-prose">
      <p v-for="(p, i) in paragraphs" :key="i" v-html="p" />
      <slot name="prose" />
    </div>
    <button v-if="interact" type="button" class="ws-btn ws-btn-interact" @click="emit('interact')">
      Interagir
    </button>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  anchor: string
  title: string
  paragraphs: string[]
  interact?: boolean
  extra?: boolean
}>()

const emit = defineEmits<{ interact: [] }>()
</script>
