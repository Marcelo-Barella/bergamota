<template>
  <div
    class="scroll-smooth overflow-x-hidden bg-[#0a0a0c] font-showcase text-white selection:bg-[#00ff9d] selection:text-black"
  >
    <nav
      class="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-[#0a0a0c]/80 px-10 py-6 backdrop-blur-md"
    >
      <NuxtLink to="/" class="font-headline text-2xl font-extrabold uppercase italic tracking-tighter text-[#00ff9d]">
        M. Barella
      </NuxtLink>
      <div class="hidden items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] md:flex">
        <NuxtLink class="flex items-center gap-2 transition-colors hover:text-[#00ff9d]" to="/">
          <span class="material-symbols-outlined text-sm">arrow_back</span> Back to Work
        </NuxtLink>
        <NuxtLink class="transition-colors hover:text-[#00ff9d]" to="/#projects">Experiments</NuxtLink>
        <a class="text-[#00f0ff] transition-colors hover:text-[#00ff9d]" :href="project.repoUrl" target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>
    </nav>

    <header class="relative flex min-h-screen flex-col justify-center overflow-hidden px-10 pt-32">
      <div
        class="pointer-events-none absolute inset-0 flex select-none flex-wrap content-start gap-4 overflow-hidden font-mono text-[10px] leading-none opacity-10"
      >
        <div class="w-full">import { streamText } from 'ai';</div>
        <div class="w-full pl-8">const { textStream } = await streamText({ model: sdk.model('gpt-4o') });</div>
        <div class="w-full pl-16">for await (const text of textStream) { process.stdout.write(text); }</div>
        <div class="w-full text-[#00ff9d]">01010110 01100101 01110010 01100011 01100101 01101100</div>
      </div>
      <div class="relative z-10 mx-auto w-full max-w-7xl">
        <div class="mb-8 flex items-center gap-4">
          <span class="h-[2px] w-12 bg-[#00ff9d]" />
          <span class="text-xs font-bold uppercase tracking-[0.4em] text-[#00ff9d]">Vercel AI SDK • Prototype 04</span>
        </div>
        <h1 class="font-headline mb-12 text-[10vw] font-black uppercase leading-[0.85] tracking-tighter">
          The AI<br />
          <span
            class="border-b-4 border-[#00ff9d] pb-2 text-transparent"
            style="-webkit-text-stroke: 1px #00ff9d"
          >Playground</span>
        </h1>
        <div class="showcase-custom-grid mt-20 gap-12">
          <div class="col-span-12 self-center md:col-span-5">
            <p class="mb-10 text-3xl font-light leading-tight text-white/90">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-6">
              <div class="showcase-rotate-neg-2-alt border border-white/10 bg-[#141418] p-4">
                <span class="mb-2 block text-[10px] uppercase tracking-widest opacity-50">Capability</span>
                <div class="font-bold text-[#00f0ff]">Streaming Text</div>
              </div>
              <div class="showcase-rotate-pos-2 border border-white/10 bg-[#141418] p-4">
                <span class="mb-2 block text-[10px] uppercase tracking-widest opacity-50">Capability</span>
                <div class="font-bold text-[#bcff00]">Tool Calling</div>
              </div>
            </div>
          </div>
          <div class="relative col-span-12 md:col-span-7">
            <div class="relative aspect-[4/3] w-full">
              <div class="showcase-skew-1-soft absolute inset-0 border-2 border-white/5 bg-[#141418]" />
              <img
                class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
                :src="project.imageSrc"
                :alt="project.imageAlt"
                loading="eager"
                decoding="async"
              >
              <div
                class="absolute right-10 top-10 flex h-32 w-32 -rotate-12 items-center justify-center border border-[#00ff9d]/50 bg-[#00ff9d]/20 backdrop-blur-xl"
              >
                <span class="material-symbols-outlined text-5xl text-[#00ff9d]">deployed_code</span>
              </div>
              <div
                class="absolute -bottom-10 -left-10 flex h-16 w-48 rotate-6 items-center justify-center border border-[#00f0ff]/50 bg-[#00f0ff]/20 px-6 backdrop-blur-lg"
              >
                <span class="font-mono text-xs font-bold text-[#00f0ff]">PROMPT_READY &gt;&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="relative overflow-hidden px-10 py-32">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 items-start gap-24 md:grid-cols-2">
          <div class="top-32 md:sticky">
            <h2 class="font-headline mb-8 text-7xl font-bold uppercase leading-none tracking-tighter">
              Devs are <br /><span class="italic text-[#bcff00]">Drowning</span> <br />in Glue Code.
            </h2>
            <div class="mb-8 h-2 w-20 bg-[#00f0ff]" />
            <p class="max-w-md text-xl text-white/70">
              Streaming and tool-calling experiments on top of the Vercel AI SDK—this project keeps the neon terminal aesthetic from the reference concept while describing real stack choices.
            </p>
          </div>
          <div class="space-y-12">
            <div class="showcase-rotate-pos-2 border-l-4 border-[#00ff9d] bg-[#141418] p-10">
              <h4 class="mb-4 text-2xl font-bold uppercase italic tracking-tight">The Friction</h4>
              <p class="text-lg leading-relaxed opacity-80">
                Wiring models, parsers, and UI feedback used to mean bespoke glue for every app. The prototype pushes toward composable blocks.
              </p>
            </div>
            <div class="showcase-rotate-neg-2-alt border-l-4 border-[#00f0ff] bg-[#141418] p-10">
              <h4 class="mb-4 text-2xl font-bold uppercase italic tracking-tight">The Pivot</h4>
              <p class="text-lg leading-relaxed opacity-80">
                Standardize on SDK primitives—streaming responses, structured tools, and predictable error paths—so features ship instead of stalling in plumbing.
              </p>
            </div>
            <div class="relative py-20">
              <div class="absolute -inset-4 border border-dashed border-white/20" />
              <span
                class="absolute -top-3 left-4 bg-[#0a0a0c] px-4 text-[10px] font-bold uppercase italic tracking-[0.3em] text-[#bcff00]"
              >Architecture View</span>
              <img
                class="w-full border border-white/10 opacity-40 grayscale transition-opacity hover:opacity-100"
                src="/images/projects/ai-sdk-prototype.png"
                alt=""
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-white/5 bg-[#141418]/50 py-32 px-10">
      <div class="mx-auto max-w-7xl">
        <h3 class="font-headline mb-20 text-center text-4xl font-bold uppercase italic tracking-widest">
          The Component Blocks
        </h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="group relative border border-white/10 bg-[#141418] p-8 transition-all hover:border-[#00ff9d]/50">
            <div class="mb-6 text-[#00ff9d]">
              <span class="material-symbols-outlined text-4xl">stream</span>
            </div>
            <h5 class="mb-4 text-2xl font-bold uppercase">Hyper-Streaming</h5>
            <p class="mb-8 leading-relaxed text-white/60">Token streams with low perceived latency for chat and copilot surfaces.</p>
            <div class="bg-black/40 p-3 font-mono text-[10px] text-[#00f0ff]">while (reading) { emit(chunk); }</div>
          </div>
          <div
            class="group relative border border-white/10 bg-[#141418] p-8 transition-all hover:border-[#bcff00]/50 md:translate-y-12"
          >
            <div class="mb-6 text-[#bcff00]">
              <span class="material-symbols-outlined text-4xl">construction</span>
            </div>
            <h5 class="mb-4 text-2xl font-bold uppercase">Auto-Tooling</h5>
            <p class="mb-8 leading-relaxed text-white/60">Function calling with validated inputs and explicit error surfaces.</p>
            <div class="bg-black/40 p-3 font-mono text-[10px] text-[#00f0ff]">tool.validate(input) =&gt; pass;</div>
          </div>
          <div class="group relative border border-white/10 bg-[#141418] p-8 transition-all hover:border-[#00f0ff]/50">
            <div class="mb-6 text-[#00f0ff]">
              <span class="material-symbols-outlined text-4xl">dynamic_form</span>
            </div>
            <h5 class="mb-4 text-2xl font-bold uppercase">UI Injection</h5>
            <p class="mb-8 leading-relaxed text-white/60">Generative UI hooks as the model decides what to render next.</p>
            <div class="bg-black/40 p-3 font-mono text-[10px] text-[#00f0ff]">render: (props) =&gt; Chart</div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative px-10 py-40">
      <div class="showcase-custom-grid mx-auto max-w-7xl items-center gap-16">
        <div class="relative col-span-12 md:col-span-6">
          <div class="absolute -inset-10 rounded-full bg-[#00ff9d]/5 blur-3xl" />
          <img
            class="showcase-skew-1-soft relative z-10 w-full border-2 border-white/20 brightness-75 contrast-125 grayscale"
            src="/images/projects/agentic-browser-ai.png"
            alt=""
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="col-span-12 md:col-span-5 md:col-start-8">
          <span class="text-xs font-bold uppercase tracking-[0.5em] text-[#bcff00]">The Outcome</span>
          <h2 class="font-headline mt-6 mb-8 text-7xl font-bold uppercase leading-[0.9] tracking-tighter">
            Zero To <br /><span class="italic text-[#00ff9d]">Live</span><br />In Minutes.
          </h2>
          <p class="mb-12 text-2xl font-light leading-relaxed text-white/80">
            The README and repo remain the source of truth; this page is the portfolio showcase for the AI SDK prototype entry in projects-data.json.
          </p>
          <div class="flex items-center gap-8">
            <a
              class="border-b-2 border-[#00ff9d] pb-1 text-sm font-bold uppercase tracking-widest text-[#00ff9d] transition-all hover:border-white hover:text-white"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >View Source</a>
            <a
              class="border-b-2 border-[#00f0ff] pb-1 text-sm font-bold uppercase tracking-widest text-[#00f0ff] transition-all hover:border-white hover:text-white"
              href="mailto:hello@bergamota.dev"
            >Contact</a>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden border-t border-white/10 bg-[#0a0a0c] px-10 py-20">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
        <div class="max-w-md">
          <h4 class="font-headline mb-4 text-3xl font-bold uppercase italic">Built for the Cursor Community</h4>
          <p class="text-white/60">
            As a <span class="font-bold text-[#bcff00]">Bergamota Cursor Ambassador</span>, I share tooling patterns so Porto Alegre and Florianópolis builders stay on the leading edge of agentic AI.
          </p>
        </div>
        <div class="flex gap-4">
          <div class="flex h-16 w-16 rotate-6 items-center justify-center border border-white/10 bg-[#141418]">
            <img
              class="h-10 w-10 object-cover opacity-50 grayscale"
              src="/images/cursor-meetup/bergamota-01.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="flex h-16 w-16 -rotate-12 items-center justify-center border border-[#00ff9d] bg-[#00ff9d]">
            <span class="material-symbols-outlined font-bold text-black">bolt</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-between gap-8 border-t border-white/5 bg-[#141418] p-10 md:flex-row">
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter text-[#00ff9d]">
        Marcelo Barella — Bergamota
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 transition-opacity hover:opacity-100">
        <span>Curated with Cursor</span>
        <span>AI SDK Prototype</span>
        <NuxtLink class="transition-colors hover:text-[#00ff9d]" to="/">Home</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio-project'

defineProps<{ project: PortfolioProject }>()
</script>
