<template>
  <nav
    class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#1b1c1a]/10 bg-[#f8f6f3]/95 px-4 py-4 text-[#1b1c1a] backdrop-blur-sm sm:px-6 md:flex-nowrap md:px-10 md:py-6"
    :aria-label="t('common.navPrimary')"
  >
    <NuxtLink
      :to="localePath('/')"
      class="font-headline text-xl font-extrabold uppercase italic tracking-tighter md:text-2xl"
    >
      {{ t('home.brandInitials') }}
    </NuxtLink>
    <div
      class="flex max-w-full flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]"
    >
      <LocaleSwitcher theme="showcase-light" />
      <a class="transition-colors hover:text-[#d97706]" :href="homeTo('#hero')">
        {{ t('home.nav.manifesto') }}
      </a>
      <a class="transition-colors hover:text-[#d97706]" :href="homeTo('#projects')">
        {{ t('home.nav.experiments') }}
      </a>
      <a class="transition-colors hover:text-[#d97706]" :href="homeTo('#meetup-photos')">
        {{ t('home.nav.chaos') }}
      </a>
      <NuxtLink
        class="transition-colors hover:text-[#d97706]"
        :class="{ 'text-[#d97706]': onLessons }"
        :to="localePath('/lessons')"
      >
        {{ t('home.nav.lessons') }}
      </NuxtLink>
      <a
        class="transition-colors hover:text-[#d97706]"
        :class="{ 'text-[#d97706]': !onLessons }"
        :href="homeTo('#contact')"
      >
        {{ t('home.nav.talk') }}
      </a>
    </div>
  </nav>
  <slot />
  <footer
    class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#1b1c1a] bg-[#f8f6f3] p-10 md:flex-row"
  >
    <div class="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
      <img
        class="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
        src="/images/assets/tangerine.svg"
        :alt="t('home.footer.tangerineAlt')"
        width="64"
        height="64"
        loading="lazy"
        decoding="async"
      >
      <div class="text-center font-headline text-xl font-bold uppercase italic tracking-tighter md:text-left">
        {{ t('home.footer.attribution') }}
      </div>
    </div>
    <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100">
      <span>{{ t('home.footer.builtWithCursor') }}</span>
      <span>{{ t('home.footer.builtForWeb') }}</span>
      <span>{{ t('home.footer.stayWeird') }}</span>
    </div>
  </footer>
  <p class="pb-8 text-center text-[0.7rem] tracking-[0.02em] text-[#1b1c1a]/40">
    {{ t('home.finePrint') }}
  </p>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const onLessons = computed(() => route.path.includes('/lessons'))

function homeTo(hash: string) {
  const path = localePath('/')
  return `${path}${hash}`
}
</script>
