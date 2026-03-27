<template>
  <div class="portfolio-page">
    <section id="hero" class="hero">
      <div class="hero-content">
        <h1 class="hero-name hero-item">Marcelo Barella</h1>
        <p class="hero-brand hero-item">Bergamota • Cursor Ambassador</p>
        <p class="hero-tagline hero-item">
          Building practical AI systems and creating agents that turn ideas into reliable workflows.
        </p>
        <div class="hero-visual hero-item" aria-hidden="true">
          <div class="hero-blur" />
        </div>
      </div>
    </section>

    <section
      id="credibility"
      class="credibility"
      data-scroll-beat
      aria-labelledby="credibility-heading"
    >
      <h2 id="credibility-heading" class="section-title" data-scroll-section-title>
        Credibility
      </h2>
      <p class="credibility-lead" data-scroll-reveal>
        Logos and short signals from the same world as the work below.
      </p>
      <ul class="credibility-logos" aria-label="Tools and communities">
        <li v-for="logo in credibilityLogos" :key="logo.id" class="credibility-logo" data-scroll-reveal>
          <span class="credibility-logo-mark" aria-hidden="true">{{ logo.mark }}</span>
          <span class="credibility-logo-label">{{ logo.label }}</span>
        </li>
      </ul>
      <ul class="credibility-fragments" aria-label="Focus areas">
        <li v-for="(fragment, i) in credibilityFragments" :key="i" class="credibility-fragment" data-scroll-reveal>
          {{ fragment }}
        </li>
      </ul>
    </section>

    <section id="meetup-photos" class="meetup">
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

    <section id="projects" class="projects" data-scroll-beat aria-labelledby="work-heading">
      <h2 id="work-heading" class="section-title" data-scroll-section-title>Work index</h2>
      <p class="work-lead" data-scroll-reveal>
        Case-sized teasers; each card opens the repository in a new tab.
      </p>
      <div class="projects-grid">
        <article
          v-for="(project, idx) in projects"
          :key="project.id"
          class="project-card"
          :data-index="idx"
          data-scroll-reveal
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
            <p v-if="project.caseTeaser" class="project-teaser">{{ project.caseTeaser }}</p>
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
import { projects } from '~/data/projects'

const credibilityLogos = [
  { id: 'cursor', mark: 'Cu', label: 'Cursor' },
  { id: 'nuxt', mark: 'Nu', label: 'Nuxt' },
  { id: 'vue', mark: 'V', label: 'Vue' },
  { id: 'ts', mark: 'TS', label: 'TypeScript' }
]

const credibilityFragments = [
  'Agent orchestration with clear section beats',
  'Keyboard-first links and visible focus',
  'Motion that steps aside when you ask the OS to reduce it'
]

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
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.hero-content {
  text-align: center;
  max-width: 50ch;
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

.credibility {
  width: 100%;
  max-width: 960px;
  padding: 3rem 0 1rem;
}

.credibility-lead {
  color: var(--color-muted);
  max-width: 62ch;
  margin-bottom: 1.5rem;
}

.credibility-logos {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.credibility-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-text) 5%, var(--color-bg));
  border: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
}

.credibility-logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--color-bg);
  background: var(--color-accent);
}

.credibility-logo-label {
  font-size: 0.9rem;
  color: var(--color-text);
}

.credibility-fragments {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.credibility-fragment {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.95rem;
  color: var(--color-muted);
  line-height: 1.5;
}

.credibility-fragment::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.75;
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

.work-lead {
  color: var(--color-muted);
  max-width: 62ch;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
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

.project-teaser {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.45;
  font-style: italic;
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .contact-email,
  .contact-link {
    transition: none;
  }
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
