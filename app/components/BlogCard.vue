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
  background-color: color-mix(in srgb, var(--color-text) 4%, var(--color-bg));
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
  transition:
    transform var(--motion-duration-medium, 0.28s) var(--motion-ease-standard, ease),
    box-shadow var(--motion-duration-medium, 0.28s) var(--motion-ease-standard, ease);
  box-shadow: 0 2px 10px color-mix(in srgb, var(--color-text) 5%, transparent);
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px color-mix(in srgb, var(--color-text) 9%, transparent);
}

.link {
  display: inline-block;
  margin-top: 0.75rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.link:hover {
  opacity: 0.88;
}

.link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .blog-card {
    transition: none;
  }

  .blog-card:hover {
    transform: none;
  }

  .link {
    transition: none;
  }
}
</style>