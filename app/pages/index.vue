<template>
  <div class="portfolio-page">
    <section
      id="hero"
      class="hero"
      aria-labelledby="hero-heading"
    >
      <div class="hero-depth" aria-hidden="true">
        <div class="hero-depth-layer hero-depth-layer--back" />
        <div class="hero-depth-layer hero-depth-layer--mid" />
        <div class="hero-depth-grid" />
      </div>
      <div class="hero-content">
        <p id="hero-lede" class="hero-kinetic">
          <span
            v-for="(word, i) in kineticWords"
            :key="i"
            class="hero-kinetic-word"
          >{{ word }}</span>
        </p>
        <h1 id="hero-heading" class="hero-name">
          Marcelo Barella
        </h1>
        <p class="hero-brand">
          Bergamota • Cursor Ambassador
        </p>
        <p class="hero-tagline">
          Building practical AI systems and creating agents that turn ideas into reliable workflows.
        </p>
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-blur" />
        </div>
      </div>
    </section>

    <section id="meetup-photos" class="meetup hero-handoff">
      <h2 class="section-title">Cursor Meetup Photos</h2>
      <p class="meetup-copy">Selected frames where Bergamota appears in the 2026-03-17 Cursor meetup.</p>
      <div class="meetup-grid">
        <figure
          v-for="photo in meetupPhotos"
          :key="photo.id"
          class="meetup-card"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="meetup-image"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </div>
    </section>

    <section id="cafe-cursor-florianopolis" class="meetup">
      <h2 class="section-title">Cafe Cursor Florianópolis</h2>
      <p class="meetup-copy">Selected frames where Bergamota appears at Cafe Cursor Florianópolis.</p>
      <div class="meetup-grid">
        <figure
          v-for="photo in cafeCursorFlorianopolisPhotos"
          :key="photo.id"
          class="meetup-card"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="meetup-image"
            loading="lazy"
            decoding="async"
          >
        </figure>
      </div>
    </section>

    <section id="projects" class="projects">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        <article
          v-for="(project, idx) in projects"
          :key="project.id"
          class="project-card"
          :data-index="idx"
        >
          <a
            :href="project.repoUrl"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="project.imageSrc"
              :alt="project.imageAlt"
              class="project-image"
              loading="lazy"
              decoding="async"
            >
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>
          </a>
        </article>
      </div>
    </section>

    <section id="contact" class="contact">
      <h2 class="section-title">Contact</h2>
      <a href="mailto:hello@bergamota.dev" class="contact-email">hello@bergamota.dev</a>
      <nav class="contact-links" aria-label="Social links">
        <a href="#" class="contact-link" rel="noopener noreferrer">GitHub</a>
        <a href="#" class="contact-link" rel="noopener noreferrer">LinkedIn</a>
        <a href="#" class="contact-link" rel="noopener noreferrer">Twitter</a>
      </nav>
    </section>
    <p class="cursor-note">
      Built with Cursor. Every image on this site was found and selected by Cursor.
    </p>
  </div>
</template>

<script setup lang="ts">
import projectsData from '../data/projects-data.json'

const projects = projectsData

const kineticWords = ['Ideas', 'into', 'reliable', 'workflows.']

const nuxtApp = useNuxtApp()

let heroMotionCtx: ReturnType<typeof import('gsap').gsap.context> | null = null

onMounted(() => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    return
  }
  const gsap = nuxtApp.$gsap
  if (!gsap) {
    return
  }
  const heroRoot = document.querySelector<HTMLElement>('.hero')
  if (!heroRoot) {
    return
  }

  heroMotionCtx = gsap.context(() => {
    const kineticEls = heroRoot.querySelectorAll<HTMLElement>('.hero-kinetic-word')
    const calmEls = heroRoot.querySelectorAll<HTMLElement>('.hero-name, .hero-brand, .hero-tagline, .hero-visual')
    const back = heroRoot.querySelector<HTMLElement>('.hero-depth-layer--back')
    const mid = heroRoot.querySelector<HTMLElement>('.hero-depth-layer--mid')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(kineticEls, {
      opacity: 0,
      y: 28,
      letterSpacing: '0.06em',
      duration: 0.75,
      stagger: 0.09
    })
    tl.from(
      calmEls,
      {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.1
      },
      '-=0.35'
    )

    if (back && mid) {
      gsap.fromTo(
        back,
        { y: 0 },
        {
          y: 48,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRoot,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65
          }
        }
      )
      gsap.fromTo(
        mid,
        { y: 0 },
        {
          y: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRoot,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.45
          }
        }
      )
    }
  }, heroRoot)

  requestAnimationFrame(() => {
    nuxtApp.$ScrollTrigger?.refresh()
  })
})

onBeforeUnmount(() => {
  heroMotionCtx?.revert()
  heroMotionCtx = null
})

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

<style scoped>
.portfolio-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem 4rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.hero {
  position: relative;
  isolation: isolate;
  overflow: clip;
  min-height: 85vh;
  width: 100%;
  max-width: 72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 6vw, 4rem) 0 clamp(3rem, 8vw, 5rem);
  margin-bottom: 0.5rem;
}

.hero-depth {
  position: absolute;
  inset: -12% -8% -8%;
  z-index: 0;
  pointer-events: none;
}

.hero-depth-layer {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.35;
}

.hero-depth-layer--back {
  width: min(90vw, 42rem);
  height: min(90vw, 42rem);
  left: 50%;
  top: 38%;
  translate: -50% -50%;
  background: radial-gradient(
    circle at 40% 40%,
    color-mix(in srgb, var(--color-accent) 55%, transparent),
    transparent 68%
  );
}

.hero-depth-layer--mid {
  width: min(70vw, 28rem);
  height: min(70vw, 28rem);
  right: 8%;
  bottom: 12%;
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in srgb, var(--color-muted) 45%, transparent),
    transparent 65%
  );
  opacity: 0.28;
}

.hero-depth-grid {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    linear-gradient(color-mix(in srgb, var(--color-text) 35%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--color-text) 35%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 50ch;
}

.hero-kinetic {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4.2vw, 2.35rem);
  font-weight: 600;
  font-variation-settings: 'opsz' 72;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--color-text);
  margin: 0 0 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35em 0.5em;
  justify-content: center;
}

.hero-kinetic-word {
  display: inline-block;
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.hero-brand {
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.hero-tagline {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-visual {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.hero-blur {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-muted) 100%);
  opacity: 0.25;
  filter: blur(24px);
}

.hero-handoff {
  position: relative;
  z-index: 2;
  margin-top: 1.5rem;
  padding-top: clamp(2.5rem, 5vw, 3.5rem);
  border-top: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg) 88%, var(--color-text) 12%) 0%,
    var(--color-bg) 2.5rem
  );
  box-shadow: 0 -24px 48px -32px color-mix(in srgb, var(--color-text) 8%, transparent);
}

.meetup {
  width: 100%;
  max-width: 960px;
  padding: 2rem 0 1rem;
}

.meetup-copy {
  color: var(--color-muted);
  max-width: 62ch;
  margin-bottom: 1.5rem;
}

.meetup-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.meetup-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: color-mix(in srgb, var(--color-text) 3%, var(--color-bg));
  box-shadow: 0 2px 12px color-mix(in srgb, var(--color-text) 5%, transparent);
}

.meetup-image {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.projects {
  width: 100%;
  max-width: 960px;
  padding: 4rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: color-mix(in srgb, var(--color-text) 4%, var(--color-bg));
  border-radius: var(--radius-md);
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 12px color-mix(in srgb, var(--color-text) 6%, transparent);
}

.project-card:focus-within {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.project-link {
  display: block;
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
}

.project-link:focus-visible {
  outline: none;
}

.project-image {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  background: color-mix(in srgb, var(--color-muted) 12%, var(--color-bg));
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.project-desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.5;
}

.contact {
  max-width: 56ch;
  padding: 4rem 0;
  text-align: center;
}

.contact-email {
  display: inline-block;
  font-size: 1.125rem;
  color: var(--color-accent);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: opacity 0.2s ease;
}

.contact-email:hover {
  opacity: 0.8;
}

.contact-email:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.contact-link {
  font-size: 1rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--color-accent);
}

.contact-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.cursor-note {
  margin-top: 3rem;
  font-size: 0.7rem;
  color: color-mix(in srgb, var(--color-muted) 70%, transparent);
  text-align: center;
  letter-spacing: 0.02em;
}
</style>
