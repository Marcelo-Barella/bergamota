<template>
  <div
    ref="showcaseRoot"
    class="scroll-smooth bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white"
  >
    <nav
      data-gsap-nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#1b1c1a]/10 bg-[#f8f6f3]/95 px-4 py-4 text-[#1b1c1a] backdrop-blur-sm will-change-transform sm:px-6 md:flex-nowrap md:px-10 md:py-6"
      aria-label="Primary"
    >
      <NuxtLink
        to="/"
        class="font-headline text-xl font-extrabold uppercase italic tracking-tighter md:text-2xl"
      >
        M. Barella
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]"
      >
        <a class="transition-colors hover:text-[#d97706]" href="#hero">Manifesto</a>
        <a class="transition-colors hover:text-[#d97706]" href="#projects">Experiments</a>
        <a class="transition-colors hover:text-[#d97706]" href="#meetup-photos">Chaos</a>
        <a class="text-[#d97706]" href="#contact">Talk?</a>
        <LanguageSwitcher variant="showcase" />
      </div>
    </nav>

    <header
      id="hero"
      data-gsap-hero-section
      class="relative flex min-h-screen flex-col justify-center overflow-visible border-b-2 border-[#1b1c1a] px-4 pt-24 sm:px-6 md:px-10 md:pt-20"
    >
      <div class="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div
          data-gsap-hero-badge
          class="showcase-rotate-neg-1 mb-12 inline-block bg-[#d97706] px-4 py-2 text-sm font-bold uppercase tracking-[0.3em] text-white"
        >
          Bergamota Cursor Ambassador
        </div>
        <h1
          class="showcase-hero-title font-headline relative z-0 mb-10 font-extrabold uppercase tracking-tighter md:mb-14"
        >
          <span data-gsap-hero-line class="block">Breaking</span>
          <span
            data-gsap-hero-line
            class="mt-2 block border-t-2 border-[#1b1c1a] pt-4 text-transparent md:mt-3"
            style="-webkit-text-stroke: 1.5px #1b1c1a"
          >The Grid</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 gap-8">
          <div class="relative z-10 col-span-12 md:col-span-5 md:ml-20">
            <p data-gsap-hero-lead class="mb-8 text-2xl font-bold leading-tight">
              I ship AI tools and agent workflows that turn ambitious ideas into something people use every day.
            </p>
            <div class="flex gap-4">
              <a
                href="#projects"
                class="showcase-rotate-pos-1 inline-block"
              >
                <span
                  data-gsap-hero-cta
                  data-gsap-magnetic
                  class="block bg-[#1b1c1a] px-10 py-5 font-bold uppercase tracking-widest text-[#f8f6f3] transition-colors duration-300 hover:bg-[#d97706]"
                >Witness the work</span>
              </a>
            </div>
          </div>
          <div class="relative z-10 col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <div
              data-gsap-hero-visual
              class="showcase-rotate-pos-1 relative aspect-[4/3] w-full overflow-hidden bg-[#1b1c1a]"
            >
              <div data-gsap-hero-visual-img class="absolute inset-0">
                <img
                  class="h-full w-full object-cover contrast-110 saturate-125"
                  src="/images/cursor-meetup/bergamota-01.jpg"
                  alt="Bergamota in a group conversation at the Cursor meetup"
                  loading="eager"
                  decoding="async"
                >
                <div class="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
                  <svg
                    class="showcase-hero-me-arrow absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <path
                      d="M50.2 10.8C57.4 13.8 56 18.4 52 20.6C47.4 23.2 54.2 25.8 48.4 28.4C42.8 30.8 51.2 33.2 48.6 35.6"
                      stroke="#ea580c"
                      stroke-width="0.52"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M44.4 32L48.6 35.6L50.6 30.2"
                      stroke="#ea580c"
                      stroke-width="0.52"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p
                    class="showcase-hero-me-label font-editorial absolute left-[51%] top-[4%] w-max -translate-x-1/2 bg-[#1b1c1a] px-2.5 py-1.5 text-center text-[clamp(0.8rem,2.2vw,1.15rem)] font-semibold italic leading-tight text-white sm:top-[5%] md:left-[52%] md:top-[6%] md:px-3 md:py-2 md:text-[clamp(0.9rem,1.9vw,1.25rem)]"
                  >
                    That's me
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-gsap-hero-watermark
        class="pointer-events-none absolute -bottom-20 -left-10 max-w-[100vw] select-none overflow-hidden font-headline text-[clamp(14rem,min(52vw,48vh),40rem)] font-black leading-none text-[#1b1c1a]/5 md:-left-20"
        aria-hidden="true"
      >
        M
      </div>
    </header>

    <section id="meetup-photos" class="relative bg-white px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-16 grid grid-cols-1 gap-6 border-l-8 border-[#d97706] pl-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-x-10 md:gap-y-0 md:pl-8"
        >
          <h2
            class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            Cursor<br />Meetup
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            {{ t('showcase.meetup_lead', { date: formatMeetupDate }) }}
          </p>
          <p class="font-editorial mt-2 max-w-sm text-sm text-[#1b1c1a]/70 md:mt-1">
            {{ t('showcase.photo_gallery_label', meetupPhotos.length) }}
          </p>
          <p class="font-editorial mt-1 max-w-sm text-xs text-[#1b1c1a]/55 md:mt-0.5">
            {{ t('showcase.locale_number_sample', { n: formatNumber(1234.5, { minimumFractionDigits: 1 }) }) }}
          </p>
        </div>
        <div data-gsap-photo-grid class="showcase-photo-mosaic">
          <figure
            v-for="photo in meetupPhotos"
            :key="photo.id"
            data-gsap-photo-tile
            class="showcase-photo-mosaic-tile group relative z-0 overflow-visible hover:z-20"
          >
            <div
              class="showcase-photo-inner overflow-hidden border-2 border-[#1b1c1a]/12 bg-[#f8f6f3] shadow-[5px_8px_0_0_rgba(27,28,26,0.07)] transition-shadow duration-300 ease-out group-hover:shadow-[7px_11px_0_0_rgba(217,119,6,0.15)]"
              :class="photoThrowClass(photo.id, 0)"
            >
              <img
                class="aspect-[4/3] h-full w-full origin-center object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
              >
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section id="cafe-cursor-florianopolis" class="relative bg-[#f5f3f0] px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-16 grid grid-cols-1 gap-6 border-l-8 border-[#1b1c1a] pl-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-x-10 md:gap-y-0 md:pl-8"
        >
          <h2
            class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            Cafe Cursor<br />Florianópolis
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            Selected frames where Bergamota appears at Cafe Cursor Florianópolis.
          </p>
        </div>
        <div data-gsap-photo-grid class="showcase-photo-mosaic">
          <figure
            v-for="photo in cafeCursorFlorianopolisPhotos"
            :key="photo.id"
            data-gsap-photo-tile
            class="showcase-photo-mosaic-tile group relative z-0 overflow-visible hover:z-20"
          >
            <div
              class="showcase-photo-inner overflow-hidden border-2 border-[#1b1c1a]/12 bg-[#f8f6f3] shadow-[5px_8px_0_0_rgba(27,28,26,0.07)] transition-shadow duration-300 ease-out group-hover:shadow-[7px_11px_0_0_rgba(217,119,6,0.15)]"
              :class="photoThrowClass(photo.id, 5)"
            >
              <img
                class="aspect-[4/3] h-full w-full origin-center object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                decoding="async"
              >
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section id="projects" class="relative bg-white px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <div class="mx-auto min-w-0 max-w-7xl">
        <div
          data-gsap-section-head
          class="mb-24 grid grid-cols-1 gap-6 border-l-8 border-[#d97706] pl-6 md:mb-32 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-x-10 md:gap-y-0 md:pl-8"
        >
          <h2
            class="font-headline min-w-0 max-w-full break-words text-[clamp(2.25rem,7vw+0.75rem,6.5rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            Where My<br />Brain Goes
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-3xl italic md:mt-0">
            What each one is for, what it does for you, and how it earns a place in a real workflow.
          </p>
        </div>
        <div class="space-y-32 md:space-y-40">
          <div
            data-gsap-project
            class="relative -mx-4 overflow-hidden bg-[#1b1c1a] px-4 py-20 text-[#f8f6f3] sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:py-28"
          >
            <div class="relative mx-auto min-w-0 max-w-7xl">
              <div data-gsap-project-tween>
                <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#d97706]">01 / Flagship</span>
              </div>
              <div class="showcase-flagship-title-block relative mt-4">
                <div data-gsap-project-tween class="showcase-custom-grid relative z-0 w-full items-end gap-y-12">
                  <div class="relative z-10 col-span-12 md:col-span-6">
                    <div
                      aria-hidden="true"
                      class="showcase-flagship-project-title-spacer mb-8"
                    />
                    <p class="max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                      {{ projectCopy['cursor-ca-orchestrator'] }}
                    </p>
                    <NuxtLink
                      :to="projectPath('cursor-ca-orchestrator')"
                      class="mt-8 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
                    >
                      See the story
                    </NuxtLink>
                  </div>
                  <div class="relative z-0 col-span-12 md:col-span-5 md:col-start-8">
                    <NuxtLink
                      :to="projectPath('cursor-ca-orchestrator')"
                      data-gsap-project-media
                      class="group relative z-0 block overflow-hidden border-2 border-[#d97706]/40"
                    >
                      <img
                        class="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                        src="/images/projects/cursor-ca-orchestrator.png"
                        alt="Cursor Orchestrator project preview"
                        loading="lazy"
                        decoding="async"
                      >
                    </NuxtLink>
                  </div>
                </div>
                <div
                  data-gsap-project-tween
                  class="pointer-events-none absolute left-0 top-0 z-30 w-full min-w-0 max-w-full"
                >
                  <h3
                    class="showcase-flagship-project-title font-headline absolute left-0 top-0 z-30 w-full min-w-0 max-w-full break-words font-black uppercase tracking-tighter text-white showcase-flagship-title-clip-left"
                  >
                    Cursor<br>Orchestrator
                  </h3>
                  <span
                    aria-hidden="true"
                    class="showcase-flagship-project-title font-headline absolute left-0 top-0 z-30 hidden w-full min-w-0 max-w-full break-words font-black uppercase tracking-tighter text-[#1b1c1a] md:block showcase-flagship-title-clip-right"
                  >
                    Cursor<br>Orchestrator
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div data-gsap-project class="showcase-custom-grid items-center">
            <div class="group relative col-span-12 md:col-span-7">
              <div
                class="absolute inset-0 -translate-x-4 translate-y-4 bg-[#2563eb]/15 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
              />
              <NuxtLink
                :to="projectPath('cursor-sync')"
                data-gsap-project-media
                class="relative block overflow-hidden border-2 border-[#1b1c1a]/10"
              >
                <img
                  class="aspect-video w-full object-cover transition-all duration-700 group-hover:brightness-105"
                  src="/images/projects/cursor-sync.png"
                  alt="Cursor Sync project preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-rotate-pos-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#2563eb]">02 / Extension</span>
              <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/50">
                Portable workspace
              </p>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">Cursor Sync</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy['cursor-sync'] }}
              </p>
              <NuxtLink
                :to="projectPath('cursor-sync')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                See the story
              </NuxtLink>
            </div>
          </div>

          <div data-gsap-project class="showcase-custom-grid items-center">
            <div class="showcase-rotate-neg-1 order-2 col-span-12 mt-12 md:order-1 md:col-span-4 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">03 / Discord &amp; joy</span>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">Tangerina</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy.tangerina }}
              </p>
              <NuxtLink
                :to="projectPath('tangerina')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                See the story
              </NuxtLink>
            </div>
            <div class="group relative order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6">
              <div
                class="absolute inset-0 translate-x-4 -translate-y-4 bg-[#d97706]/10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
              />
              <NuxtLink
                :to="projectPath('tangerina')"
                data-gsap-project-media
                class="relative block overflow-hidden"
              >
                <img
                  class="aspect-video w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  src="/images/projects/tangerina.svg"
                  alt="Tangerina project preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
          </div>

          <div data-gsap-project class="showcase-custom-grid items-center">
            <div class="group relative col-span-12 md:col-span-7">
              <div class="absolute -top-10 -left-10 -z-10 h-40 w-40 border-4 border-[#1b1c1a]" />
              <div
                class="absolute inset-0 translate-x-4 -translate-y-4 bg-[#d97706]/10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
              />
              <NuxtLink
                :to="projectPath('agentic-browser-ai')"
                data-gsap-project-media
                class="relative block overflow-hidden"
              >
                <img
                  class="aspect-video w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  src="/images/projects/agentic-browser-ai.png"
                  alt="Agentic Browser AI project preview"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-skew-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">04 / Live web</span>
              <h3 class="font-headline mt-4 mb-6 text-5xl font-bold md:text-6xl">Agentic Browser AI</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ projectCopy['agentic-browser-ai'] }}
              </p>
              <NuxtLink
                :to="projectPath('agentic-browser-ai')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                See the story
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      data-gsap-how-section
      class="relative overflow-x-clip overflow-y-visible bg-[#1b1c1a] px-4 py-24 text-white sm:px-6 md:px-10 md:py-32"
    >
      <div class="relative z-10 mx-auto min-w-0 max-w-7xl">
        <div data-gsap-section-head class="mb-24">
          <h2
            class="font-headline max-w-full text-[clamp(2.5rem,8vw+0.5rem,7rem)] font-black uppercase leading-[0.9] tracking-tighter"
          >
            The How.
          </h2>
        </div>
        <div data-gsap-how class="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div data-gsap-how-step class="space-y-6 md:mt-20">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">01</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">Listen to the Static</h4>
            <p class="leading-relaxed text-gray-400">
              I start where others stop—in the noise. I look for the weird edge cases and the "what if" scenarios that most people ignore. That's where the magic lives.
            </p>
          </div>
          <div data-gsap-how-step class="space-y-6">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">02</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">Break the Prototype</h4>
            <p class="leading-relaxed text-gray-400">
              If it doesn't break, it's not innovative enough. I push code and design until they fall apart, then I put them back together in a way that actually works for humans.
            </p>
          </div>
          <div data-gsap-how-step class="space-y-6 md:mt-10">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">03</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">Keep it Raw</h4>
            <p class="leading-relaxed text-gray-400">
              Perfect is boring. I leave the fingerprints. I want you to feel the intention behind every pixel and every line of code. Authenticity over polish.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="relative px-4 py-28 sm:px-6 md:px-10 md:py-40">
      <div data-gsap-contact class="mx-auto min-w-0 max-w-4xl text-center">
        <h2
          class="showcase-skew-1 font-headline mb-12 max-w-full text-[clamp(2.25rem,6vw+0.75rem,5rem)] font-black uppercase leading-[0.9] tracking-tighter md:text-[clamp(2.75rem,6vw+1rem,5.5rem)]"
        >
          Ready to<br /><span class="italic text-[#d97706]">Cause a Stir?</span>
        </h2>
        <p class="mx-auto mb-16 max-w-2xl text-2xl font-medium">
          Reach out at
          <a class="text-[#d97706] underline decoration-2 underline-offset-4" :href="mailtoHref">{{ email }}</a>
          for projects that want to stand out, not fit in.
        </p>
        <div class="flex flex-col items-center justify-center gap-10 md:flex-row">
          <a
            data-gsap-magnetic
            class="group relative inline-block overflow-hidden bg-[#1b1c1a] px-12 py-6 text-xl font-bold uppercase tracking-widest text-[#f8f6f3]"
            :href="mailtoHref"
          >
            <span class="relative z-10">Let's Talk Shop</span>
            <div
              class="absolute inset-0 translate-y-full bg-[#d97706] transition-transform duration-300 group-hover:translate-y-0"
            />
          </a>
          <div class="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a
              class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
              :href="github"
              target="_blank"
              rel="noopener noreferrer"
            >GitHub</a>
            <a
              class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
              :href="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >LinkedIn</a>
            <a
              class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
              :href="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >Twitter</a>
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

const { t } = useI18n()
const { format: formatDate } = useFormattedDateTime()
const { format: formatNumber } = useFormattedNumber()
const meetupIso = '2026-03-17'
const formatMeetupDate = computed(() => formatDate(meetupIso, { dateStyle: 'long' }))

const { email, mailtoHref, github, linkedin, twitter } = useContact()

const showcaseRoot = ref<HTMLElement | null>(null)
useShowcaseHomeGsap(showcaseRoot)

const projectCopy = Object.fromEntries(
  projectsData.map((p) => [p.id, p.description] as const)
) as Record<string, string>

function projectPath(id: string) {
  return `/projects/${id}`
}

const photoThrowCount = 12

function photoThrowClass(id: number, offset: number) {
  return `showcase-photo-throw-${(id - 1 + offset) % photoThrowCount}`
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
