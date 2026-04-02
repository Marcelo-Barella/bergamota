<template>
  <div
    ref="projectRoot"
    class="scroll-smooth overflow-x-hidden bg-[#fffbf2] font-showcase text-[#0a0a0a] selection:bg-[#9ef01a] selection:text-black"
  >
    <nav
      data-gsap-project-nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#0a0a0a]/10 bg-[#fffbf2]/95 px-4 py-4 text-[#0a0a0a] backdrop-blur-sm md:flex-nowrap md:px-10 md:py-6"
    >
      <NuxtLink to="/" class="font-headline text-xl font-black uppercase italic tracking-tighter md:text-2xl">M. Barella</NuxtLink>
      <div class="flex max-w-full flex-wrap items-center justify-end gap-4 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]">
        <NuxtLink class="transition-colors hover:text-[#ff5c00]" to="/">Back to Work</NuxtLink>
        <span class="opacity-30">/</span>
        <a
          class="transition-colors hover:text-[#ff5c00]"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
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
          Discord bot · Python 3.8+
        </div>
        <h1
          class="showcase-hero-title-tight font-headline relative z-0 mb-8 font-extrabold uppercase tracking-tighter md:mb-12"
        >
          <span data-gsap-project-hero-el class="block">Tange-</span>
          <span data-gsap-project-hero-el class="block">rina<span class="italic text-[#ff5c00]">.</span></span>
        </h1>
        <div class="showcase-custom-grid relative z-10">
          <div class="relative z-10 col-span-12 md:col-span-6">
            <p
              data-gsap-project-hero-el
              class="mb-8 border-l-8 border-[#ff5c00] pl-6 text-2xl font-bold uppercase leading-[0.95] md:text-4xl"
            >
              {{ project.description }}
            </p>
            <div data-gsap-project-hero-el class="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest">
              <span class="border border-[#0a0a0a] px-3 py-1">app.py</span>
              <span class="border border-[#0a0a0a] px-3 py-1">flask_routes.py</span>
              <span class="border border-[#0a0a0a] px-3 py-1">features/</span>
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
            :alt="project.imageAlt"
            loading="eager"
            decoding="async"
          >
          <div
            class="showcase-outline-text absolute left-4 top-6 font-headline text-[clamp(3.5rem,min(14vw,15vh),9rem)] font-black text-white sm:left-10 sm:top-10"
          >
            BOT
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
            Servers needed more than commands
          </h2>
          <p class="mt-6 max-w-2xl text-lg opacity-80">
            README positions Tangerina as an intelligent Discord bot with multiple AI backends, function calling for music and voice, and optional long-term memory (ChromaDB) behind environment flags—not a generic command-only bot.
          </p>
        </div>
        <div class="showcase-custom-grid gap-y-16">
          <div class="showcase-rotate-neg-2 col-span-12 bg-[#0a0a0a] p-10 text-[#fffbf2] shadow-2xl md:col-span-6 md:p-16">
            <span class="mb-6 block text-xs font-bold uppercase tracking-widest text-[#9ef01a]">Challenge</span>
            <h3 class="font-headline mb-6 text-3xl font-black uppercase md:text-4xl">
              One surface, many capabilities
            </h3>
            <p class="text-lg leading-relaxed opacity-85">
              Users expect music, voice, and conversational help in one member. The repository maps that to a chatbot layer under <code class="text-white/80">chatbot/</code> (Zhipu, OpenAI, Gemini integrations per README) and feature modules under <code class="text-white/80">features/music</code>, <code class="text-white/80">features/tts</code>, and <code class="text-white/80">features/voice</code>.
            </p>
          </div>
          <div class="col-span-12 flex flex-col gap-10 md:col-span-5 md:col-start-8">
            <div class="border-t-2 border-[#ff5c00] pt-6">
              <h3 class="mb-4 text-xl font-bold uppercase">HTTP control plane</h3>
              <p class="opacity-75">
                README documents REST endpoints on port 5000—<code class="text-sm">GET /health</code>, voice channel helpers, music queue operations, TTS routes, and <code class="text-sm">POST /chatbot/message</code>—implemented alongside the Discord client (see <code class="text-sm">flask_routes.py</code> in the repo layout).
              </p>
            </div>
            <div class="border-t-2 border-[#9ef01a] pt-6">
              <h3 class="mb-4 text-xl font-bold uppercase">Tooling the model sees</h3>
              <p class="opacity-75">
                README lists sixteen named tools (channels, voice join/leave, music queue, Spotify play, TTS speak, web search, etc.). The model chooses tools from context; README notes chatbot text is not auto-sent to Discord except via <code class="text-sm">SEND_Mensagem</code> or external workflows such as n8n when configured.
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
        <span class="mr-16 text-white/25">VOICE</span>
        <span class="mr-16 text-black">MUSIC</span>
        <span class="mr-16 text-white/25">MCP-LIKE TOOLS</span>
        <span class="text-black">DISCORD</span>
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
              Proof in the <span class="text-[#2b9348]">repo</span>
            </h2>
            <p class="mt-6 text-lg text-black/65">
              CI runs tests in Docker; README requires at least 70% line coverage for <code class="text-sm">chatbot</code>, <code class="text-sm">features</code>, and <code class="text-sm">flask_routes</code>, enforced in GitHub Actions and local <code class="text-sm">./test.sh</code>.
            </p>
          </div>
          <div class="max-w-sm font-editorial text-2xl italic text-black/70">
            Deploy: <code class="font-mono text-sm not-italic">deploy/docker-compose.yaml</code> with optional Piper TTS and n8n profile per README.
          </div>
        </div>
        <div data-gsap-project-stagger class="grid grid-cols-12 gap-6">
          <div class="col-span-12 border-4 border-[#0a0a0a] bg-[#fffbf2] p-8 md:col-span-5">
            <span class="font-headline text-5xl font-black italic text-[#ff5c00]">API</span>
            <p class="mt-2 font-bold uppercase tracking-widest text-sm">Tool surface in README</p>
            <p class="mt-4 text-sm leading-relaxed text-black/60">
              README section &quot;Ferramentas Disponíveis&quot; names discrete tools (channels, voice, queue, Spotify, TTS, web search, etc.); the model selects them via function calling.
            </p>
          </div>
          <div class="col-span-12 md:col-span-6 md:col-start-7">
            <div class="space-y-6 text-lg leading-relaxed">
              <p>
                Persona file: <code class="text-sm">chatbot/tangerina_persona.txt</code> (Portuguese copy) with Docker volume notes in README.
              </p>
              <p>
                Optional memory: ChromaDB paths and embedding providers are environment-driven; defaults and limits are listed in the README environment tables.
              </p>
              <p>
                <a
                  class="text-[#ff5c00] underline decoration-2 underline-offset-4 font-bold uppercase text-sm tracking-widest"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >Open repository</a>
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
          Outcome
        </h2>
        <p class="mb-12 text-lg leading-relaxed opacity-70">
          A runnable Discord + Flask stack you can extend: README covers voice keyword listening (&quot;tangerina&quot; wake flow), n8n webhook payloads, and troubleshooting (intents, PyNaCl for voice). Anything not in README is not verified here.
        </p>
        <div data-gsap-project-cta class="flex flex-col items-center justify-between gap-10 border-t border-white/20 pt-12 md:flex-row">
          <div class="font-headline text-3xl font-bold uppercase tracking-tighter text-center md:text-left">
            Run <code class="text-[#9ef01a]">python app.py</code>
          </div>
          <a
            data-gsap-magnetic
            class="group relative overflow-hidden bg-[#ff5c00] px-12 py-6 text-lg font-black uppercase tracking-widest text-[#0a0a0a]"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">Clone on GitHub</span>
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
const projectRoot = ref<HTMLElement | null>(null)
useShowcaseProjectGsap(projectRoot)
</script>
