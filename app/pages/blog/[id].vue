<script setup lang="ts">
import { blogPosts } from '~/data/blogPosts'

const route = useRoute()
const id = Number(route.params.id)
const post = blogPosts.find((p) => p.id === id)

if (!post || Number.isNaN(id)) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <article class="post">
    <NuxtLink to="/blog" class="back">Blog</NuxtLink>
    <h1 class="title">{{ post.title }}</h1>
    <time :datetime="post.date" class="date">{{ post.date }}</time>
    <p class="body">{{ post.body }}</p>
  </article>
</template>

<style scoped>
.post {
  max-width: 42rem;
  color: var(--color-text);
}

.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-family: var(--font-display);
  color: var(--color-accent);
}

.back:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.title {
  font-family: var(--font-display);
  margin-bottom: 0.5rem;
}

.date {
  display: block;
  margin-bottom: 1.5rem;
  opacity: 0.85;
}

.body {
  line-height: 1.6;
}
</style>
