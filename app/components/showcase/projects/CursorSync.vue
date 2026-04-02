<template>
  <div
    ref="projectRoot"
    class="scroll-smooth overflow-x-hidden bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white"
  >
    <nav
      data-gsap-project-nav
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
      data-gsap-project-hero
      class="relative flex min-h-screen flex-col justify-center overflow-visible px-4 pt-28 sm:px-6 md:px-10 md:pt-24"
    >
      <div class="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-[#2563eb]/10 blur-[100px]" />
      <div class="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div class="mb-8 flex flex-wrap items-center gap-4">
          <span
            data-gsap-project-hero-el
            class="bg-[#2563eb] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white"
          >
            VS Code / Cursor extension
          </span>
          <span data-gsap-project-hero-el class="text-xs font-bold uppercase tracking-[0.3em] text-[#1b1c1a]/50">
            Private GitHub Gist
          </span>
        </div>
        <h1
          class="showcase-hero-title-fit font-headline relative z-0 mb-10 font-extrabold uppercase tracking-tighter md:mb-14"
        >
          <span data-gsap-project-hero-el class="block">Cursor</span>
          <span
            data-gsap-project-hero-el
            class="block text-transparent"
            style="-webkit-text-stroke: 1.5px #1b1c1a"
          >Sync</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 gap-12">
          <div class="relative z-10 col-span-12 md:col-span-5">
            <p data-gsap-project-hero-el class="mb-10 text-2xl font-medium leading-tight md:text-3xl">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-6">
              <div data-gsap-project-hero-el class="showcase-rotate-neg-1 border-2 border-[#1b1c1a] bg-white p-5">
                <span class="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#1b1c1a]/50">Backed by</span>
                <div class="font-headline text-lg font-bold text-[#2563eb]">Gist API + SecretStorage</div>
              </div>
              <div data-gsap-project-hero-el class="showcase-rotate-pos-1 border-2 border-[#d97706] bg-[#d97706]/10 p-5">
                <span class="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#1b1c1a]/50">Build</span>
                <div class="font-headline text-lg font-bold">esbuild · vitest</div>
              </div>
            </div>
          </div>
          <div data-gsap-project-hero-visual class="relative z-10 col-span-12 md:col-span-7">
            <div class="relative aspect-video w-full overflow-hidden border-2 border-[#1b1c1a] bg-white shadow-[12px_12px_0_0_#1b1c1a]">
              <img
                data-gsap-project-hero-visual-img
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

    <section data-gsap-project-section class="border-y-2 border-[#1b1c1a] bg-white px-4 py-24 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-16 border-l-8 border-[#2563eb] pl-6 md:pl-8"
        >
          <h2
            class="font-headline max-w-full text-[clamp(2.25rem,6vw+0.5rem,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter"
          >
            Same editor.<br />Portable state.
          </h2>
          <p class="mt-6 max-w-2xl text-lg text-[#1b1c1a]/70">
            README states the goal plainly: sync user-level Cursor settings and selected <code class="text-[#1b1c1a]">~/.cursor</code> paths to a private GitHub Gist, with push/pull, optional scheduling, and export/import flows.
          </p>
        </div>
        <div class="grid grid-cols-1 items-start gap-20 md:grid-cols-2">
          <div class="md:sticky md:top-32">
            <div class="mb-8 h-2 w-20 bg-[#d97706]" />
            <h3 class="font-headline mb-4 text-xl font-bold uppercase">What actually syncs</h3>
            <p class="max-w-md text-lg leading-relaxed text-[#1b1c1a]/75">
              From the README path matrix: <code class="text-sm">settings.json</code>, <code class="text-sm">keybindings.json</code>, <code class="text-sm">snippets/**</code>, generated <code class="text-sm">extensions.json</code> on push, plus <code class="text-sm">skills/**</code>, <code class="text-sm">commands/**/*.md</code>, and <code class="text-sm">rules/*.mdc</code> under <code class="text-sm">~/.cursor</code>—with a long always-excluded list for caches and secrets.
            </p>
          </div>
          <div class="space-y-10">
            <div class="border-l-8 border-[#2563eb] bg-[#f8f6f3] p-10">
              <h4 class="font-headline mb-4 text-2xl font-bold uppercase">The problem</h4>
              <p class="text-lg leading-relaxed text-[#1b1c1a]/80">
                Multiple machines mean divergent keymaps, rules, and extension sets. The extension treats that drift as something you push to a gist and pull back with optional safe-mode confirmation before overwrites.
              </p>
            </div>
            <div class="border-l-8 border-[#d97706] bg-[#f8f6f3] p-10">
              <h4 class="font-headline mb-4 text-2xl font-bold uppercase">How it works</h4>
              <p class="text-lg leading-relaxed text-[#1b1c1a]/80">
                Token in VS Code SecretStorage (README &quot;Security&quot;). Commands such as <strong>Sync Now</strong>, <strong>Push Now</strong>, and <strong>Pull Now</strong> are registered in <code class="text-sm">package.json</code> under <code class="text-sm">contributes.commands</code>. Sidebar webview and activity-bar container IDs match that manifest.
              </p>
            </div>
            <div class="relative border-2 border-dashed border-[#1b1c1a]/20 p-8">
              <span
                class="absolute -top-3 left-4 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b1c1a]/50"
              >Preview</span>
              <img
                data-gsap-project-media-parallax
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

    <section data-gsap-project-section class="px-4 py-24 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-12 text-center"
        >
          <h3 class="font-headline text-3xl font-bold uppercase tracking-widest md:text-4xl">
            Standout surfaces
          </h3>
          <p class="mx-auto mt-4 max-w-2xl text-[#1b1c1a]/65">
            Described in README: sidebar status card, Sync Now, actions grid, history (up to 50 entries), and transcript tooling with opt-in settings in <code class="text-sm">package.json</code> (<code class="text-sm">cursorSync.transcripts.enabled</code>, size limits).
          </p>
        </div>
        <div data-gsap-project-stagger class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#2563eb]">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#2563eb]">tune</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Conflicts &amp; recovery</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">README documents <strong>Resolve Conflicts</strong> and automatic rollback from backup snapshots on failed pull/import, keeping the last three snapshots.</p>
          </div>
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#d97706] md:translate-y-8">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#d97706]">extension</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Extensions</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">Push generates extension list; pull can auto-install missing entries when enabled—behavior spelled out in README &quot;Extension List Sync&quot; and defaults in <code class="text-sm">package.json</code>.</p>
          </div>
          <div class="border-2 border-[#1b1c1a] bg-white p-8 transition-shadow hover:shadow-[8px_8px_0_0_#1b1c1a]">
            <span class="material-symbols-outlined mb-4 text-4xl text-[#1b1c1a]">history</span>
            <h5 class="font-headline mb-3 text-xl font-bold uppercase">Transcripts</h5>
            <p class="leading-relaxed text-[#1b1c1a]/70">Optional export/import of agent transcripts with manifest schema and verification notes pointing to <code class="text-sm">docs/transcript-simulation-verification.md</code> in the repo.</p>
          </div>
        </div>
      </div>
    </section>

    <section data-gsap-project-section class="border-t-2 border-[#1b1c1a] bg-[#1b1c1a] px-4 py-28 text-[#f8f6f3] md:px-10 md:py-36">
      <div data-gsap-project-cta class="showcase-custom-grid mx-auto min-w-0 max-w-7xl items-center gap-16">
        <div class="col-span-12 md:col-span-5">
          <span class="text-xs font-bold uppercase tracking-[0.4em] text-[#d97706]">Source of truth</span>
          <h2 class="font-headline mt-6 mb-8 text-[clamp(2rem,5vw+0.5rem,3.5rem)] font-black uppercase leading-[0.95]">
            README &amp;<br />marketplace listing.
          </h2>
          <p class="mb-10 text-xl font-light leading-relaxed text-white/75">
            Install steps, command palette names, and security notes are maintained on GitHub. Anonymous usage metrics are mentioned in README; no sensitive fields are claimed to be transmitted.
          </p>
          <div class="flex flex-wrap items-center gap-8">
            <a
              data-gsap-magnetic
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
              data-gsap-project-media-parallax
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
const projectRoot = ref<HTMLElement | null>(null)
useShowcaseProjectGsap(projectRoot)
</script>
