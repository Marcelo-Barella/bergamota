<template>
  <div class="layout-shell">
    <SiteNav />
    <Transition name="page-surface" mode="out-in">
      <main :key="route.fullPath" class="main-content">
        <slot />
      </main>
    </Transition>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.layout-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  min-height: 0;
}

.page-surface-enter-active,
.page-surface-leave-active {
  transition: opacity var(--motion-duration-medium, 0.28s) var(--motion-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
}

.page-surface-enter-from,
.page-surface-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-surface-enter-active,
  .page-surface-leave-active {
    transition: none;
  }

  .page-surface-enter-from,
  .page-surface-leave-to {
    opacity: 1;
  }
}
</style>
