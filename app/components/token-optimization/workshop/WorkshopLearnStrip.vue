<template>
  <ul class="ws-learn-strip">
    <li v-for="s in LEARN_SNIPPETS" :key="s.id">
      <a :href="s.href" target="_blank" rel="noopener noreferrer">{{ s.title }}</a>
      <span>{{ s.text }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { LEARN_SNIPPETS } from '~/data/token-optimization-learn'
</script>
