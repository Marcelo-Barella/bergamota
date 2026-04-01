<template>
  <div
    class="scroll-smooth overflow-x-hidden bg-[#0a0b10] font-showcase text-[#f8f6f3] selection:bg-[#00f2ff] selection:text-black"
  >
    <nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-white/10 bg-[#0a0b10]/95 px-4 py-4 backdrop-blur-md md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink to="/" class="font-headline text-xl font-extrabold uppercase italic tracking-tighter text-white md:text-2xl">
        M. Barella
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white md:gap-8 md:text-[10px]"
      >
        <NuxtLink class="transition-colors hover:text-[#00f2ff]" to="/">Back to Work</NuxtLink>
        <NuxtLink class="transition-colors hover:text-[#00f2ff]" to="/#projects">Experiments</NuxtLink>
        <a
          class="bg-white px-3 py-1.5 text-black transition-all hover:bg-[#00f2ff] md:px-4 md:py-2"
          href="mailto:hello@bergamota.dev"
        >Let's Sync</a>
      </div>
    </nav>

    <header
      class="relative flex min-h-screen flex-col justify-center overflow-x-clip overflow-y-visible px-4 pt-24 sm:px-6 md:overflow-visible md:px-10 md:pt-20"
    >
      <div class="pointer-events-none absolute inset-0 opacity-20">
        <div class="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#007abd] blur-[150px]" />
        <div class="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#3b82f6] blur-[120px]" />
      </div>
      <div class="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div
          class="showcase-skew-1-soft mb-6 inline-flex items-center gap-3 border border-[#3b82f6]/30 bg-[#3b82f6]/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00f2ff]"
        >
          <span class="material-symbols-outlined text-sm">precision_manufacturing</span>
          Agentic browser AI / Phase 04
        </div>
        <h1
          class="agentic-hero-h1 showcase-hero-title font-headline relative z-0 mb-8 max-w-full font-extrabold uppercase tracking-tighter max-md:tracking-tight md:mb-14"
        >
          Digital<br />
          <span class="text-transparent" style="-webkit-text-stroke: 1px #f8f6f3">Autonomy</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 items-end gap-12">
          <div class="relative z-10 col-span-12 md:col-span-5">
            <p class="mb-10 text-3xl font-light leading-tight text-white/80">
              {{ project.description }}
            </p>
            <div class="flex gap-6">
              <div class="mt-4 h-px w-24 bg-[#00f2ff]" />
              <span class="text-xs font-bold uppercase tracking-[0.4em] text-[#00f2ff]">Prototype V.01</span>
            </div>
          </div>
          <div class="group relative z-10 col-span-12 mt-12 min-w-0 max-w-full md:col-span-7 md:mt-0">
            <div
              class="showcase-rotate-pos-1-soft absolute -inset-4 z-0 border border-white/10 transition-transform duration-700 max-md:-inset-1 group-hover:rotate-0"
            />
            <div class="showcase-skew-1-soft relative z-10 aspect-video w-full max-w-full overflow-hidden border border-white/20 bg-white/5">
              <img
                class="h-full w-full object-cover opacity-70 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                :src="project.imageSrc"
                :alt="project.imageAlt"
                loading="eager"
                decoding="async"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b10] to-transparent opacity-60" />
              <div class="absolute left-8 top-8 flex flex-col gap-2">
                <div class="h-3 w-3 rounded-full bg-[#00f2ff]" />
                <div class="h-3 w-3 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="relative py-20">
      <section class="mb-32 px-4 md:mb-64 md:px-10">
        <div class="showcase-custom-grid mx-auto max-w-7xl gap-0">
          <div class="showcase-rotate-neg-1-strong showcase-glass-card relative z-20 col-span-12 border border-white/10 p-16 md:col-span-6">
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#00f2ff]">The Friction</span>
            <h2 class="font-headline mt-4 mb-8 text-6xl font-bold">Static Browsing is Dead.</h2>
            <p class="mb-6 text-xl font-light leading-relaxed text-white/60">
              This repo explores autonomous browsing patterns and AI-driven interaction loops—moving past passive tabs toward agents that plan, act, and verify.
            </p>
            <ul class="space-y-4 text-sm font-bold tracking-wide">
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 bg-[#00f2ff]" /> INTERFACE RIGIDITY
              </li>
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 bg-[#00f2ff]" /> MANUAL TASK REPETITION
              </li>
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 bg-[#00f2ff]" /> CONTEXT FRAGMENTATION
              </li>
            </ul>
          </div>
          <div class="col-span-12 min-w-0 max-w-full md:col-span-8 md:col-start-5 md:-mt-32">
            <div class="showcase-rotate-pos-1-soft relative aspect-video w-full max-w-full overflow-hidden bg-[#f8f6f3] shadow-2xl">
              <img
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

      <section class="relative mb-32 px-4 md:mb-64 md:px-10">
        <div class="absolute top-0 right-0 -skew-x-12 h-full w-1/2 bg-[#3b82f6]/5" />
        <div class="relative mx-auto max-w-7xl">
          <div class="showcase-custom-grid items-center gap-12">
            <div class="order-2 col-span-12 min-w-0 max-w-full md:order-1 md:col-span-5">
              <div class="group relative">
                <div
                  class="absolute -inset-4 skew-y-6 bg-[#00f2ff]/10 transition-all group-hover:skew-y-0"
                />
                <img
                  class="relative aspect-square w-full object-cover"
                  src="/images/projects/cursor-ca-orchestrator.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </div>
            <div class="order-1 col-span-12 min-w-0 max-w-full md:order-2 md:col-span-6 md:col-start-7">
              <h2
                class="font-headline mb-12 max-w-full text-[clamp(1.6rem,min(8.2vw+0.3rem,11vw),2.45rem)] font-black uppercase leading-[0.9] tracking-tighter max-md:wrap-break-word md:text-[clamp(2.5rem,7vw+0.5rem,6rem)]"
              >
                Action<wbr>able<br /><span class="text-[#00f2ff]">Logic.</span>
              </h2>
              <div class="space-y-12">
                <div class="relative border-l-4 border-[#00f2ff] pl-8">
                  <span class="absolute -left-2 top-0 h-4 w-4 bg-[#00f2ff]" />
                  <h3 class="mb-4 text-2xl font-bold uppercase">Autonomous Navigation</h3>
                  <p class="font-light leading-relaxed text-white/60">
                    DOM-aware planning, tool use, and recovery paths—aligned with how this codebase prototypes agentic browser flows.
                  </p>
                </div>
                <div class="border-l-4 border-white pl-8 opacity-50 transition-opacity hover:opacity-100">
                  <h3 class="mb-4 text-2xl font-bold uppercase">Recursive Reasoning</h3>
                  <p class="font-light leading-relaxed text-white/60">
                    Self-correcting loops that re-ground on page state instead of assuming first-click success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="showcase-clip-path-asymmetric bg-[#f8f6f3] py-32 text-[#0a0b10]">
        <div class="mx-auto min-w-0 max-w-7xl px-4 md:px-10">
          <div class="mb-24 flex flex-col items-end justify-between md:flex-row">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#3b82f6]">Final Synthesis</span>
              <h2
                class="font-headline mt-4 max-w-full text-[clamp(2.5rem,7vw+0.5rem,6rem)] font-black uppercase leading-[0.9]"
              >
                Precise<br />Delivery.
              </h2>
            </div>
            <div class="max-w-md text-right md:mb-4">
              <p class="font-editorial text-2xl italic">
                "The boundary between the user and the agent becomes invisible. That's the goal."
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div
              class="showcase-rotate-neg-1 group cursor-pointer bg-[#f8f6f3] p-12 text-[#0a0b10] transition-transform hover:rotate-0"
            >
              <div class="mb-6 inline-block text-5xl font-black text-[#00f2ff] transition-transform group-hover:scale-110">
                Repo
              </div>
              <h4 class="mb-4 text-xl font-bold uppercase">Source</h4>
              <p class="text-sm leading-relaxed text-black/40">
                <a class="underline" :href="project.repoUrl" target="_blank" rel="noopener noreferrer">Open GitHub</a>
                for implementation notes and experiments.
              </p>
            </div>
            <div class="showcase-skew-1-soft group cursor-pointer bg-[#007abd] p-12 text-white transition-transform hover:skew-y-0">
              <div class="mb-6 inline-block text-5xl font-black transition-transform group-hover:scale-110">AI</div>
              <h4 class="mb-4 text-xl font-bold uppercase">SDK-shaped</h4>
              <p class="text-sm leading-relaxed text-white/80">
                Tool-calling and streaming patterns pair naturally with Vercel AI SDK style orchestration.
              </p>
            </div>
            <div
              class="showcase-rotate-pos-1 group cursor-pointer bg-[#f8f6f3] p-12 text-[#0a0b10] transition-transform hover:rotate-0"
            >
              <div class="mb-6 inline-block text-5xl font-black text-[#00f2ff] transition-transform group-hover:scale-110">
                Loop
              </div>
              <h4 class="mb-4 text-xl font-bold uppercase">Iteration</h4>
              <p class="text-sm leading-relaxed text-black/40">
                Built to iterate quickly inside Cursor with the same ambient navy UI as the reference concept.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <section class="relative overflow-x-clip px-4 py-24 md:px-10 md:py-40">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div class="showcase-custom-grid">
          <div class="z-20 col-span-12 md:col-span-4">
            <h3 class="font-headline mb-12 text-5xl font-bold uppercase leading-none">
              Built with<br /><span class="text-[#00f2ff]">Intention.</span>
            </h3>
            <p class="mb-12 max-w-xs text-white/50">
              Meetup and cafe photos on the home page are real assets from this site; this case study keeps the collage rhythm.
            </p>
            <NuxtLink
              class="inline-block border-2 border-white px-8 py-4 font-bold uppercase tracking-widest transition-all hover:border-[#00f2ff] hover:bg-[#00f2ff] hover:text-black"
              to="/#projects"
            >
              View Next Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t border-white/10 p-10 opacity-50 transition-opacity hover:opacity-100">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        Bergamota × Cursor Ambassador
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
        <span>Curated with Intelligence</span>
        <span>Design Log</span>
        <span>Stay Autonomous</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
</script>

<style scoped>
@media (max-width: 767px) {
  .agentic-hero-h1.showcase-hero-title {
    font-size: clamp(1.45rem, min(9vw + 0.25rem, 8vh), 2.15rem);
    line-height: 0.9;
  }
}
</style>
