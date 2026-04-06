<template>
  <div class="app-root">
    <div class="theme-toggle">
      <LocaleSwitcher class="locale-switcher-slot" />
      <UColorModeButton />
    </div>
    <div v-if="showNoise" class="noise-overlay" aria-hidden="true" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const showNoise = true
</script>

<style>
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}

.app-root {
  position: relative;
  min-height: 100vh;
  width: 100%;
  min-width: 0;
  overflow-x: clip;
}

.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  transition: opacity var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.locale-switcher-slot {
  margin-right: 0.15rem;
}

.theme-toggle:focus-within {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle {
    transition: none;
  }
}

.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
