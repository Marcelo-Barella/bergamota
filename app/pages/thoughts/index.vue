<template>
  <div class="min-h-screen bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white">
    <div class="fixed top-6 right-4 z-50 sm:right-6 md:right-10">
      <LocaleSwitcher theme="showcase-light" />
    </div>
    <section class="relative bg-white px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          class="mb-16 grid grid-cols-1 gap-6 border-l-8 border-[#d97706] pl-6 md:mb-24 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-x-10 md:gap-y-0 md:pl-8"
        >
          <h1
            class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            {{ t('thoughts.titleLine1') }}<br />{{ t('thoughts.titleLine2') }}
          </h1>
          <p class="font-editorial mt-8 max-w-sm text-3xl italic md:mt-0">
            {{ t('thoughts.description') }}
          </p>
        </div>
        <div class="space-y-32 md:space-y-40">
          <article
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="showcase-custom-grid items-center"
          >
            <div
              class="group relative col-span-12 md:col-span-7"
              :class="index % 2 === 1 ? 'order-1 md:order-2 md:col-start-6' : ''"
            >
              <div
                class="absolute inset-0 bg-[#d97706]/10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                :class="index % 2 === 1 ? 'translate-x-4 -translate-y-4' : '-translate-x-4 translate-y-4'"
              />
              <NuxtLink
                :to="lesson.to"
                class="relative block overflow-hidden border-2 border-[#1b1c1a]/10"
              >
                <img
                  class="aspect-video w-full object-cover transition-all duration-700 group-hover:brightness-105"
                  :src="lesson.image"
                  :alt="t(lesson.altKey)"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div
              class="col-span-12 mt-12 md:col-span-4 md:mt-0"
              :class="index % 2 === 1 ? 'showcase-rotate-neg-1 order-2 md:order-1' : 'showcase-rotate-pos-1 md:col-start-9'"
            >
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">{{ t(lesson.labelKey) }}</span>
              <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/50">
                {{ t(lesson.kickerKey) }}
              </p>
              <h2 class="font-headline mt-4 mb-6 text-6xl font-bold">{{ t(lesson.titleKey) }}</h2>
              <p class="text-lg font-medium leading-relaxed">
                {{ t(lesson.bodyKey) }}
              </p>
              <NuxtLink
                :to="lesson.to"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                {{ t('common.seeTheStory') }}
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'showcase'
})

const { t } = useI18n()

const lessons = [
  {
    id: 'token-efficiency',
    to: '/thoughts/token-efficiency',
    image: '/images/thoughts/token-efficiency.svg',
    labelKey: 'thoughts.tokenEfficiency.label',
    kickerKey: 'thoughts.tokenEfficiency.kicker',
    titleKey: 'thoughts.tokenEfficiency.title',
    bodyKey: 'thoughts.tokenEfficiency.body',
    altKey: 'thoughts.tokenEfficiency.imageAlt'
  }
]

useHead({
  title: `${t('thoughts.titleLine1')} ${t('thoughts.titleLine2')}`
})
</script>
