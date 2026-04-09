<template>
  <div ref="rootRef" class="locale-switcher" :class="themeClass" @keyup.esc.stop="close">
    <button
      :id="buttonId"
      ref="buttonRef"
      type="button"
      class="locale-switcher__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listId"
      :aria-label="t('layout.language')"
      @click="toggle"
      @keydown.down.prevent="openAndFocusFirst"
      @keydown.up.prevent="openAndFocusFirst"
    >
      <span class="locale-switcher__flag" aria-hidden="true">{{ currentFlag }}</span>
      <span class="locale-switcher__code">{{ currentShort }}</span>
      <span class="sr-only">{{ currentLocaleName }}</span>
    </button>
    <ul
      v-show="open"
      :id="listId"
      ref="listRef"
      class="locale-switcher__list"
      role="listbox"
      :aria-label="t('layout.languageMenu')"
      tabindex="-1"
      @keydown.down.prevent="focusNextLink"
      @keydown.up.prevent="focusPrevLink"
      @keydown.home.prevent="focusFirstLink"
      @keydown.end.prevent="focusLastLink"
    >
      <li v-for="item in items" :key="item.code" class="locale-switcher__item" role="none">
        <NuxtLink
          v-if="item.code !== locale"
          :to="switchLocalePath(item.code)"
          class="locale-switcher__option locale-switcher__option--link"
          role="option"
          :aria-selected="false"
          :lang="item.language"
          :hreflang="item.language"
          @click="close"
        >
          <span class="locale-switcher__flag" aria-hidden="true">{{ item.flag }}</span>
          <span class="locale-switcher__code">{{ item.short }}</span>
          <span class="sr-only">{{ item.name }}</span>
        </NuxtLink>
        <span
          v-else
          class="locale-switcher__option locale-switcher__option--current"
          role="option"
          aria-selected="true"
          aria-current="true"
        >
          <span class="locale-switcher__flag" aria-hidden="true">{{ item.flag }}</span>
          <span class="locale-switcher__code">{{ item.short }}</span>
          <span class="sr-only">{{ item.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'default' | 'showcase-light' | 'showcase-dark' | 'showcase-dark-indigo'
  }>(),
  { theme: 'default' },
)

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const buttonId = useId()
const listId = `${buttonId}-list`

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const listRef = ref<HTMLUListElement | null>(null)

const themeClass = computed(() => ({
  'locale-switcher--default': props.theme === 'default',
  'locale-switcher--showcase-light': props.theme === 'showcase-light',
  'locale-switcher--showcase-dark': props.theme === 'showcase-dark',
  'locale-switcher--showcase-dark-indigo': props.theme === 'showcase-dark-indigo',
}))

type LocaleItem = { code: string; name: string; short: string; flag: string; language: string }

const items = computed((): LocaleItem[] => {
  const list = locales.value as { code: string; name?: string; language?: string }[]
  return list.map((loc) => ({
    code: loc.code,
    name: loc.name || loc.code,
    language: loc.language || (loc.code === 'pt-BR' ? 'pt-BR' : 'en-US'),
    short: loc.code === 'pt-BR' ? 'BR' : 'EN',
    flag: loc.code === 'pt-BR' ? '\u{1F1E7}\u{1F1F7}' : '\u{1F1FA}\u{1F1F8}',
  }))
})

const current = computed(() => items.value.find((x) => x.code === locale.value) ?? items.value[0])
const currentFlag = computed(() => current.value?.flag ?? '')
const currentShort = computed(() => current.value?.short ?? '')
const currentLocaleName = computed(() => current.value?.name ?? '')

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function listLinks() {
  return [
    ...(listRef.value?.querySelectorAll<HTMLAnchorElement>('a.locale-switcher__option--link') ?? []),
  ]
}

function openAndFocusFirst() {
  if (!open.value) {
    open.value = true
  }
  nextTick(() => listLinks()[0]?.focus())
}

function focusFirstLink() {
  listLinks()[0]?.focus()
}

function focusLastLink() {
  const links = listLinks()
  links[links.length - 1]?.focus()
}

function focusNextLink() {
  const links = listLinks()
  const i = links.indexOf(document.activeElement as HTMLAnchorElement)
  if (i >= 0 && i < links.length - 1) {
    links[i + 1]?.focus()
  } else {
    links[0]?.focus()
  }
}

function focusPrevLink() {
  const links = listLinks()
  const i = links.indexOf(document.activeElement as HTMLAnchorElement)
  if (i > 0) {
    links[i - 1]?.focus()
  } else {
    links[links.length - 1]?.focus()
  }
}

watch(open, (v) => {
  if (!v) {
    buttonRef.value?.focus()
  }
})

onMounted(() => {
  const onDocPointer = (e: Event) => {
    if (!open.value) {
      return
    }
    const t = e.target
    if (t instanceof Node && rootRef.value?.contains(t)) {
      return
    }
    open.value = false
  }
  document.addEventListener('pointerdown', onDocPointer, true)
  onUnmounted(() => document.removeEventListener('pointerdown', onDocPointer, true))
})
</script>

<style scoped>
.sr-only {
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

.locale-switcher {
  position: relative;
  z-index: 60;
}

.locale-switcher__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.55rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;
}

.locale-switcher__list {
  position: absolute;
  right: 0;
  top: calc(100% + 0.35rem);
  min-width: 9rem;
  margin: 0;
  padding: 0.35rem 0;
  list-style: none;
  border-radius: 0.375rem;
  border: 1px solid;
  box-shadow: 0 8px 24px color-mix(in srgb, #000 12%, transparent);
}

.locale-switcher__item {
  margin: 0;
}

.locale-switcher__option {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.45rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: default;
  text-align: left;
}

.locale-switcher__option--link {
  cursor: pointer;
}

.locale-switcher__flag {
  font-size: 1rem;
  line-height: 1;
}

.locale-switcher__trigger:focus-visible,
.locale-switcher__option--link:focus-visible {
  outline: 2px solid var(--locale-focus, currentColor);
  outline-offset: 2px;
}

.locale-switcher--default .locale-switcher__trigger {
  color: var(--color-muted);
  border-color: color-mix(in srgb, var(--color-text) 14%, transparent);
}

.locale-switcher--default .locale-switcher__trigger:hover,
.locale-switcher--default .locale-switcher__trigger[aria-expanded='true'] {
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.locale-switcher--default .locale-switcher__list {
  background: var(--color-bg);
  border-color: color-mix(in srgb, var(--color-text) 12%, transparent);
  --locale-focus: var(--color-accent);
}

.locale-switcher--default .locale-switcher__option--link {
  color: var(--color-muted);
}

.locale-switcher--default .locale-switcher__option--link:hover {
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-text) 5%, transparent);
}

.locale-switcher--default .locale-switcher__option--current {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
}

.locale-switcher--showcase-light .locale-switcher__trigger {
  color: #1b1c1a;
  border-color: color-mix(in srgb, #1b1c1a 18%, transparent);
  --locale-focus: #d97706;
}

.locale-switcher--showcase-light .locale-switcher__trigger:hover,
.locale-switcher--showcase-light .locale-switcher__trigger[aria-expanded='true'] {
  border-color: color-mix(in srgb, #d97706 55%, transparent);
}

.locale-switcher--showcase-light .locale-switcher__list {
  background: #f8f6f3;
  border-color: color-mix(in srgb, #1b1c1a 12%, transparent);
}

.locale-switcher--showcase-light .locale-switcher__option--link {
  color: #1b1c1a;
}

.locale-switcher--showcase-light .locale-switcher__option--link:hover {
  color: #d97706;
  background: color-mix(in srgb, #1b1c1a 6%, transparent);
}

.locale-switcher--showcase-light .locale-switcher__option--current {
  color: #1b1c1a;
  background: color-mix(in srgb, #d97706 18%, transparent);
}

.locale-switcher--showcase-dark .locale-switcher__trigger {
  color: #f8f6f3;
  border-color: color-mix(in srgb, #fff 22%, transparent);
  --locale-focus: #d97706;
}

.locale-switcher--showcase-dark .locale-switcher__trigger:hover,
.locale-switcher--showcase-dark .locale-switcher__trigger[aria-expanded='true'] {
  border-color: color-mix(in srgb, #fff 45%, transparent);
}

.locale-switcher--showcase-dark .locale-switcher__list {
  background: #0a0b10;
  border-color: color-mix(in srgb, #fff 14%, transparent);
}

.locale-switcher--showcase-dark .locale-switcher__option--link {
  color: #e2e8f0;
}

.locale-switcher--showcase-dark .locale-switcher__option--link:hover {
  color: #00f2ff;
  background: color-mix(in srgb, #fff 8%, transparent);
}

.locale-switcher--showcase-dark .locale-switcher__option--current {
  color: #fff;
  background: color-mix(in srgb, #00f2ff 22%, transparent);
}

.locale-switcher--showcase-dark-indigo .locale-switcher__trigger {
  color: #cbd5e1;
  border-color: color-mix(in srgb, #fff 14%, transparent);
  --locale-focus: #a5b4fc;
}

.locale-switcher--showcase-dark-indigo .locale-switcher__trigger:hover,
.locale-switcher--showcase-dark-indigo .locale-switcher__trigger[aria-expanded='true'] {
  border-color: color-mix(in srgb, #312e81 65%, #fff 35%);
}

.locale-switcher--showcase-dark-indigo .locale-switcher__list {
  background: #0f1115;
  border-color: color-mix(in srgb, #fff 12%, transparent);
}

.locale-switcher--showcase-dark-indigo .locale-switcher__option--link {
  color: #cbd5e1;
}

.locale-switcher--showcase-dark-indigo .locale-switcher__option--link:hover {
  color: #fff;
  background: color-mix(in srgb, #312e81 45%, transparent);
}

.locale-switcher--showcase-dark-indigo .locale-switcher__option--current {
  color: #fff;
  background: color-mix(in srgb, #312e81 55%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .locale-switcher__trigger,
  .locale-switcher__option--link {
    transition: none;
  }
}
</style>
