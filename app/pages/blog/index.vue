<script setup lang="ts">
import { blogPosts } from '~/data/blogPosts'

const posts = blogPosts
</script>

<template>
  <h1 class="section-title">Blog</h1>
  <main class="blog-grid">
    <BlogCard
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :date="post.date"
      :excerpt="post.excerpt"
      :url="`/blog/${post.id}`"
    />
  </main>
</template>

<style scoped>
.section-title {
  font-family: var(--font-display);
  color: var(--color-text);
  margin-bottom: 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
