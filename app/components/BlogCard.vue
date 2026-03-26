<script setup lang="ts">
defineProps<{
  title: string;
  date: string;
  excerpt: string;
  url: string;
}>();
</script>

<template>
  <article class="blog-card">
    <h2 class="title">{{ title }}</h2>
    <time :datetime="date" class="date">{{ date }}</time>
    <p class="excerpt">{{ excerpt }}</p>
    <a :href="url" class="link">Read more</a>
  </article>
</template>

<style scoped>
.blog-card {
  background-color: var(--color-bg);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.link:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>