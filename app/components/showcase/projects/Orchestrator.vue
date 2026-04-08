<template>
  <div
    ref="projectRoot"
    class="showcase-grid-dots scroll-smooth overflow-x-hidden bg-[#0f1115] font-showcase text-[#94a3b8] selection:bg-[#312e81] selection:text-white"
  >
    <nav
      data-gsap-project-nav
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
        <NuxtLink class="transition-colors hover:text-white" to="/#projects">Experiments</NuxtLink>
        <a
          class="bg-[#312e81] px-6 py-2 text-white transition-all hover:bg-white hover:text-[#0f1115]"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
        <LanguageSwitcher variant="showcase" />
      </div>
    </nav>

    <header
      data-gsap-project-hero
      class="relative flex min-h-screen flex-col justify-center overflow-visible px-4 pt-24 sm:px-6 md:px-10 md:pt-20"
    >
      <div class="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-[#312e81]/20 blur-[120px]" />
      <div class="absolute bottom-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-[#064e3b]/10 blur-[100px]" />
      <div class="relative z-20 mx-auto w-full min-w-0 max-w-7xl">
        <div class="mb-12 flex items-center gap-6">
          <span
            data-gsap-project-hero-el
            class="border border-[#4c0519] bg-[#4c0519]/30 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-400"
          >
            Multi-repo agent runs
          </span>
          <div class="h-px flex-grow bg-white/10" />
        </div>
        <div class="grid grid-cols-12 gap-0">
          <div class="relative z-10 col-span-12 min-w-0 lg:col-span-10">
            <h1
              class="showcase-hero-title-fit font-headline mb-8 font-extrabold uppercase tracking-tighter text-white md:mb-10"
            >
              <span data-gsap-project-hero-el class="block">Cursor</span>
              <span
                data-gsap-project-hero-el
                class="block text-transparent"
                style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.4)"
              >Orchestrator</span>
            </h1>
            <p
              data-gsap-project-hero-el
              class="font-editorial mt-12 mb-6 max-w-2xl border-l-4 border-[#312e81] pl-8 text-2xl font-light italic leading-snug md:text-3xl"
            >
              Describe the outcome once. The tool prepares a shared space on GitHub, opens a dedicated branch for the run, and coordinates an orchestrator with worker agents across the repos you name—so many hands stay on one plan instead of inventing twenty versions of it.
            </p>
            <p data-gsap-project-hero-el class="max-w-xl text-sm leading-relaxed text-white/50">
              Shipped as a fast local CLI with a config-first workflow: interactive sessions, YAML runs, and the usual guardrails for tokens and environments.
            </p>
          </div>
        </div>
      </div>
      <div
        data-gsap-project-hero-visual
        class="pointer-events-none absolute right-0 top-1/2 z-[5] hidden h-[819px] w-1/3 -translate-y-1/2 opacity-40 mix-blend-lighten lg:block"
      >
        <div class="relative h-full w-full overflow-hidden border-l border-white/10">
          <img
            data-gsap-project-hero-visual-img
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
      <section data-gsap-project-section class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-12 border-l-8 border-[#d97706] pl-6 md:pl-8"
        >
          <h2 class="font-headline text-4xl font-black uppercase text-white md:text-5xl">
            Why it exists
          </h2>
          <p class="mt-4 max-w-2xl text-lg text-white/60">
            Spinning up agents on different repositories is thrilling for five minutes and painful by day three without a single place that holds intent, assignments, and progress. This project treats GitHub as that shared surface so everyone reads the same run, not their own Slack thread.
          </p>
        </div>
        <div class="grid grid-cols-12 gap-8">
          <div
            class="relative col-span-12 self-start border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10 md:p-12 lg:col-span-5"
          >
            <div class="absolute -left-4 -top-4 h-12 w-12 border-l-2 border-t-2 border-[#312e81]" />
            <h3 class="font-headline mb-6 text-2xl font-bold uppercase text-white">What you get</h3>
            <p class="mb-6 text-lg leading-relaxed">
              A CLI you can drive from an interactive session or from a checked-in config file, plus live commands to watch status, tail logs, and stop a run when the plan changes mid-flight.
            </p>
            <ul class="space-y-3 text-sm text-white/55">
              <li>Sessions remember where you left off so iterative runs feel continuous, not a fresh guessing game each time.</li>
              <li>A config doctor tells you early if tokens or precedence are wrong—before you burn an hour on a silent failure.</li>
              <li>Shell autocomplete so frequent operators stay in flow instead of re-reading help text.</li>
            </ul>
          </div>
          <div class="col-span-12 pt-4 lg:col-span-6 lg:col-start-7">
            <div class="space-y-12">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#064e3b]">Architecture</span>
                <h3 class="mt-2 mb-4 text-2xl font-bold text-white">Three moving parts</h3>
                <p class="leading-relaxed text-[#94a3b8]/80">
                  Your machine runs the CLI; a bootstrap repository carries the rules and runtime your cloud agents expect; workers land on each target repo while the orchestrator keeps the graph honest. Every run gets its own branch that holds configuration, state, and outputs in small files so collaboration stays orderly instead of a free-for-all.
                </p>
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#312e81]">Guardrails</span>
                <h3 class="mt-2 mb-4 text-2xl font-bold text-white">Honest boundaries</h3>
                <p class="leading-relaxed text-[#94a3b8]/80">
                  Task counts, polling cadence, and per-task output caps keep cloud runs predictable. Workers stay focused on their repo; the orchestrator is the only coordinator, which avoids whisper networks and duplicate writes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-gsap-project-section class="mx-auto min-w-0 max-w-7xl">
        <div class="relative py-12 md:py-20">
          <div class="pointer-events-none absolute left-0 top-0 h-full w-full border-y border-white/5" />
          <div class="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div class="relative order-2 h-[500px] lg:order-1">
              <div class="showcase-rotate-neg-1 absolute left-0 top-0 z-10 h-4/5 w-4/5 border border-white/10 bg-[#0f1115] p-2">
                <img
                  data-gsap-project-media-parallax
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
                <div class="flex h-full w-full flex-col items-center justify-center border border-white/5 bg-[#0f1115] p-4 text-center">
                  <span class="font-headline text-2xl font-black text-[#064e3b] md:text-3xl">YAML + REPL</span>
                  <span class="mt-2 text-[10px] uppercase tracking-widest text-white/40">Same CLI, two entry paths</span>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <div
                data-gsap-section-head
                class="mb-10"
              >
                <h2
                  class="showcase-skew-1 font-headline max-w-full text-[clamp(2.5rem,7vw+0.5rem,5.5rem)] font-black uppercase leading-[0.9] text-white"
                >
                  Single prompt,<br />many repos
                </h2>
              </div>
              <p class="font-editorial mb-8 text-xl italic leading-relaxed text-white/70">
                In single-prompt mode you state the north star; the planner turns it into tasks and maps each task to a repo alias from your config—so you are not copy-pasting ten near-identical worker briefs.
              </p>
              <p class="text-sm leading-relaxed text-[#94a3b8]/70">
                Releases are automated from main when the version moves—ideal for teams that want the CLI to track the product without a manual publish ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-gsap-project-section class="mx-auto min-w-0 max-w-7xl py-12 md:py-20">
        <div
          data-gsap-section-head
          class="mb-10"
        >
          <h2 class="font-headline text-3xl font-black uppercase text-white md:text-4xl">
            Go deeper on GitHub
          </h2>
          <p class="mt-4 max-w-2xl text-white/55">
            Error semantics, recovery paths, and completion modes are documented alongside the changelog—this page sells the idea; the repository is where operators live.
          </p>
        </div>
        <div data-gsap-project-stagger class="grid grid-cols-1 gap-0 border border-white/10 md:grid-cols-2">
          <div class="group border-b border-white/10 p-10 transition-colors hover:bg-[#4c0519]/10 md:border-b-0 md:border-r">
            <div class="mb-4 text-3xl font-black text-[#4c0519]">01</div>
            <h4 class="mb-2 font-bold uppercase text-white">Evidence</h4>
            <p class="text-sm text-[#94a3b8]/60">Every command, environment variable, and architecture diagram ships in the open so you can verify before you bet a production run on it.</p>
          </div>
          <div class="group bg-white/5 p-10 transition-colors hover:bg-[#312e81]/20">
            <div class="mb-4 text-3xl font-black text-[#312e81]">02</div>
            <h4 class="mb-2 font-bold uppercase text-white">Next step</h4>
            <p class="text-sm text-[#94a3b8]/60">
              Clone, copy the example environment, run the bootstrap script from the docs, then let the config doctor validate tokens before your first real orchestration.
            </p>
          </div>
        </div>
      </section>
    </main>

    <section class="relative overflow-x-clip px-4 py-28 md:px-10 md:py-40">
      <div class="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div data-gsap-project-cta class="relative z-10 mx-auto min-w-0 max-w-4xl text-center">
        <h2
          class="font-headline mb-12 max-w-full text-[clamp(2.75rem,8vw+0.5rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white"
        >
          Open the<br /><span class="text-transparent" style="-webkit-text-stroke: 1px #d97706">source</span>
        </h2>
        <p class="mx-auto mb-16 max-w-xl text-xl text-[#94a3b8]/80">
          Credentials, install order, and the exact limits of a run are all spelled out beside the code—no hidden behavior behind a landing page.
        </p>
        <div class="flex flex-col items-center justify-center gap-12 md:flex-row">
          <a
            data-gsap-magnetic
            class="group relative overflow-hidden bg-white px-16 py-6 text-lg font-bold uppercase tracking-widest text-[#0f1115]"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">View on GitHub</span>
            <div class="absolute inset-0 translate-y-full bg-[#d97706] transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <div class="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            <NuxtLink class="border-b-2 border-[#d97706] pb-1 text-white" to="/">Portfolio</NuxtLink>
            <a
              class="transition-colors hover:text-white"
              :href="mailtoHref"
            >Email</a>
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
        <span>Cursor Orchestrator</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
const { mailtoHref } = useContact()
const projectRoot = ref<HTMLElement | null>(null)
useShowcaseProjectGsap(projectRoot)
</script>
