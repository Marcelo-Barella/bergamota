<template>
  <div class="locale-switcher" role="navigation" aria-label="Language">
    <NuxtLink
      v-for="item in localeItems"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      class="locale-switcher-link"
      :class="{ 'locale-switcher-link--active': locale === item.code }"
      :hreflang="item.code === 'pt-BR' ? 'pt-BR' : 'en'"
    >
      {{ item.short }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const localeItems = computed(() => {
  const list = unref(locales)
  return list.map((l) => {
    const code = typeof l === 'string' ? l : l.code
    const short = code === 'pt-BR' ? 'PT' : 'EN'
    return { code, short }
  })
})
</script>

<style scoped>
.locale-switcher {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.locale-switcher-link {
  color: var(--color-muted);
  text-decoration: none;
  padding: 0.15rem 0.35rem;
  border-radius: 2px;
  transition:
    color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease),
    background-color var(--motion-duration-fast, 0.18s) var(--motion-ease-standard, ease);
}

.locale-switcher-link:hover {
  color: var(--color-accent);
}

.locale-switcher-link--active {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-text) 8%, transparent);
}

.locale-switcher-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .locale-switcher-link {
    transition: none;
  }
}
</style>
