import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useHomeScrollMotion(opts: {
  heroRoot: Ref<HTMLElement | null>
  projectsRoot: Ref<HTMLElement | null>
  flagshipChapter: Ref<HTMLElement | null>
  flagshipTrack: Ref<HTMLElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  let ctx: ReturnType<typeof gsap.context> | null = null

  const isReduced = () =>
    reduced.value || document.documentElement.dataset.reducedMotion === 'true'

  onMounted(() => {
    if (import.meta.server) {
      return
    }
    const { heroRoot, projectsRoot, flagshipChapter, flagshipTrack } = opts
    nextTick(() => {
      ctx = gsap.context(() => {
        if (isReduced()) {
          return
        }

        const hero = heroRoot.value
        const projects = projectsRoot.value
        if (hero) {
          const items = hero.querySelectorAll<HTMLElement>('.hero-item')
          gsap.set(items, { opacity: 0, y: 28, filter: 'blur(6px)' })
          hero.classList.remove('hero-kinetic--prep')
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              toggleActions: 'play none none none',
            },
          })
          heroTl.to(items, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.11,
            ease: 'power3.out',
          })
        }

        if (projects) {
          const title = projects.querySelector<HTMLElement>('.section-title')
          const cards = projects.querySelectorAll<HTMLElement>('.project-card')
          const chapter = flagshipChapter.value
          const track = flagshipTrack.value

          if (title) {
            gsap.set(title, { opacity: 0, y: 20 })
          }
          if (cards.length) {
            gsap.set(cards, { opacity: 0, y: 32 })
          }
          projectsRoot.value?.classList.remove('projects-reveal--prep')

          const projTl = gsap.timeline({
            scrollTrigger: {
              trigger: projects,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
          if (title) {
            projTl.to(title, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
          }
          if (cards.length) {
            projTl.to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: 'power2.out',
              },
              title ? 0.12 : 0,
            )
          }

          if (chapter && track && track.scrollWidth > chapter.clientWidth) {
            const scrollDist = track.scrollWidth - chapter.clientWidth
            gsap.to(track, {
              x: -scrollDist,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'center center',
                end: () => `+=${scrollDist + 120}`,
                pin: true,
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            })
          }
        }

        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })
}
