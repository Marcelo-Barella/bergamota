<template>
  <div
    class="scroll-smooth overflow-x-hidden bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white"
  >
    <nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#1b1c1a]/10 bg-[#f8f6f3]/95 px-4 py-4 backdrop-blur-md md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink
        to="/"
        class="font-headline text-xl font-extrabold uppercase italic tracking-tighter md:text-2xl"
      >
        M. Barella
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-4 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-10 md:text-[10px]"
      >
        <NuxtLink class="flex items-center gap-2 transition-colors hover:text-[#d97706]" to="/">
          <span class="material-symbols-outlined text-sm">arrow_back</span> Back to Work
        </NuxtLink>
        <NuxtLink class="transition-colors hover:text-[#d97706]" to="/#projects">Projects</NuxtLink>
        <a
          class="bg-[#1b1c1a] px-4 py-2 text-[#f8f6f3] transition-all hover:bg-[#2563eb]"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >Repository</a>
      </div>
    </nav>

    <header
      class="relative flex min-h-screen flex-col justify-center overflow-visible px-4 pt-28 sm:px-6 md:px-10 md:pt-24"
    >
      <div class="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-[#2563eb]/10 blur-[100px]" />
      <div class="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div class="mb-8 flex flex-wrap items-center gap-4">
          <span class="bg-[#2563eb] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white">
            Most shipped
          </span>
          <span class="text-xs font-bold uppercase tracking-[0.3em] text-[#1b1c1a]/50">Thousands of developers</span>
        </div>
        <h1
          class="showcase-hero-title-fit font-headline relative z-0 mb-10 font-extrabold uppercase tracking-tighter md:mb-14"
        >
          Cursor<br />
          <span class="text-transparent" style="-webkit-text-stroke: 1.5px #1b1c1a">Sync</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 gap-12">
          <div class="relative z-10 col-span-12 md:col-span-5">
            <p class="mb-10 text-2xl font-medium leading-tight md:text-3xl">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-6">
              <div class="showcase-rotate-neg-1 border-2 border-[#1b1c1a] bg-white p-5">
                <span class="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#1b1c1a]/50">Focus</span>
                <div class="font-headline text-lg font-bold text-[#2563eb]">Settings continuity</div>
              </div>
              <div class="showcase-rotate-pos-1 border-2 border-[#d97706] bg-[#d97706]/10 p-5">
                <span class="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#1b1c1a]/50">Audience</span>
                <div class="font-headline text-lg font-bold">Cursor power users</div>
              </div>
            </div>
          </div>
          <div class="relative z-10 col-span-12 md:col-span-7">
            <div class="relative aspect-video w-full overflow-hidden border-2 border-[#1b1c1a] bg-white shadow-[12px_12px_0_0_#1b1c1a]">
              <img
                class="h-full w-full object-cover"
                :src="project.imageSrc"
                :alt="project.imageAlt"
                loading="eager"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="border-y-2 border-[#1b1c1a] bg-white px-4 py-24 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div class="grid grid-cols-1 items-start gap-20 md:grid-cols-2">
          <div class="md:sticky md:top-32">
            <h2
              class="font-headline mb-8 max-w-full text-[clamp(2.25rem,6vw+0.5rem,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter"
            >
              Same editor.<br /><span class="italic text-[#2563eb]">Your</span> rhythm.
            </h2>
            <div class="mb-8 h-2 w-20 bg-[#d97706]" />
            <p class="max-w-md text-xl leading-relaxed text-[#1b1c1a]/75">
              Cursor Sync exists so your environment stops fighting you when you switch machines—fewer surprises, faster return to building.
            </p>
          </div>
          <div class="space-y-10">
            <div class="border-l-8 border-[#2563eb] bg-[#f8f6f3] p-10">
              <h4 class="font-headline mb-4 text-2xl font-bold uppercase">The problem</h4>
              <p class="text-lg leading-relaxed text-[#1b1c1a]/80">
                Drift between installs quietly burns hours: keybindings, extensions, and UI state that never quite match the machine you trust.
              </p>
            </div>
            <div class="border-l-8 border-[#d97706] bg-[#f8f6f3] p-10">
              <h4 class="font-headline mb-4 text-2xl font-bold uppercase">The move</h4>
              <p class="text-lg leading-relaxed text-[#1b1c1a]/80">
                Treat preferences as portable data—sync paths that stay predictable so teams and solo builders can rely on one mental model.
              </p>
            </div>
            <div class="relative border-2 border-dashed border-[#1b1c1a]/20 p-8">
              <span
                class="absolute -top-3 left-4 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b1c1a]/50"
              >Reference</span>
              <img
                class="w-full opacity-90 grayscale transition-all hover:grayscale-0"
                src="/images/projects/cursor-sync.png"
                alt=""
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-24 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <h3 class="font-headline mb-16 text-center text-3xl font-bold uppercase tracking-widest md:text-4xl">
          What stays in sync
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#2563eb]">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#2563eb]">tune</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Editor state</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">Layouts and choices that should feel identical wherever you open the project.</p>
          </div>
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#d97706] md:translate-y-8">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#d97706]">extension</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Extensions &amp; config</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">Less “works on my machine” when the toolchain is the same everywhere.</p>
          </div>
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#1b1c1a]">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#1b1c1a]">groups</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Community scale</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">Built in public; adoption is the signal that the workflow actually lands.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t-2 border-[#1b1c1a] bg-[#1b1c1a] px-4 py-28 text-[#f8f6f3] md:px-10 md:py-36">
      <div class="showcase-custom-grid mx-auto min-w-0 max-w-7xl items-center gap-16">
        <div class="col-span-12 md:col-span-5">
          <span class="text-xs font-bold uppercase tracking-[0.4em] text-[#d97706]">Source of truth</span>
          <h2 class="font-headline mt-6 mb-8 text-[clamp(2rem,5vw+0.5rem,3.5rem)] font-black uppercase leading-[0.95]">
            README &amp;<br />issues win.
          </h2>
          <p class="mb-10 text-xl font-light leading-relaxed text-white/75">
            This page is the portfolio lens; the GitHub repository remains where installation, caveats, and roadmap live.
          </p>
          <div class="flex flex-wrap items-center gap-8">
            <a
              class="border-b-2 border-[#d97706] pb-1 text-sm font-bold uppercase tracking-widest text-[#d97706] transition-colors hover:text-white"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >View on GitHub</a>
            <a
              class="border-b-2 border-white/40 pb-1 text-sm font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              href="mailto:hello@bergamota.dev"
            >Contact</a>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6 md:col-start-7">
          <div class="aspect-video w-full overflow-hidden border-2 border-white/20">
            <img
              class="h-full w-full object-cover brightness-90 contrast-105"
              :src="project.imageSrc"
              :alt="project.imageAlt"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#1b1c1a] bg-[#f8f6f3] p-10 md:flex-row">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        Marcelo Barella — Bergamota
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 transition-opacity hover:opacity-100">
        <span>Cursor Sync</span>
        <NuxtLink class="transition-colors hover:text-[#d97706]" to="/">Home</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
</script>
