<template>
  <div
    ref="projectRoot"
    class="scroll-smooth overflow-x-hidden bg-[#fffbf2] font-showcase text-[#0a0a0a] selection:bg-[#9ef01a] selection:text-black"
  >
    <nav
      data-gsap-project-nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#0a0a0a]/10 bg-[#fffbf2]/95 px-4 py-4 text-[#0a0a0a] backdrop-blur-sm md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink to="/" class="font-headline text-xl font-black uppercase italic tracking-tighter md:text-2xl">{{ t('home.brandInitials') }}</NuxtLink>
      <div class="flex max-w-full flex-wrap items-center justify-end gap-4 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]">
        <NuxtLink class="transition-colors hover:text-[#ff5c00]" to="/">{{ t('common.backToWork') }}</NuxtLink>
        <span class="opacity-30">{{ t('common.slash') }}</span>
        <a
          class="transition-colors hover:text-[#ff5c00]"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('common.github') }}</a>
      </div>
    </nav>

    <header
      data-gsap-project-hero
      class="relative flex min-h-screen flex-col overflow-visible pt-28 md:pt-32"
    >
      <div class="showcase-grainy-bg pointer-events-none absolute inset-0" />
      <div class="relative z-20 mx-auto w-full min-w-0 max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div
          data-gsap-project-hero-el
          class="showcase-rotate-neg-2 mb-8 inline-block bg-[#9ef01a] px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-black"
        >
          {{ t('projectPages.tangerina.heroBadge') }}
        </div>
        <h1
          class="showcase-hero-title-tight font-headline relative z-0 mb-8 font-extrabold uppercase tracking-tighter md:mb-12"
        >
          <span data-gsap-project-hero-el class="block">{{ t('projectPages.tangerina.heroTitle1') }}</span>
          <span data-gsap-project-hero-el class="block">{{ t('projectPages.tangerina.heroTitle2') }}<span class="italic text-[#ff5c00]">{{ t('projectPages.tangerina.heroTitleAccent') }}</span></span>
        </h1>
        <div class="showcase-custom-grid relative z-10">
          <div class="relative z-10 col-span-12 md:col-span-6">
            <p
              data-gsap-project-hero-el
              class="mb-8 border-l-8 border-[#ff5c00] pl-6 text-2xl font-bold uppercase leading-[0.95] md:text-4xl"
            >
              {{ t(project.descriptionKey) }}
            </p>
            <div data-gsap-project-hero-el class="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest">
              <span class="border border-[#0a0a0a] px-3 py-1">{{ t('projectPages.tangerina.tags.voiceMusic') }}</span>
              <span class="border border-[#0a0a0a] px-3 py-1">{{ t('projectPages.tangerina.tags.conversation') }}</span>
              <span class="border border-[#0a0a0a] px-3 py-1">{{ t('projectPages.tangerina.tags.serverActions') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        data-gsap-project-hero-visual
        class="absolute top-1/4 right-0 z-[1] h-[min(70vh,819px)] w-[min(92vw,100%)] max-w-full translate-x-8 sm:translate-x-12 md:h-[1126px] md:w-3/5 md:translate-x-32 showcase-rotate-pos-3"
      >
        <div class="relative h-full w-full overflow-hidden bg-[#ff5c00] shadow-2xl">
          <img
            data-gsap-project-hero-visual-img
            class="h-full w-full object-cover opacity-90 mix-blend-multiply contrast-125"
            :src="project.imageSrc"
            :alt="t(project.imageAltKey)"
            loading="eager"
            decoding="async"
          >
          <div
            class="showcase-outline-text absolute left-4 top-6 font-headline text-[clamp(3.5rem,min(14vw,15vh),9rem)] font-black text-white sm:left-10 sm:top-10"
          >
            {{ t('projectPages.tangerina.visualWatermark') }}
          </div>
        </div>
      </div>
    </header>

    <section data-gsap-project-section class="relative px-6 py-24 md:px-10 md:py-32">
      <div class="mx-auto max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-14 border-l-8 border-[#9ef01a] pl-6 md:pl-8"
        >
          <h2 class="font-headline text-4xl font-black uppercase leading-none md:text-5xl">
            {{ t('projectPages.tangerina.section1.title') }}
          </h2>
          <p class="mt-6 max-w-2xl text-lg opacity-80">
            {{ t('projectPages.tangerina.section1.lead') }}
          </p>
        </div>
        <div class="showcase-custom-grid gap-y-16">
          <div class="showcase-rotate-neg-2 col-span-12 bg-[#0a0a0a] p-10 text-[#fffbf2] shadow-2xl md:col-span-6 md:p-16">
            <span class="mb-6 block text-xs font-bold uppercase tracking-widest text-[#9ef01a]">{{ t('projectPages.tangerina.challenge.label') }}</span>
            <h3 class="font-headline mb-6 text-3xl font-black uppercase md:text-4xl">
              {{ t('projectPages.tangerina.challenge.title') }}
            </h3>
            <p class="text-lg leading-relaxed opacity-85">
              {{ t('projectPages.tangerina.challenge.body') }}
            </p>
          </div>
          <div class="col-span-12 flex flex-col gap-10 md:col-span-5 md:col-start-8">
            <div class="border-t-2 border-[#ff5c00] pt-6">
              <h3 class="mb-4 text-xl font-bold uppercase">{{ t('projectPages.tangerina.aside1.title') }}</h3>
              <p class="opacity-75">
                {{ t('projectPages.tangerina.aside1.body') }}
              </p>
            </div>
            <div class="border-t-2 border-[#9ef01a] pt-6">
              <h3 class="mb-4 text-xl font-bold uppercase">{{ t('projectPages.tangerina.aside2.title') }}</h3>
              <p class="opacity-75">
                {{ t('projectPages.tangerina.aside2.body') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section data-gsap-project-section class="overflow-hidden bg-[#ff5c00] py-16">
      <div
        class="pointer-events-none flex select-none whitespace-nowrap font-headline text-[clamp(4rem,18vw,15rem)] font-black uppercase italic leading-none opacity-90"
      >
        <span class="mr-16 text-white/25">{{ t('projectPages.tangerina.marquee.voice') }}</span>
        <span class="mr-16 text-black">{{ t('projectPages.tangerina.marquee.music') }}</span>
        <span class="mr-16 text-white/25">{{ t('projectPages.tangerina.marquee.smartActions') }}</span>
        <span class="text-black">{{ t('projectPages.tangerina.marquee.discord') }}</span>
      </div>
    </section>

    <section data-gsap-project-section class="bg-white px-6 py-24 md:px-10 md:py-32">
      <div class="mx-auto max-w-[1400px]">
        <div class="mb-16 flex flex-col items-baseline justify-between gap-8 md:flex-row">
          <div
            data-gsap-section-head
            class="max-w-2xl"
          >
            <h2
              class="font-headline max-w-full text-[clamp(2.25rem,6vw+0.5rem,5rem)] font-black uppercase leading-[0.9] tracking-tighter"
            >
              {{ t('projectPages.tangerina.builtSection.titleBefore') }}<span class="text-[#2b9348]">{{ t('projectPages.tangerina.builtSection.titleHighlight') }}</span>
            </h2>
            <p class="mt-6 text-lg text-black/65">
              {{ t('projectPages.tangerina.builtSection.lead') }}
            </p>
          </div>
          <div class="max-w-sm font-editorial text-2xl italic text-black/70">
            {{ t('projectPages.tangerina.builtSection.aside') }}
          </div>
        </div>
        <div data-gsap-project-stagger class="grid grid-cols-12 gap-6">
          <div class="col-span-12 border-4 border-[#0a0a0a] bg-[#fffbf2] p-8 md:col-span-5">
            <span class="font-headline text-5xl font-black italic text-[#ff5c00]">{{ t('projectPages.tangerina.toolsCard.title') }}</span>
            <p class="mt-2 font-bold uppercase tracking-widest text-sm">{{ t('projectPages.tangerina.toolsCard.subtitle') }}</p>
            <p class="mt-4 text-sm leading-relaxed text-black/60">
              {{ t('projectPages.tangerina.toolsCard.body') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-6 md:col-start-7">
            <div class="space-y-6 text-lg leading-relaxed">
              <p>
                {{ t('projectPages.tangerina.toolsColumn.p1') }}
              </p>
              <p>
                {{ t('projectPages.tangerina.toolsColumn.p2') }}
              </p>
              <p>
                <a
                  class="text-[#ff5c00] underline decoration-2 underline-offset-4 font-bold uppercase text-sm tracking-widest"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ t('common.openRepository') }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section data-gsap-project-section class="bg-[#0a0a0a] px-6 py-24 text-[#fffbf2] md:px-10 md:py-32">
      <div class="mx-auto max-w-4xl">
        <h2
          data-gsap-section-head
          class="font-headline mb-12 max-w-full text-[clamp(2.5rem,8vw+0.5rem,6rem)] font-black uppercase leading-[0.85] tracking-tighter"
        >
          {{ t('projectPages.tangerina.outcome.title') }}
        </h2>
        <p class="mb-12 text-lg leading-relaxed opacity-70">
          {{ t('projectPages.tangerina.outcome.body') }}
        </p>
        <div data-gsap-project-cta class="flex flex-col items-center justify-between gap-10 border-t border-white/20 pt-12 md:flex-row">
          <div class="font-headline text-3xl font-bold uppercase tracking-tighter text-center md:text-left">
            {{ t('projectPages.tangerina.outcome.ctaLabel') }}
          </div>
          <a
            data-gsap-magnetic
            class="group relative overflow-hidden bg-[#ff5c00] px-12 py-6 text-lg font-black uppercase tracking-widest text-[#0a0a0a]"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">{{ t('common.cloneOnGitHub') }}</span>
            <div class="absolute inset-0 translate-x-full bg-[#9ef01a] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#0a0a0a] bg-[#fffbf2] p-10 md:flex-row">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        {{ t('projectPages.tangerina.footerBrand') }}
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
        <NuxtLink class="transition-all hover:text-[#ff5c00] hover:opacity-100" to="/">{{ t('common.backToPortfolio') }}</NuxtLink>
        <a class="transition-all hover:text-[#ff5c00] hover:opacity-100" :href="mailtoHref">{{ t('common.email') }}</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
const { t } = useI18n()
const { mailtoHref } = useContact()
const projectRoot = ref<HTMLElement | null>(null)
useShowcaseProjectGsap(projectRoot)
</script>
