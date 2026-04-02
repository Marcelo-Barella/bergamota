<template>
  <div
    class="showcase-grid-dots scroll-smooth overflow-x-hidden bg-[#0f1115] font-showcase text-[#94a3b8] selection:bg-[#312e81] selection:text-white"
  >
    <nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-white/5 bg-[#0f1115]/90 px-4 py-4 backdrop-blur-md md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink
        to="/"
        class="font-headline flex items-center gap-2 text-xl font-extrabold uppercase italic tracking-tighter text-white md:text-2xl"
      >
        <span class="h-3 w-3 rounded-full bg-[#d97706]" />
        M. BARELLA
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-4 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-10 md:text-[10px]"
      >
        <NuxtLink class="flex items-center gap-1 transition-colors hover:text-white" to="/">
          <span class="material-symbols-outlined text-sm">arrow_back</span> Back to Work
        </NuxtLink>
        <NuxtLink class="transition-colors hover:text-white" to="/#projects">System</NuxtLink>
        <a class="transition-colors hover:text-white" href="mailto:hello@bergamota.dev">Logic</a>
        <a
          class="bg-[#312e81] px-6 py-2 text-white transition-all hover:bg-white hover:text-[#0f1115]"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >Deploy</a>
      </div>
    </nav>

    <header
      class="relative flex min-h-screen flex-col justify-center overflow-visible px-4 pt-24 sm:px-6 md:px-10 md:pt-20"
    >
      <div class="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-[#312e81]/20 blur-[120px]" />
      <div class="absolute bottom-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-[#064e3b]/10 blur-[100px]" />
      <div class="relative z-20 mx-auto w-full min-w-0 max-w-7xl">
        <div class="mb-12 flex items-center gap-6">
          <span class="border border-[#4c0519] bg-[#4c0519]/30 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            Live Orchestration
          </span>
          <div class="h-px flex-grow bg-white/10" />
        </div>
        <div class="grid grid-cols-12 gap-0">
          <div class="relative z-10 col-span-12 min-w-0 lg:col-span-10">
            <h1
              class="showcase-hero-title-fit font-headline mb-8 font-extrabold uppercase tracking-tighter text-white md:mb-10"
            >
              Cursor<br />
              <span class="text-transparent" style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.4)">Orchestrator</span>
            </h1>
            <p
              class="font-editorial mt-12 mb-16 max-w-2xl border-l-4 border-[#312e81] pl-8 text-2xl font-light italic leading-snug md:text-3xl"
            >
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="pointer-events-none absolute right-0 top-1/2 z-[5] hidden h-[819px] w-1/3 -translate-y-1/2 opacity-40 mix-blend-lighten lg:block"
      >
        <div class="relative h-full w-full overflow-hidden border-l border-white/10">
          <img
            class="h-full w-full object-cover grayscale contrast-125"
            :src="project.imageSrc"
            :alt="project.imageAlt"
            loading="eager"
            decoding="async"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-transparent to-transparent" />
        </div>
      </div>
    </header>

    <main class="relative z-10 space-y-24 px-4 py-24 md:space-y-40 md:px-10 md:py-32">
      <section class="mx-auto min-w-0 max-w-7xl">
        <div class="grid grid-cols-12 gap-8">
          <div
            class="relative col-span-12 self-start border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10 md:p-12 lg:col-span-5"
          >
            <div class="absolute -left-4 -top-4 h-12 w-12 border-l-2 border-t-2 border-[#312e81]" />
            <h2 class="font-headline mb-6 text-4xl font-bold uppercase text-white">The Precision Paradigm</h2>
            <p class="mb-8 text-lg leading-relaxed">
              Workflows for coordinating Cursor agents and repeatable delivery paths—this case study mirrors the jeweled slate layout and watch-hero motif from the original concept.
            </p>
            <ul class="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 rounded-full bg-[#064e3b]" /> Sub-millisecond Dispatch
              </li>
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 rounded-full bg-[#064e3b]" /> Agentic Loop Validation
              </li>
              <li class="flex items-center gap-3">
                <span class="h-1.5 w-1.5 rounded-full bg-[#064e3b]" /> State Persistence
              </li>
            </ul>
          </div>
          <div class="col-span-12 pt-12 lg:col-span-6 lg:col-start-7">
            <div class="space-y-16">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#064e3b]">Phase 01 — Analysis</span>
                <h3 class="mt-2 mb-4 text-3xl font-bold text-white">Parsing the Chaos</h3>
                <p class="leading-relaxed text-[#94a3b8]/70">
                  Tasks are decomposed into checkable units with explicit dependencies before agents touch the tree.
                </p>
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#312e81]">Phase 02 — Execution</span>
                <h3 class="mt-2 mb-4 text-3xl font-bold text-white">Synchronous Flow</h3>
                <p class="leading-relaxed text-[#94a3b8]/70">
                  Orchestration keeps architectural rules in view so autonomous edits stay aligned with the product contract.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto min-w-0 max-w-7xl">
        <div class="relative py-12 md:py-20">
          <div class="pointer-events-none absolute left-0 top-0 h-full w-full border-y border-white/5" />
          <div class="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div class="relative order-2 h-[500px] lg:order-1">
              <div class="showcase-rotate-neg-1 absolute left-0 top-0 z-10 h-4/5 w-4/5 border border-white/10 bg-[#0f1115] p-2">
                <img
                  class="h-full w-full object-cover brightness-75 transition-all hover:brightness-100"
                  src="/images/projects/cursor-ca-orchestrator.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                >
              </div>
              <div
                class="showcase-rotate-pos-1 absolute bottom-0 right-0 z-20 h-3/5 w-3/5 border border-white/20 bg-[#064e3b]/20 p-2 backdrop-blur-md"
              >
                <div class="flex h-full w-full items-center justify-center border border-white/5 bg-[#0f1115]">
                  <span class="font-headline text-4xl font-black text-[#064e3b]">LOGIC_04</span>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2
                class="showcase-skew-1 font-headline mb-10 max-w-full text-[clamp(2.5rem,7vw+0.5rem,5.5rem)] font-black uppercase leading-[0.9] text-white"
              >
                Refining<br />the Loop
              </h2>
              <p class="font-editorial mb-8 text-xl italic leading-relaxed">
                "The goal was never to replace the engineer. The goal was to build a nervous system that makes the engineer's vision propagate perfectly across the codebase."
              </p>
              <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#d97706]">
                <span class="material-symbols-outlined">settings_input_component</span>
                <span>Designed by Marcelo Barella — Cursor Ambassador</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto min-w-0 max-w-7xl py-12 md:py-20">
        <div class="grid grid-cols-1 gap-0 border border-white/10 md:grid-cols-4">
          <div class="group border-b border-white/10 p-10 transition-colors hover:bg-[#4c0519]/10 md:border-b-0 md:border-r">
            <div class="mb-4 text-4xl font-black text-[#4c0519]">01</div>
            <h4 class="mb-2 font-bold uppercase text-white">Stability</h4>
            <p class="text-sm text-[#94a3b8]/60">Repeatable agent handoffs with explicit checkpoints in the orchestration graph.</p>
          </div>
          <div
            class="group mt-0 border-b border-white/10 bg-white/5 p-10 transition-colors hover:bg-[#312e81]/20 md:mt-8 md:border-b-0 md:border-r"
          >
            <div class="mb-4 text-4xl font-black text-[#312e81]">02</div>
            <h4 class="mb-2 font-bold uppercase text-white">Scale</h4>
            <p class="text-sm text-[#94a3b8]/60">Parallel workstreams without losing shared context or repo invariants.</p>
          </div>
          <div
            class="group -mt-0 border-b border-white/10 bg-[#064e3b]/5 p-10 transition-colors hover:bg-[#064e3b]/20 md:-mt-8 md:border-b-0 md:border-r"
          >
            <div class="mb-4 text-4xl font-black text-[#064e3b]">03</div>
            <h4 class="mb-2 font-bold uppercase text-white">Integrity</h4>
            <p class="text-sm text-[#94a3b8]/60">Guardrails for destructive operations and human-readable audit trails.</p>
          </div>
          <div class="group mt-0 bg-white/5 p-10 transition-colors hover:bg-[#d97706]/20 md:mt-12">
            <div class="mb-4 text-4xl font-black text-[#d97706]">04</div>
            <h4 class="mb-2 font-bold uppercase text-white">Speed</h4>
            <p class="text-sm text-[#94a3b8]/60">Faster first meaningful commit by templating the agent choreography up front.</p>
          </div>
        </div>
      </section>
    </main>

    <section class="relative overflow-x-clip px-4 py-28 md:px-10 md:py-40">
      <div class="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div class="relative z-10 mx-auto min-w-0 max-w-4xl text-center">
        <h2
          class="font-headline mb-12 max-w-full text-[clamp(2.75rem,8vw+0.5rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white"
        >
          Ready for<br /><span class="text-transparent" style="-webkit-text-stroke: 1px #d97706">The Machine?</span>
        </h2>
        <p class="mx-auto mb-16 max-w-xl text-xl text-[#94a3b8]/80">
          Orchestration for agentic workflows—reach out to align on how repeatable delivery should feel in your stack.
        </p>
        <div class="flex flex-col items-center justify-center gap-12 md:flex-row">
          <a
            class="group relative overflow-hidden bg-white px-16 py-6 text-lg font-bold uppercase tracking-widest text-[#0f1115] transition-transform hover:scale-105"
            href="mailto:hello@bergamota.dev"
          >
            <span class="relative z-10">Initialize Protocol</span>
            <div class="absolute inset-0 translate-y-full bg-[#d97706] transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <div class="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            <NuxtLink class="border-b-2 border-[#d97706] pb-1 text-white" to="/">Portfolio</NuxtLink>
            <a class="transition-colors hover:text-white" :href="project.repoUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t border-white/10 bg-[#0f1115] p-10 md:flex-row">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter text-white">
        Marcelo Barella — <span class="text-[#94a3b8]/40">Cursor Ambassador</span>
      </div>
      <div class="flex gap-12 text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 transition-opacity hover:opacity-100">
        <span>Bergamota.dev</span>
        <span>Porto Alegre / Florianópolis</span>
        <span class="text-[#d97706]">Status: Optimal</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
</script>
