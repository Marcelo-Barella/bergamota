<template>
  <section
    :class="['flagship-root', { 'flagship-root--motion': !reducedMotion }]"
    :aria-label="`${project.title} case study chapter`"
  >
    <template v-if="reducedMotion">
      <div class="flagship-calm">
        <p class="flagship-eyebrow">Flagship case</p>
        <h2 class="flagship-title">{{ project.title }}</h2>
        <p class="flagship-lead">{{ project.description }}</p>
        <figure class="flagship-figure">
          <img
            :src="project.imageSrc"
            :alt="project.imageAlt"
            class="flagship-img"
            loading="lazy"
            decoding="async"
          >
        </figure>
        <ol class="flagship-steps" aria-label="Project outline">
          <li>Problem framing and constraints</li>
          <li>Interaction model across modalities</li>
          <li>Polish, pacing, and release</li>
        </ol>
        <a
          :href="project.repoUrl"
          class="flagship-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          View repository
        </a>
      </div>
    </template>

    <template v-else>
      <div ref="pinRef" class="flagship-pin">
        <div class="flagship-pin-inner">
          <header class="flagship-intro">
            <p class="flagship-eyebrow">Flagship case</p>
            <h2 class="flagship-title">{{ project.title }}</h2>
            <p class="flagship-lead">{{ project.description }}</p>
          </header>
          <div ref="trackRef" class="flagship-track">
            <article
              v-for="(panel, i) in panels"
              :key="panel.key"
              class="flagship-panel"
              :aria-labelledby="`fp-h-${panel.key}`"
            >
              <div class="flagship-panel-bg" aria-hidden="true" />
              <div class="flagship-panel-mid" aria-hidden="true" />
              <div class="flagship-panel-body">
                <p class="flagship-panel-kicker">{{ panel.kicker }}</p>
                <h3 :id="`fp-h-${panel.key}`" class="flagship-panel-title">
                  {{ panel.title }}
                </h3>
                <p class="flagship-panel-copy">{{ panel.copy }}</p>
              </div>
              <figure v-if="i === 0" class="flagship-panel-visual">
                <img
                  :src="project.imageSrc"
                  :alt="project.imageAlt"
                  class="flagship-img"
                  loading="lazy"
                  decoding="async"
                >
              </figure>
            </article>
            <div class="flagship-endcap">
              <a
                :href="project.repoUrl"
                class="flagship-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                View repository
              </a>
              <p class="flagship-endcap-note">
                Continue below for photos and the full project grid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()

const pinRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const reducedMotion = ref(false)

const panels = [
  {
    key: 'frame',
    kicker: '01 — Frame',
    title: 'One surface, many rhythms',
    copy:
      'Chat stays readable while voice and audio context sit in supporting layers, so nothing competes for attention.'
  },
  {
    key: 'depth',
    kicker: '02 — Depth',
    title: 'Foreground clarity, background drift',
    copy:
      'Soft motion carries structure: panels ease in at different rates so the chapter breathes without noisy loops.'
  },
  {
    key: 'pace',
    kicker: '03 — Pace',
    title: 'Scroll as a timeline',
    copy:
      'Horizontal travel is tied to vertical scroll with scrubbed timing, giving a non-linear read that still maps to one continuous gesture.'
  }
] as const

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mq.matches
  const onChange = () => {
    reducedMotion.value = mq.matches
  }
  mq.addEventListener('change', onChange)

  const nuxtApp = useNuxtApp()
  const core = nuxtApp.$gsap
  const st = nuxtApp.$ScrollTrigger

  let motionCtx: { revert: () => void } | null = null

  const clearMotion = () => {
    motionCtx?.revert()
    motionCtx = null
  }

  const runMotion = () => {
    clearMotion()
    if (reducedMotion.value || !pinRef.value || !trackRef.value || !core || !st) {
      return
    }
    const pin = pinRef.value
    const track = trackRef.value
    const getShift = () => Math.max(0, track.scrollWidth - window.innerWidth)
    const getEnd = () => getShift() + window.innerHeight * 0.35

    motionCtx = core.context(() => {
      core.to(track, {
        x: () => -getShift(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1.25,
          start: 'top top',
          end: () => `+=${getEnd()}`,
          invalidateOnRefresh: true
        }
      })

      const bgs = pin.querySelectorAll<HTMLElement>('.flagship-panel-bg')
      const mids = pin.querySelectorAll<HTMLElement>('.flagship-panel-mid')
      bgs.forEach((el) => {
        core.to(el, {
          x: '-12%',
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            scrub: 2,
            start: 'top top',
            end: () => `+=${getEnd()}`,
            invalidateOnRefresh: true
          }
        })
      })
      mids.forEach((el) => {
        core.to(el, {
          x: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            scrub: 1.6,
            start: 'top top',
            end: () => `+=${getEnd()}`,
            invalidateOnRefresh: true
          }
        })
      })
    }, pin)

    st.refresh()
  }

  watch(reducedMotion, (rm) => {
    clearMotion()
    if (!rm) {
      nextTick(runMotion)
    }
  })

  if (!reducedMotion.value) {
    nextTick(runMotion)
  }

  onBeforeUnmount(() => {
    mq.removeEventListener('change', onChange)
    clearMotion()
  })
})
</script>

<style scoped>
.flagship-root {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.flagship-root--motion {
  padding-left: 0;
  padding-right: 0;
}

.flagship-calm {
  max-width: 56ch;
  margin: 0 auto;
  padding: 3rem 0 2rem;
}

.flagship-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.flagship-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.15;
}

.flagship-lead {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}

.flagship-figure {
  margin: 0 0 1.5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: color-mix(in srgb, var(--color-text) 4%, var(--color-bg));
  box-shadow: 0 4px 24px color-mix(in srgb, var(--color-text) 8%, transparent);
}

.flagship-img {
  width: 100%;
  display: block;
  vertical-align: middle;
}

.flagship-steps {
  margin: 0 0 1.5rem 1.25rem;
  padding: 0;
  color: var(--color-text);
  line-height: 1.6;
  font-size: 0.98rem;
}

.flagship-steps li {
  margin-bottom: 0.5rem;
}

.flagship-cta {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid color-mix(in srgb, var(--color-accent) 45%, transparent);
}

.flagship-cta:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.flagship-pin {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 0 2rem;
  overflow: hidden;
}

.flagship-pin-inner {
  width: 100%;
}

.flagship-intro {
  max-width: min(52ch, 92vw);
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
  text-align: center;
}

.flagship-intro .flagship-lead {
  margin-bottom: 0;
}

.flagship-track {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1.25rem;
  width: max-content;
  padding: 0 1.5rem 1.5rem;
  will-change: transform;
}

.flagship-panel {
  position: relative;
  flex: 0 0 min(85vw, 420px);
  min-height: 320px;
  padding: 1.75rem 1.5rem;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-text) 5%, var(--color-bg));
  box-shadow: 0 8px 32px color-mix(in srgb, var(--color-text) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-text) 8%, var(--color-bg));
  overflow: hidden;
  box-sizing: border-box;
}

.flagship-panel-bg {
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    ellipse at 30% 20%,
    color-mix(in srgb, var(--color-accent) 22%, transparent),
    transparent 55%
  );
  opacity: 0.5;
  pointer-events: none;
}

.flagship-panel-mid {
  position: absolute;
  right: -15%;
  bottom: -25%;
  width: 70%;
  height: 55%;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-muted) 18%, transparent);
  pointer-events: none;
}

.flagship-panel-body {
  position: relative;
  z-index: 1;
}

.flagship-panel-kicker {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.flagship-panel-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.flagship-panel-copy {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-muted);
  margin: 0;
}

.flagship-panel-visual {
  position: relative;
  z-index: 1;
  margin: 1.25rem 0 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: color-mix(in srgb, var(--color-text) 4%, var(--color-bg));
}

.flagship-endcap {
  flex: 0 0 min(72vw, 320px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
}

.flagship-endcap-note {
  margin: 1rem 0 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--color-muted);
  max-width: 28ch;
}

@media (min-width: 768px) {
  .flagship-panel {
    flex: 0 0 min(38vw, 440px);
    min-height: 340px;
  }

  .flagship-endcap {
    flex: 0 0 min(28vw, 300px);
  }
}
</style>
