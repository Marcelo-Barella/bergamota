<template>
  <header class="site-nav" role="banner">
    <nav class="site-nav-inner" aria-label="Primary">
      <NuxtLink to="/" class="site-nav-brand">Bergamota</NuxtLink>
      <div class="site-nav-actions">
      <ul class="site-nav-list">
        <li>
          <NuxtLink
            to="/#hero"
            class="site-nav-link"
            :class="{ 'site-nav-link--current': isHashCurrent('#hero') }"
          >
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/#projects"
            class="site-nav-link"
            :class="{ 'site-nav-link--current': isHashCurrent('#projects') }"
          >
            Projects
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/#contact"
            class="site-nav-link"
            :class="{ 'site-nav-link--current': isHashCurrent('#contact') }"
          >
            Contact
          </NuxtLink>
        </li>
      </ul>
      <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

function isHashCurrent(hash: string) {
  if (route.path !== '/') {
    return false
  }
  const h = route.hash || '#hero'
  return h === hash || (hash === '#hero' && !route.hash)
}
</script>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 0.65rem 1.25rem;
  background: color-mix(in srgb, var(--color-bg) 82%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
}

.site-nav-inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-nav-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 1rem 1.5rem;
}

.site-nav-brand {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.05rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.site-nav-brand:hover {
  color: var(--color-accent);
}

.site-nav-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 1.15rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav-link {
  font-size: 0.9rem;
  color: var(--color-muted);
  text-decoration: none;
  padding: 0.2rem 0;
  border-bottom: 1px solid transparent;
  transition:
    color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease),
    border-color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.site-nav-link:hover {
  color: var(--color-accent);
}

.site-nav-link--current {
  color: var(--color-text);
  border-bottom-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
}

.site-nav-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .site-nav-brand,
  .site-nav-link {
    transition: none;
  }
}
</style>
