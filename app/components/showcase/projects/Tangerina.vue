<template>
  <div class="scroll-smooth overflow-x-hidden bg-[#fffbf2] font-showcase text-[#0a0a0a] selection:bg-[#9ef01a] selection:text-black">
    <nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#0a0a0a]/10 bg-[#fffbf2]/95 px-4 py-4 text-[#0a0a0a] backdrop-blur-sm md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink to="/" class="font-headline text-xl font-black uppercase italic tracking-tighter md:text-2xl">M. Barella</NuxtLink>
      <div class="flex max-w-full flex-wrap items-center justify-end gap-4 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]">
        <NuxtLink class="transition-colors hover:text-[#ff5c00]" to="/">Back to Work</NuxtLink>
        <span class="opacity-30">/</span>
        <NuxtLink class="transition-colors hover:text-[#ff5c00]" to="/#projects">Next Project</NuxtLink>
      </div>
    </nav>

    <header class="relative flex min-h-screen flex-col overflow-visible pt-28 md:pt-32">
      <div class="showcase-grainy-bg pointer-events-none absolute inset-0" />
      <div class="relative z-20 mx-auto w-full min-w-0 max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div class="showcase-rotate-neg-2 mb-8 inline-block bg-[#9ef01a] px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-black">
          Design Experiment 01
        </div>
        <h1
          class="showcase-hero-title-tight font-headline relative z-0 mb-8 font-extrabold uppercase tracking-tighter md:mb-12"
        >
          Tange-<br />rina<span class="italic text-[#ff5c00]">.</span>
        </h1>
        <div class="showcase-custom-grid relative z-10">
          <div class="relative z-10 col-span-12 md:col-span-5">
            <p class="mb-12 border-l-8 border-[#ff5c00] pl-6 text-3xl font-bold uppercase leading-[0.9] md:text-5xl">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span class="border border-[#0a0a0a] px-3 py-1">Identity</span>
              <span class="border border-[#0a0a0a] px-3 py-1">Interaction</span>
              <span class="border border-[#0a0a0a] px-3 py-1">Web Experiments</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute top-1/4 right-0 z-[1] h-[min(70vh,819px)] w-[min(92vw,100%)] max-w-full translate-x-8 sm:translate-x-12 md:h-[1126px] md:w-3/5 md:translate-x-32 showcase-rotate-pos-3"
      >
        <div class="relative h-full w-full overflow-hidden bg-[#ff5c00] shadow-2xl">
          <img
            class="h-full w-full object-cover opacity-90 mix-blend-multiply contrast-125"
            :src="project.imageSrc"
            :alt="project.imageAlt"
            loading="eager"
            decoding="async"
          >
          <div
            class="showcase-outline-text absolute left-4 top-6 font-headline text-[clamp(3.5rem,min(14vw,15vh),9rem)] font-black text-white sm:left-10 sm:top-10"
          >
            CITRUS
          </div>
        </div>
      </div>
    </header>

    <section class="relative px-6 py-40 md:px-10">
      <div class="mx-auto max-w-7xl">
        <div class="showcase-custom-grid gap-y-20">
          <div class="showcase-rotate-neg-2 col-span-12 bg-[#0a0a0a] p-10 text-[#fffbf2] shadow-2xl md:col-span-6 md:p-20">
            <span class="mb-6 block text-xs font-bold uppercase tracking-widest text-[#9ef01a]">// The Boredom Problem</span>
            <h2 class="font-headline mb-8 text-5xl font-black uppercase leading-none">
              Tech lost its soul to white space.
            </h2>
            <p class="text-xl leading-relaxed opacity-80">
              Tangerina is design-minded product surface and workflow experiments—loud type, acidic color, and interfaces that refuse generic SaaS sameness while staying usable.
            </p>
          </div>
          <div class="col-span-12 mt-20 flex flex-col gap-12 md:col-span-5 md:col-start-8">
            <div class="border-t-2 border-[#ff5c00] pt-6">
              <h3 class="mb-4 text-2xl font-bold uppercase">Brutalism meets UX</h3>
              <p class="opacity-70">
                High-contrast layout and motion stress-test how much visual tension still reads as product, not noise.
              </p>
            </div>
            <div class="border-t-2 border-[#9ef01a] pt-6">
              <h3 class="mb-4 text-2xl font-bold uppercase">Zesty Interactions</h3>
              <p class="opacity-70">
                Transitions and offsets echo the editorial layout—skewed frames, overlapping media, zero default radius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="overflow-hidden bg-[#ff5c00] py-20">
      <div
        class="pointer-events-none flex select-none whitespace-nowrap font-headline text-[15rem] font-black uppercase italic leading-none"
      >
        <span class="mr-20 text-white/20">STAY BITTER</span>
        <span class="mr-20 text-black">SWEET RESULTS</span>
        <span class="mr-20 text-white/20">STAY BITTER</span>
        <span class="text-black">SWEET RESULTS</span>
      </div>
    </section>

    <section class="bg-white px-6 py-40 md:px-10">
      <div class="mx-auto max-w-[1400px]">
        <div class="mb-24 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div class="max-w-2xl">
            <h2
              class="font-headline max-w-full text-[clamp(2.5rem,7vw+0.5rem,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Visual <span class="text-[#2b9348]">Chaos</span> Controlled
            </h2>
          </div>
          <div class="max-w-xs text-right font-editorial text-3xl italic">
            Capturing Bergamota energy—Cursor Ambassador work in Porto Alegre and Florianópolis.
          </div>
        </div>
        <div class="grid grid-cols-12 items-center gap-6">
          <div class="relative col-span-12 h-[600px] md:col-span-7">
            <div class="showcase-rotate-neg-2 absolute left-0 top-0 z-10 h-[450px] w-4/5 overflow-hidden bg-gray-200 shadow-xl">
              <img
                class="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                src="/images/cursor-meetup/bergamota-03.jpg"
                alt="Bergamota with the Cursor team at the meetup"
                loading="lazy"
                decoding="async"
              >
              <div class="absolute bottom-4 left-4 bg-[#9ef01a] px-3 py-1 text-[10px] font-bold uppercase">Lab Session 04</div>
            </div>
            <div class="showcase-rotate-pos-3 absolute bottom-0 right-0 z-20 h-[400px] w-2/3 overflow-hidden bg-[#ff5c00] shadow-2xl">
              <img
                class="h-full w-full object-cover saturate-150 contrast-150"
                src="/images/cafe-cursor-florianopolis/bergamota-02.jpg"
                alt="Bergamota smiling during a conversation at Cafe Cursor Florianópolis"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
          <div class="col-span-12 md:col-span-4 md:col-start-9">
            <div class="space-y-8">
              <div class="skew-x-[-10deg] border-4 border-[#0a0a0a] p-8">
                <span class="font-headline text-6xl font-black italic text-[#ff5c00]">0%</span>
                <p class="mt-2 font-bold uppercase tracking-widest">White Space Policy</p>
              </div>
              <p class="text-lg font-medium leading-relaxed">
                Repo and references:
                <a
                  class="text-[#ff5c00] underline decoration-2 underline-offset-4"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#0a0a0a] px-6 py-40 text-[#fffbf2] md:px-10">
      <div class="mx-auto max-w-4xl">
        <h2
          class="font-headline mb-16 max-w-full text-[clamp(2.5rem,8vw+0.5rem,7rem)] font-black uppercase leading-[0.85] tracking-tighter"
        >
          The<br /><span class="text-[#9ef01a]">Outcome.</span>
        </h2>
        <div class="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div class="space-y-6">
            <div class="text-6xl font-black italic text-[#ff5c00] underline decoration-[#9ef01a] decoration-8">Ship</div>
            <h4 class="text-2xl font-bold uppercase">Design-led experiments</h4>
            <p class="leading-relaxed opacity-60">
              This case study mirrors the reference composition: asymmetric hero, grain, marquee band, and stacked photo collage—wired to real meetup photography from the repo.
            </p>
          </div>
          <div class="mt-12 space-y-6 md:mt-24">
            <span class="material-symbols-outlined text-8xl text-[#9ef01a]">bolt</span>
            <h4 class="text-2xl font-bold uppercase">Cursor-native workflow</h4>
            <p class="leading-relaxed opacity-60">
              Content pulls from projects-data.json and /public/images so the page stays truthful to the codebase.
            </p>
          </div>
        </div>
        <div class="mt-32 flex flex-col items-center justify-between gap-12 border-t border-white/20 pt-12 md:flex-row">
          <div class="font-headline text-4xl font-bold uppercase tracking-tighter">Ready for a taste?</div>
          <a
            class="group relative overflow-hidden bg-[#ff5c00] px-12 py-6 text-xl font-black uppercase tracking-widest text-[#0a0a0a] transition-transform hover:-translate-y-2"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">View repository</span>
            <div class="absolute inset-0 translate-x-full bg-[#9ef01a] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#0a0a0a] bg-[#fffbf2] p-10 md:flex-row">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        Marcelo Barella — Tangerina
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
        <NuxtLink class="transition-all hover:text-[#ff5c00] hover:opacity-100" to="/">Back to portfolio</NuxtLink>
        <a class="transition-all hover:text-[#ff5c00] hover:opacity-100" href="mailto:hello@bergamota.dev">Email</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
</script>
