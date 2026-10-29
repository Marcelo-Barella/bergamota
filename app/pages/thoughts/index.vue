<template>
  <div class="min-h-screen bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white">
    <section class="relative bg-white px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          class="mb-24 grid grid-cols-1 gap-6 border-l-8 border-[#d97706] pl-6 md:mb-32 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-x-10 md:gap-y-0 md:pl-8"
        >
          <h1
            class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            {{ t('home.projectsSection.titleLine1') }}<br />{{ t('home.projectsSection.titleLine2') }}
          </h1>
          <p class="font-editorial mt-8 max-w-sm text-3xl italic md:mt-0">
            {{ t('home.projectsSection.subtitle') }}
          </p>
        </div>
        <article class="showcase-custom-grid items-center">
          <div class="col-span-12 md:col-span-7">
            <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">{{ t('thoughts.tokenEfficiency.label') }}</span>
            <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/50">
              {{ t('thoughts.tokenEfficiency.kicker') }}
            </p>
            <h2 class="font-headline mt-4 mb-6 text-6xl font-bold">{{ t('thoughts.tokenEfficiency.title') }}</h2>
            <p class="text-lg font-medium leading-relaxed">
              {{ t('thoughts.tokenEfficiency.body') }}
            </p>
            <NuxtLink
              to="/thoughts/token-efficiency"
              class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
            >
              {{ t('common.seeTheStory') }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'showcase'
})

const { t } = useI18n()

useHead({
  title: `${t('home.projectsSection.titleLine1')} ${t('home.projectsSection.titleLine2')}`
})
</script>
