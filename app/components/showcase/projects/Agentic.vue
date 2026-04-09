<template>
  <div
    ref="projectRoot"
    class="scroll-smooth overflow-x-hidden bg-[#0a0b10] font-showcase text-[#f8f6f3] selection:bg-[#00f2ff] selection:text-black"
  >
    <nav
      data-gsap-project-nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-white/10 bg-[#0a0b10]/95 px-4 py-4 backdrop-blur-md md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink to="/" class="font-headline text-xl font-extrabold uppercase italic tracking-tighter text-white md:text-2xl">
        {{ t('home.brandInitials') }}
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white md:gap-8 md:text-[10px]"
      >
        <NuxtLink class="transition-colors hover:text-[#00f2ff]" to="/">{{ t('common.backToWork') }}</NuxtLink>
        <NuxtLink class="transition-colors hover:text-[#00f2ff]" to="/#projects">{{ t('common.experiments') }}</NuxtLink>
        <a
          class="bg-white px-3 py-1.5 text-black transition-all hover:bg-[#00f2ff] md:px-4 md:py-2"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('common.repository') }}</a>
      </div>
    </nav>

    <header
      data-gsap-project-hero
      class="relative flex min-h-screen flex-col justify-center overflow-x-clip overflow-y-visible px-4 pt-24 sm:px-6 md:overflow-visible md:px-10 md:pt-20"
    >
      <div class="pointer-events-none absolute inset-0 opacity-20">
        <div class="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#007abd] blur-[150px]" />
        <div class="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#3b82f6] blur-[120px]" />
      </div>
      <div class="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div
          data-gsap-project-hero-el
          class="showcase-skew-1-soft mb-6 inline-flex items-center gap-3 border border-[#3b82f6]/30 bg-[#3b82f6]/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00f2ff]"
        >
          <span class="material-symbols-outlined text-sm">hub</span>
          {{ t('projectPages.agentic.heroBadge') }}
        </div>
        <h1
          class="agentic-hero-h1 showcase-hero-title font-headline relative z-0 mb-8 max-w-full font-extrabold uppercase tracking-tighter max-md:tracking-tight md:mb-14"
        >
          <span data-gsap-project-hero-el class="block">{{ t('projectPages.agentic.heroTitle1') }}</span>
          <span
            data-gsap-project-hero-el
            class="block text-transparent"
            style="-webkit-text-stroke: 1px #f8f6f3"
          >{{ t('projectPages.agentic.heroTitle2') }}</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 items-end gap-12">
          <div class="relative z-10 col-span-12 md:col-span-5">
            <p data-gsap-project-hero-el class="mb-8 text-2xl font-light leading-tight text-white/85 md:text-3xl">
              {{ t(project.descriptionKey) }}
            </p>
            <p data-gsap-project-hero-el class="text-sm leading-relaxed text-white/50">
              {{ t('projectPages.agentic.heroSub') }}
            </p>
            <div class="mt-6 flex gap-6">
              <div class="mt-2 h-px w-24 bg-[#00f2ff]" />
              <span class="text-xs font-bold uppercase tracking-[0.35em] text-[#00f2ff]">{{ t('projectPages.agentic.heroTagline') }}</span>
            </div>
          </div>
          <div data-gsap-project-hero-visual class="group relative z-10 col-span-12 mt-12 min-w-0 max-w-full md:col-span-7 md:mt-0">
            <div
              class="showcase-rotate-pos-1-soft absolute -inset-4 z-0 border border-white/10 transition-transform duration-700 max-md:-inset-1 group-hover:rotate-0"
            />
            <div class="showcase-skew-1-soft relative z-10 aspect-video w-full max-w-full overflow-hidden border border-white/20 bg-white/5">
              <img
                data-gsap-project-hero-visual-img
                class="h-full w-full object-cover opacity-70 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                :src="project.imageSrc"
                :alt="t(project.imageAltKey)"
                loading="eager"
                decoding="async"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b10] to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="relative py-16 md:py-24">
      <section data-gsap-project-section class="mb-24 px-4 md:mb-32 md:px-10">
        <div class="showcase-custom-grid mx-auto max-w-7xl gap-0">
          <div class="showcase-rotate-neg-1-strong showcase-glass-card relative z-20 col-span-12 border border-white/10 p-12 md:col-span-6 md:p-16">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#00f2ff]">{{ t('projectPages.agentic.friction.label') }}</span>
            <h2 class="font-headline mt-4 mb-6 text-4xl font-bold md:text-5xl">{{ t('projectPages.agentic.friction.title') }}</h2>
            <p class="mb-6 text-lg font-light leading-relaxed text-white/60">
              {{ t('projectPages.agentic.friction.body') }}
            </p>
            <ul class="space-y-3 text-sm text-white/45">
              <li>{{ t('projectPages.agentic.friction.li1') }}</li>
              <li>{{ t('projectPages.agentic.friction.li2') }}</li>
            </ul>
          </div>
          <div class="col-span-12 min-w-0 max-w-full md:col-span-8 md:col-start-5 md:-mt-24">
            <div class="showcase-rotate-pos-1-soft relative aspect-video w-full max-w-full overflow-hidden bg-[#f8f6f3] shadow-2xl">
              <img
                data-gsap-project-media-parallax
                class="h-full w-full object-cover brightness-75 contrast-125 grayscale"
                src="/images/projects/agentic-browser-ai.png"
                alt=""
                loading="lazy"
                decoding="async"
              >
              <div class="pointer-events-none absolute inset-0 border-[20px] border-[#0a0b10]/50" />
            </div>
          </div>
        </div>
      </section>

      <section data-gsap-project-section class="relative mb-24 px-4 md:mb-32 md:px-10">
        <div class="absolute top-0 right-0 -skew-x-12 h-full w-1/2 bg-[#3b82f6]/5" />
        <div class="relative mx-auto max-w-7xl">
          <div
            data-gsap-section-head
            class="mb-14 max-w-3xl"
          >
            <h2
              class="font-headline max-w-full text-[clamp(2rem,6vw+0.5rem,4.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
            >
              {{ t('projectPages.agentic.capabilities.title') }}
            </h2>
            <p class="mt-6 text-lg text-white/55">
              {{ t('projectPages.agentic.capabilities.lead') }}
            </p>
          </div>
          <div data-gsap-project-stagger class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="border border-white/10 bg-white/5 p-10">
              <h3 class="mb-4 text-xl font-bold uppercase text-[#00f2ff]">{{ t('projectPages.agentic.wireup.title') }}</h3>
              <p class="text-sm leading-relaxed text-white/55">
                {{ t('projectPages.agentic.wireup.body') }}
              </p>
            </div>
            <div class="border border-white/10 bg-white/5 p-10">
              <h3 class="mb-4 text-xl font-bold uppercase text-white">{{ t('projectPages.agentic.quality.title') }}</h3>
              <p class="text-sm leading-relaxed text-white/55">
                {{ t('projectPages.agentic.quality.body') }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-gsap-project-section class="showcase-clip-path-asymmetric bg-[#f8f6f3] py-24 text-[#0a0b10] md:py-32">
        <div class="mx-auto min-w-0 max-w-7xl px-4 md:px-10">
          <div class="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div data-gsap-section-head>
              <span class="text-xs font-bold uppercase tracking-widest text-[#3b82f6]">{{ t('projectPages.agentic.reality.label') }}</span>
              <h2
                class="font-headline mt-4 max-w-full text-[clamp(2.25rem,6vw+0.5rem,5rem)] font-black uppercase leading-[0.9]"
              >
                {{ t('projectPages.agentic.reality.title') }}
              </h2>
              <p class="mt-6 max-w-xl text-lg text-black/60">
                {{ t('projectPages.agentic.reality.lead') }}
              </p>
            </div>
            <div class="max-w-md text-right">
              <p class="font-editorial text-2xl italic text-black/70">
                {{ t('projectPages.agentic.reality.aside') }}
              </p>
            </div>
          </div>
          <div data-gsap-project-stagger class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div class="border-2 border-[#0a0b10] bg-[#f8f6f3] p-10">
              <h4 class="mb-3 text-lg font-bold uppercase">{{ t('projectPages.agentic.promise1.title') }}</h4>
              <p class="text-sm leading-relaxed text-black/50">
                {{ t('projectPages.agentic.promise1.body') }}
              </p>
            </div>
            <div class="border-2 border-[#007abd] bg-[#007abd] p-10 text-white">
              <h4 class="mb-3 text-lg font-bold uppercase">{{ t('projectPages.agentic.promise2.title') }}</h4>
              <p class="text-sm leading-relaxed text-white/85">
                {{ t('projectPages.agentic.promise2.body') }}
              </p>
            </div>
            <div class="border-2 border-[#0a0b10] bg-[#f8f6f3] p-10">
              <h4 class="mb-3 text-lg font-bold uppercase">{{ t('projectPages.agentic.promise3.title') }}</h4>
              <p class="text-sm leading-relaxed text-black/50">
                {{ t('projectPages.agentic.promise3.body') }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <section class="relative overflow-x-clip px-4 py-20 md:px-10 md:py-32">
      <div data-gsap-project-cta class="mx-auto min-w-0 max-w-7xl">
        <div class="showcase-custom-grid items-end gap-12">
          <div class="col-span-12 md:col-span-5">
            <h3 class="font-headline mb-8 text-4xl font-bold uppercase leading-none md:text-5xl">
              {{ t('projectPages.agentic.bottomCta.title') }}
            </h3>
            <p class="mb-10 max-w-md text-white/50">
              {{ t('projectPages.agentic.bottomCta.lead') }}
            </p>
            <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
              <a
                data-gsap-magnetic
                class="inline-block border-2 border-[#00f2ff] bg-[#00f2ff] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-black"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
              >{{ t('common.openGitHub') }}</a>
              <NuxtLink
                class="inline-block border-2 border-white/40 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-[#00f2ff]"
                to="/#projects"
              >
                {{ t('common.moreProjects') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t border-white/10 p-10 opacity-60 transition-opacity hover:opacity-100">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        {{ t('projectPages.agentic.footerBrand') }}
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
        <span>{{ t('projectPages.agentic.footerMeta1') }}</span>
        <span>{{ t('projectPages.agentic.footerMeta2') }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
const { t } = useI18n()
const projectRoot = ref<HTMLElement | null>(null)
useShowcaseProjectGsap(projectRoot)
</script>

<style scoped>
@media (max-width: 767px) {
  .agentic-hero-h1.showcase-hero-title {
    font-size: clamp(1.45rem, min(9vw + 0.25rem, 8vh), 2.15rem);
    line-height: 0.9;
  }
}
</style>
