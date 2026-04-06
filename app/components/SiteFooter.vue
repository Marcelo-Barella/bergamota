<template>
  <footer class="site-footer" role="contentinfo">
    <div class="site-footer-inner">
      <p class="site-footer-note">Marcelo Barella — Bergamota</p>
      <nav class="site-footer-nav" aria-label="Footer">
        <NuxtLink :to="localePath('/')" class="site-footer-link">Home</NuxtLink>
        <a href="mailto:hello@bergamota.dev" class="site-footer-link">Email</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped>
.site-footer {
  margin-top: auto;
  padding: 2rem 1.25rem 2.5rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
}

.site-footer-inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-footer-note {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.site-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.25rem;
}

.site-footer-link {
  font-size: 0.875rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.site-footer-link:hover {
  color: var(--color-accent);
}

.site-footer-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .site-footer-link {
    transition: none;
  }
}
</style>
