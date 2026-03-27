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
  <div class="post-page">
    <MotionSection tag="article" class="post" immediate>
      <NuxtLink to="/blog" class="back">Blog</NuxtLink>
      <h1 class="title">{{ post.title }}</h1>
      <time :datetime="post.date" class="date">{{ post.date }}</time>
      <p class="body">{{ post.body }}</p>
    </MotionSection>
  </div>
</template>

<style scoped>
.post-page {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.post {
  max-width: 42rem;
  color: var(--color-text);
}

.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-family: var(--font-display);
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.back:hover {
  opacity: 0.85;
}

.back:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .back {
    transition: none;
  }
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
