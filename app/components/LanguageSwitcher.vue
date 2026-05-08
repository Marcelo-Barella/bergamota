<template>
  <div
    class="lang-switcher"
    :class="variant === 'showcase' ? 'lang-switcher--showcase' : 'lang-switcher--shell'"
  >
    <label :id="labelId" class="lang-switcher-label" :for="selectId">
      {{ t('a11y.language_label') }}
    </label>
    <select
      :id="selectId"
      class="lang-switcher-select"
      :value="locale"
      :aria-describedby="descId"
      @change="onSelectChange"
    >
      <option
        v-for="item in localeOptions"
        :key="item.code"
        :value="item.code"
      >
        {{ item.label }}
      </option>
    </select>
    <span :id="descId" class="lang-switcher-sr">
      {{ t('a11y.language_hint', { current: currentLabel }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'shell' | 'showcase'
  }>(),
  { variant: 'shell' }
)

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const selectId = useId()
const labelId = `${selectId}-label`
const descId = `${selectId}-desc`

const localeOptions = computed(() => {
  const list = locales.value as (string | { code: string; name?: string })[]
  return list.map((entry) => {
    const code = typeof entry === 'string' ? entry : entry.code
    const label =
      typeof entry === 'string'
        ? code
        : (entry.name ?? code)
    return { code, label }
  })
})

const currentLabel = computed(() => {
  const found = localeOptions.value.find((o) => o.code === locale.value)
  return found?.label ?? locale.value
})

function onSelectChange(event: Event) {
  const el = event.target as HTMLSelectElement
  const next = el.value
  if (next === locale.value) {
    return
  }
  const path = switchLocalePath(next as typeof locale.value)
  if (path) {
    router.push(path)
  }
}
</script>

<style scoped>
.lang-switcher {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.lang-switcher--shell {
  flex-shrink: 0;
}

.lang-switcher-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.lang-switcher--shell .lang-switcher-label {
  color: var(--color-muted);
}

.lang-switcher-select {
  min-width: 10rem;
  max-width: 100%;
  font: inherit;
  font-size: 0.875rem;
  line-height: 1.3;
  padding: 0.35rem 0.5rem;
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);
  border-radius: 4px;
  cursor: pointer;
}

.lang-switcher-select:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.lang-switcher--showcase .lang-switcher-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.85;
}

.lang-switcher--showcase .lang-switcher-select {
  min-width: 8.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.35rem 0.45rem;
  border-radius: 2px;
  color: inherit;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
}

.lang-switcher--showcase .lang-switcher-select:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.lang-switcher-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.lang-switcher {
  position: relative;
}

@media (prefers-reduced-motion: reduce) {
  .lang-switcher-select {
    transition: none;
  }
}
</style>
