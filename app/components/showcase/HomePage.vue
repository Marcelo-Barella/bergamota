<template>
  <div class="scroll-smooth bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white">
    <nav
      class="fixed top-0 z-50 flex w-full items-center justify-between bg-[#f8f6f3]/90 px-10 py-6 mix-blend-difference invert backdrop-blur-sm"
      aria-label="Primary"
    >
      <NuxtLink to="/" class="font-headline text-2xl font-extrabold uppercase italic tracking-tighter">
        M. Barella
      </NuxtLink>
      <div class="hidden items-center gap-8 font-bold text-[10px] uppercase tracking-[0.2em] md:flex">
        <a class="transition-colors hover:text-[#d97706]" href="#hero">Manifesto</a>
        <a class="transition-colors hover:text-[#d97706]" href="#projects">Experiments</a>
        <a class="transition-colors hover:text-[#d97706]" href="#meetup-photos">Chaos</a>
        <a class="text-[#d97706]" href="#contact">Talk?</a>
      </div>
    </nav>

    <header
      id="hero"
      class="relative flex min-h-screen flex-col justify-center overflow-hidden border-b-2 border-[#1b1c1a] px-10 pt-20"
    >
      <div class="relative z-10 mx-auto w-full max-w-7xl">
        <div class="showcase-rotate-neg-1 mb-12 inline-block bg-[#d97706] px-4 py-2 text-sm font-bold uppercase tracking-[0.3em] text-white">
          Bergamota Cursor Ambassador
        </div>
        <h1 class="font-headline mb-16 text-[12vw] font-extrabold uppercase leading-[0.8] tracking-tighter">
          Breaking<br />
          <span
            class="border-t-2 border-[#1b1c1a] pt-4 text-transparent"
            style="-webkit-text-stroke: 1.5px #1b1c1a"
          >The Grid</span>
        </h1>
        <div class="showcase-custom-grid gap-8">
          <div class="col-span-12 md:col-span-5 md:ml-20">
            <p class="mb-8 text-2xl font-bold leading-tight">
              Building practical AI systems and creating agents that turn ideas into reliable workflows.
            </p>
            <div class="flex gap-4">
              <a
                href="#projects"
                class="showcase-rotate-pos-1 bg-[#1b1c1a] px-10 py-5 font-bold uppercase tracking-widest text-[#f8f6f3] transition-all hover:bg-[#d97706]"
              >
                Witness the work
              </a>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 md:col-start-7 relative mt-12 md:mt-0">
            <div class="showcase-rotate-pos-1 relative aspect-[4/3] w-full bg-[#1b1c1a]">
              <img
                class="h-full w-full object-cover opacity-80 mix-blend-multiply contrast-125 grayscale"
                src="/images/cursor-meetup/bergamota-01.jpg"
                alt="Bergamota in a group conversation at the Cursor meetup"
                loading="eager"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="pointer-events-none absolute -bottom-20 -left-20 select-none font-headline text-[40rem] font-black text-[#1b1c1a]/5"
        aria-hidden="true"
      >
        M
      </div>
    </header>

    <section id="meetup-photos" class="relative bg-white px-10 py-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-16 flex flex-col items-baseline justify-between border-l-8 border-[#d97706] pl-8 md:flex-row">
          <h2 class="font-headline text-5xl font-black uppercase tracking-tighter md:text-8xl">
            Cursor<br />Meetup
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            Selected frames where Bergamota appears in the 2026-03-17 Cursor meetup.
          </p>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          <figure
            v-for="photo in meetupPhotos"
            :key="photo.id"
            class="overflow-hidden bg-[#1b1c1a]/5"
          >
            <img
              class="aspect-[4/3] w-full object-cover"
              :src="photo.src"
              :alt="photo.alt"
              loading="lazy"
              decoding="async"
            >
          </figure>
        </div>
      </div>
    </section>

    <section id="cafe-cursor-florianopolis" class="relative bg-[#f5f3f0] px-10 py-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-16 flex flex-col items-baseline justify-between border-l-8 border-[#1b1c1a] pl-8 md:flex-row">
          <h2 class="font-headline text-5xl font-black uppercase tracking-tighter md:text-8xl">
            Cafe Cursor<br />Florianópolis
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            Selected frames where Bergamota appears at Cafe Cursor Florianópolis.
          </p>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          <figure
            v-for="photo in cafeCursorFlorianopolisPhotos"
            :key="photo.id"
            class="overflow-hidden bg-[#1b1c1a]/5"
          >
            <img
              class="aspect-[4/3] w-full object-cover"
              :src="photo.src"
              :alt="photo.alt"
              loading="lazy"
              decoding="async"
            >
          </figure>
        </div>
      </div>
    </section>

    <section id="projects" class="relative bg-white px-10 py-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-32 flex flex-col items-baseline justify-between border-l-8 border-[#d97706] pl-8 md:flex-row">
          <h2 class="font-headline text-5xl font-black uppercase tracking-tighter md:text-8xl">
            Where My<br />Brain Goes
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-3xl italic md:mt-0">
            The projects that kept me awake and pushed the needle forward.
          </p>
        </div>
        <div class="space-y-48">
          <div class="showcase-custom-grid items-center">
            <div class="group relative col-span-12 md:col-span-7">
              <div
                class="absolute inset-0 -translate-x-4 translate-y-4 bg-[#d97706]/10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
              />
              <NuxtLink :to="projectPath('tangerina')" class="relative block">
                <img
                  class="aspect-video w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  src="/images/projects/tangerina.svg"
                  alt="Tangerina project preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-rotate-pos-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">01 / BRAND EXPERIMENT</span>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">Tangerina</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy.tangerina }}
              </p>
              <NuxtLink
                :to="projectPath('tangerina')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                Open case study
              </NuxtLink>
            </div>
          </div>

          <div class="showcase-custom-grid items-center">
            <div class="showcase-rotate-neg-1 order-2 col-span-12 mt-12 md:order-1 md:col-span-4 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">02 / AI ORCHESTRATION</span>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">Agentic AI</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy['agentic-browser-ai'] }}
              </p>
              <NuxtLink
                :to="projectPath('agentic-browser-ai')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                Open case study
              </NuxtLink>
            </div>
            <div class="group relative order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6">
              <div
                class="absolute inset-0 translate-x-4 -translate-y-4 bg-[#1b1c1a]/5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
              />
              <NuxtLink :to="projectPath('agentic-browser-ai')" class="relative block">
                <img
                  class="aspect-video w-full object-cover"
                  src="/images/projects/agentic-browser-ai.png"
                  alt="Agentic browser AI project preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
          </div>

          <div class="showcase-custom-grid items-center">
            <div class="relative col-span-12 md:col-span-7">
              <div class="absolute -top-10 -left-10 -z-10 h-40 w-40 border-4 border-[#1b1c1a]" />
              <NuxtLink :to="projectPath('ai-sdk-prototype')" class="block">
                <img
                  class="aspect-video w-full object-cover brightness-50 sepia-[0.3]"
                  src="/images/projects/ai-sdk-prototype.png"
                  alt="AI SDK prototype preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-skew-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">03 / DEV TOOLING</span>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">AI SDK Proto</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy['ai-sdk-prototype'] }}
              </p>
              <NuxtLink
                :to="projectPath('ai-sdk-prototype')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                Open case study
              </NuxtLink>
            </div>
          </div>

          <div class="showcase-custom-grid items-center">
            <div
              class="showcase-rotate-pos-1 order-2 col-span-12 mt-12 bg-[#1b1c1a] p-12 text-white md:order-1 md:col-span-5 md:mt-0"
            >
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">04 / THE MASTERMIND</span>
              <h3 class="font-headline mt-4 mb-6 text-5xl font-bold italic">Cursor Orchestrator</h3>
              <p class="text-lg leading-relaxed opacity-80">
                {{ projectCopy['cursor-ca-orchestrator'] }}
              </p>
              <NuxtLink
                :to="projectPath('cursor-ca-orchestrator')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                Open case study
              </NuxtLink>
            </div>
            <div class="order-1 col-span-12 md:order-2 md:col-span-6 md:col-start-7">
              <NuxtLink :to="projectPath('cursor-ca-orchestrator')" class="block">
                <img
                  class="aspect-square w-full object-cover grayscale contrast-150"
                  src="/images/projects/cursor-ca-orchestrator.png"
                  alt="Cursor CA orchestrator preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[#1b1c1a] px-10 py-32 text-white">
      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="mb-24">
          <h2 class="font-headline text-7xl font-black uppercase tracking-tighter mix-blend-difference md:text-9xl">
            The How.
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div class="space-y-6 md:mt-20">
            <div class="text-8xl font-black text-[#d97706]/30">01</div>
            <h4 class="text-3xl font-bold">Listen to the Static</h4>
            <p class="leading-relaxed text-gray-400">
              I start where others stop—in the noise. I look for the weird edge cases and the "what if" scenarios that most people ignore. That's where the magic lives.
            </p>
          </div>
          <div class="space-y-6">
            <div class="text-8xl font-black text-[#d97706]/30">02</div>
            <h4 class="text-3xl font-bold">Break the Prototype</h4>
            <p class="leading-relaxed text-gray-400">
              If it doesn't break, it's not innovative enough. I push code and design until they fall apart, then I put them back together in a way that actually works for humans.
            </p>
          </div>
          <div class="space-y-6 md:mt-10">
            <div class="text-8xl font-black text-[#d97706]/30">03</div>
            <h4 class="text-3xl font-bold">Keep it Raw</h4>
            <p class="leading-relaxed text-gray-400">
              Perfect is boring. I leave the fingerprints. I want you to feel the intention behind every pixel and every line of code. Authenticity over polish.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="relative px-10 py-40">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="font-headline mb-12 text-6xl font-black uppercase tracking-tighter md:text-8xl showcase-skew-1">
          Ready to<br /><span class="italic text-[#d97706]">Cause a Stir?</span>
        </h2>
        <p class="mx-auto mb-16 max-w-2xl text-2xl font-medium">
          Reach out at
          <a class="text-[#d97706] underline decoration-2 underline-offset-4" href="mailto:hello@bergamota.dev">hello@bergamota.dev</a>
          for projects that want to stand out, not fit in.
        </p>
        <div class="flex flex-col items-center justify-center gap-10 md:flex-row">
          <a
            class="group relative overflow-hidden bg-[#1b1c1a] px-12 py-6 text-xl font-bold uppercase tracking-widest text-[#f8f6f3]"
            href="mailto:hello@bergamota.dev"
          >
            <span class="relative z-10">Let's Talk Shop</span>
            <div
              class="absolute inset-0 translate-y-full bg-[#d97706] transition-transform duration-300 group-hover:translate-y-0"
            />
          </a>
          <div class="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]" href="#">GitHub</a>
            <a class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]" href="#">LinkedIn</a>
            <a class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]" href="#">Twitter</a>
          </div>
        </div>
      </div>
    </section>

    <footer
      class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#1b1c1a] bg-[#f8f6f3] p-10 md:flex-row"
    >
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        Marcelo Barella — Bergamota
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100">
        <span>Built with Cursor</span>
        <span>Built for the Web</span>
        <span>Stay Weird</span>
      </div>
    </footer>

    <p class="pb-8 text-center text-[0.7rem] tracking-[0.02em] text-[#1b1c1a]/40">
      Built with Cursor. Every image on this site was found and selected by Cursor.
    </p>
  </div>
</template>

<script setup lang="ts">
import projectsData from '~/data/projects-data.json'

const projectCopy = Object.fromEntries(
  projectsData.map((p) => [p.id, p.description] as const)
) as Record<string, string>

function projectPath(id: string) {
  return `/projects/${id}`
}

const meetupPhotos = [
  { id: 1, src: '/images/cursor-meetup/bergamota-01.jpg', alt: 'Bergamota in a group conversation at the Cursor meetup' },
  { id: 2, src: '/images/cursor-meetup/bergamota-02.jpg', alt: 'Bergamota talking with attendees during the meetup' },
  { id: 3, src: '/images/cursor-meetup/bergamota-03.jpg', alt: 'Bergamota with the Cursor team at the meetup' },
  { id: 4, src: '/images/cursor-meetup/bergamota-04.jpg', alt: 'Bergamota posing in front of the Cursor Porto Alegre banner' },
  { id: 5, src: '/images/cursor-meetup/bergamota-05.jpg', alt: 'Bergamota and team portrait at the meetup venue' },
  { id: 6, src: '/images/cursor-meetup/bergamota-06.jpg', alt: 'Bergamota interacting with attendees at the meetup' }
]

const cafeCursorFlorianopolisPhotos = [
  { id: 1, src: '/images/cafe-cursor-florianopolis/bergamota-01.jpg', alt: 'Bergamota speaking with attendees at Cafe Cursor Florianópolis' },
  { id: 2, src: '/images/cafe-cursor-florianopolis/bergamota-02.jpg', alt: 'Bergamota smiling during a conversation at Cafe Cursor Florianópolis' },
  { id: 3, src: '/images/cafe-cursor-florianopolis/bergamota-03.jpg', alt: 'Bergamota presenting a point to the group at Cafe Cursor Florianópolis' },
  { id: 4, src: '/images/cafe-cursor-florianopolis/bergamota-04.jpg', alt: 'Bergamota listening during a meetup exchange at Cafe Cursor Florianópolis' },
  { id: 5, src: '/images/cafe-cursor-florianopolis/bergamota-05.jpg', alt: 'Bergamota in discussion with another attendee at Cafe Cursor Florianópolis' },
  { id: 6, src: '/images/cafe-cursor-florianopolis/bergamota-06.jpg', alt: 'Bergamota following a live discussion at Cafe Cursor Florianópolis' }
]
</script>
