<template>
  <div
    ref="showcaseRoot"
    class="scroll-smooth bg-[#f8f6f3] font-showcase text-[#1b1c1a] selection:bg-[#d97706] selection:text-white"
  >
    <nav
      data-gsap-nav
      class="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-y-3 border-b border-[#1b1c1a]/10 bg-[#f8f6f3]/95 px-4 py-4 text-[#1b1c1a] backdrop-blur-sm will-change-transform sm:px-6 md:flex-nowrap md:px-10 md:py-6"
      :aria-label="t('common.navPrimary')"
    >
      <NuxtLink
        to="/"
        class="font-headline text-xl font-extrabold uppercase italic tracking-tighter md:text-2xl"
      >
        {{ t('home.brandInitials') }}
      </NuxtLink>
      <div
        class="flex max-w-full flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[9px] font-bold uppercase tracking-[0.2em] md:gap-8 md:text-[10px]"
      >
        <LocaleSwitcher theme="showcase-light" />
        <a class="transition-colors hover:text-[#d97706]" href="#hero">{{ t('home.nav.manifesto') }}</a>
        <a class="transition-colors hover:text-[#d97706]" href="#projects">{{ t('home.nav.experiments') }}</a>
        <a class="transition-colors hover:text-[#d97706]" href="#meetup-photos">{{ t('home.nav.chaos') }}</a>
        <a class="text-[#d97706]" href="#contact">{{ t('home.nav.talk') }}</a>
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
          {{ t('home.hero.badge') }}
        </div>
        <h1
          class="showcase-hero-title font-headline relative z-0 mb-10 font-extrabold uppercase tracking-tighter md:mb-14"
        >
          <span data-gsap-hero-line class="block">{{ t('home.hero.line1') }}</span>
          <span
            data-gsap-hero-line
            class="mt-2 block border-t-2 border-[#1b1c1a] pt-4 text-transparent md:mt-3"
            style="-webkit-text-stroke: 1.5px #1b1c1a"
          >{{ t('home.hero.line2') }}</span>
        </h1>
        <div class="showcase-custom-grid relative z-10 gap-8">
          <div class="relative z-10 col-span-12 md:col-span-5 md:ml-20">
            <p data-gsap-hero-lead class="mb-8 text-2xl font-bold leading-tight">
              {{ t('home.hero.lead') }}
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
                >{{ t('home.hero.cta') }}</span>
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
                  :alt="t('home.hero.photoAlt')"
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
                    {{ t('home.hero.meLabel') }}
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
        {{ t('home.hero.watermark') }}
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
            {{ t('home.meetup.titleLine1') }}<br />{{ t('home.meetup.titleLine2') }}
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            {{ t('home.meetup.subtitle') }}
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
              :class="photoThrowClass(photo.id, 3)"
            >
              <img
                class="aspect-[4/3] h-full w-full origin-center object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                :src="photo.src"
                :alt="t(`home.meetup.photos.${photo.id}.alt`)"
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
            {{ t('home.cafeCursor.titleLine1') }}<br />{{ t('home.cafeCursor.titleLine2') }}
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-2xl italic md:mt-0">
            {{ t('home.cafeCursor.subtitle') }}
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
              :class="photoThrowClass(photo.id, 8)"
            >
              <img
                class="aspect-[4/3] h-full w-full origin-center object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                :src="photo.src"
                :alt="t(`home.cafeCursor.photos.${photo.id}.alt`)"
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
            {{ t('home.projectsSection.titleLine1') }}<br />{{ t('home.projectsSection.titleLine2') }}
          </h2>
          <p class="font-editorial mt-8 max-w-sm text-3xl italic md:mt-0">
            {{ t('home.projectsSection.subtitle') }}
          </p>
        </div>
        <div class="space-y-32 md:space-y-40">
          <div
            data-gsap-project
            class="relative -mx-4 overflow-hidden bg-[#1b1c1a] px-4 py-20 text-[#f8f6f3] sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 md:py-28"
          >
            <div class="relative mx-auto min-w-0 max-w-7xl">
              <div data-gsap-project-tween>
                <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#d97706]">{{ t('home.projectsSection.flagshipLabel') }}</span>
              </div>
              <div class="showcase-flagship-title-block relative mt-4">
                <div data-gsap-project-tween class="showcase-custom-grid relative z-0 w-full items-end gap-y-12">
                  <div class="relative z-10 col-span-12 md:col-span-6">
                    <div
                      aria-hidden="true"
                      class="showcase-flagship-project-title-spacer mb-8"
                    />
                    <p class="max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                      {{ t(projectById['cursor-ca-orchestrator'].descriptionKey) }}
                    </p>
                    <NuxtLink
                      :to="projectPath('cursor-ca-orchestrator')"
                      class="mt-8 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
                    >
                      {{ t('common.seeTheStory') }}
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
                        :alt="t(projectById['cursor-ca-orchestrator'].imageAltKey)"
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
                    {{ t('home.projectsSection.cursorOrchestratorTitleLine1') }}<br>{{ t('home.projectsSection.cursorOrchestratorTitleLine2') }}
                  </h3>
                  <span
                    aria-hidden="true"
                    class="showcase-flagship-project-title font-headline absolute left-0 top-0 z-30 hidden w-full min-w-0 max-w-full break-words font-black uppercase tracking-tighter text-[#1b1c1a] md:block showcase-flagship-title-clip-right"
                  >
                    {{ t('home.projectsSection.cursorOrchestratorTitleLine1') }}<br>{{ t('home.projectsSection.cursorOrchestratorTitleLine2') }}
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
                  :alt="t(projectById['cursor-sync'].imageAltKey)"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-rotate-pos-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#2563eb]">{{ t('home.projectsSection.cursorSyncLabel') }}</span>
              <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/50">
                {{ t('home.projectsSection.cursorSyncSubtitle') }}
              </p>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">{{ t(projectById['cursor-sync'].titleKey) }}</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ t(projectById['cursor-sync'].descriptionKey) }}
              </p>
              <NuxtLink
                :to="projectPath('cursor-sync')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                {{ t('common.seeTheStory') }}
              </NuxtLink>
            </div>
          </div>

          <div data-gsap-project class="showcase-custom-grid items-center">
            <div class="showcase-rotate-neg-1 order-2 col-span-12 mt-12 md:order-1 md:col-span-4 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">{{ t('home.projectsSection.tangerinaLabel') }}</span>
              <h3 class="font-headline mt-4 mb-6 text-6xl font-bold">{{ t(projectById.tangerina.titleKey) }}</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ t(projectById.tangerina.descriptionKey) }}
              </p>
              <NuxtLink
                :to="projectPath('tangerina')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                {{ t('common.seeTheStory') }}
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
                  :alt="t(projectById.tangerina.imageAltKey)"
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
                  :alt="t(projectById['agentic-browser-ai'].imageAltKey)"
                  loading="lazy"
                  decoding="async"
                >
              </NuxtLink>
            </div>
            <div class="showcase-skew-1 col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
              <span class="text-xs font-bold uppercase tracking-widest text-[#d97706]">{{ t('home.projectsSection.agenticLabel') }}</span>
              <h3 class="font-headline mt-4 mb-6 text-5xl font-bold md:text-6xl">{{ t(projectById['agentic-browser-ai'].titleKey) }}</h3>
              <p class="text-lg font-medium leading-relaxed">
                {{ t(projectById['agentic-browser-ai'].descriptionKey) }}
              </p>
              <NuxtLink
                :to="projectPath('agentic-browser-ai')"
                class="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#d97706] underline decoration-2 underline-offset-4"
              >
                {{ t('common.seeTheStory') }}
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
            {{ t('home.how.title') }}
          </h2>
        </div>
        <div data-gsap-how class="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div data-gsap-how-step class="space-y-6 md:mt-20">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">{{ t('home.how.step1.num') }}</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">{{ t('home.how.step1.title') }}</h4>
            <p class="leading-relaxed text-gray-400">
              {{ t('home.how.step1.body') }}
            </p>
          </div>
          <div data-gsap-how-step class="space-y-6">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">{{ t('home.how.step2.num') }}</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">{{ t('home.how.step2.title') }}</h4>
            <p class="leading-relaxed text-gray-400">
              {{ t('home.how.step2.body') }}
            </p>
          </div>
          <div data-gsap-how-step class="space-y-6 md:mt-10">
            <div data-gsap-how-num class="text-8xl font-black text-[#d97706]/30">{{ t('home.how.step3.num') }}</div>
            <h4 data-gsap-how-title class="text-3xl font-bold text-white/80">{{ t('home.how.step3.title') }}</h4>
            <p class="leading-relaxed text-gray-400">
              {{ t('home.how.step3.body') }}
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
          {{ t('home.contact.titleLine1') }}<br /><span class="italic text-[#d97706]">{{ t('home.contact.titleAccent') }}</span>
        </h2>
        <p class="mx-auto mb-16 max-w-2xl text-2xl font-medium">
          {{ t('home.contact.leadPrefix') }}
          <a class="text-[#d97706] underline decoration-2 underline-offset-4" :href="mailtoHref">{{ email }}</a>
          {{ t('home.contact.leadSuffix') }}
        </p>
        <div class="flex flex-col items-center justify-center gap-10 md:flex-row">
          <a
            data-gsap-magnetic
            class="group relative inline-block overflow-hidden bg-[#1b1c1a] px-12 py-6 text-xl font-bold uppercase tracking-widest text-[#f8f6f3]"
            :href="mailtoHref"
          >
            <span class="relative z-10">{{ t('home.contact.cta') }}</span>
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
            >{{ t('common.github') }}</a>
            <a
              class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
              :href="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t('common.linkedin') }}</a>
            <a
              class="underline decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
              :href="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t('common.twitter') }}</a>
          </div>
        </div>
      </div>
    </section>

    <footer
      class="flex flex-col items-center justify-between gap-8 border-t-2 border-[#1b1c1a] bg-[#f8f6f3] p-10 md:flex-row"
    >
      <div class="font-headline text-xl font-bold uppercase italic tracking-tighter">
        {{ t('home.footer.attribution') }}
      </div>
      <div class="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100">
        <span>{{ t('home.footer.builtWithCursor') }}</span>
        <span>{{ t('home.footer.builtForWeb') }}</span>
        <span>{{ t('home.footer.stayWeird') }}</span>
      </div>
    </footer>

    <p class="pb-8 text-center text-[0.7rem] tracking-[0.02em] text-[#1b1c1a]/40">
      {{ t('home.finePrint') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import projectsData from '~/data/projects-data.json'
import type { PortfolioProject } from '~/types/portfolio-project'

const { t } = useI18n()
const { email, mailtoHref, github, linkedin, twitter } = useContact()

const showcaseRoot = ref<HTMLElement | null>(null)
useShowcaseHomeGsap(showcaseRoot)

const projectById = Object.fromEntries(
  projectsData.map((p) => [p.id, p as PortfolioProject]),
) as Record<string, PortfolioProject>

function projectPath(id: string) {
  return `/projects/${id}`
}

const photoThrowCount = 12

function photoThrowClass(id: number, offset: number) {
  return `showcase-photo-throw-${(id - 1 + offset) % photoThrowCount}`
}

const meetupPhotos = [
  { id: 1, src: '/images/cursor-meetup/bergamota-01.jpg' },
  { id: 2, src: '/images/cursor-meetup/bergamota-02.jpg' },
  { id: 3, src: '/images/cursor-meetup/bergamota-03.jpg' },
  { id: 4, src: '/images/cursor-meetup/bergamota-04.jpg' },
  { id: 5, src: '/images/cursor-meetup/bergamota-05.jpg' },
  { id: 6, src: '/images/cursor-meetup/bergamota-06.jpg' },
]

const cafeCursorFlorianopolisPhotos = [
  { id: 1, src: '/images/cafe-cursor-florianopolis/bergamota-01.jpg' },
  { id: 2, src: '/images/cafe-cursor-florianopolis/bergamota-02.jpg' },
  { id: 3, src: '/images/cafe-cursor-florianopolis/bergamota-03.jpg' },
  { id: 4, src: '/images/cafe-cursor-florianopolis/bergamota-04.jpg' },
  { id: 5, src: '/images/cafe-cursor-florianopolis/bergamota-05.jpg' },
  { id: 6, src: '/images/cafe-cursor-florianopolis/bergamota-06.jpg' },
]
</script>
