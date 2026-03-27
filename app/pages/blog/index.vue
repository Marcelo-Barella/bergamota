<script setup lang="ts">
import { blogPosts } from '~/data/blogPosts'

const posts = blogPosts
</script>

<template>
  <div class="blog-page">
    <MotionSection tag="div" class="blog-intro" immediate>
      <h1 class="section-title">Blog</h1>
    </MotionSection>
    <main class="blog-grid">
      <MotionSection
        v-for="post in posts"
        :key="post.id"
        tag="div"
        class="blog-card-wrap"
      >
        <BlogCard
          :title="post.title"
          :date="post.date"
          :excerpt="post.excerpt"
          :url="`/blog/${post.id}`"
        />
      </MotionSection>
    </main>
  </div>
</template>

<style scoped>
.blog-page {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.blog-intro {
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: var(--font-display);
  color: var(--color-text);
  margin: 0 0 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-card-wrap {
  height: 100%;
}
</style>
