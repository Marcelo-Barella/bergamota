import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function attachMagnetic(el: HTMLElement, strength = 0.22) {
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }
  const leave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
  }
  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', leave)
  return () => {
    el.removeEventListener('mousemove', move)
    el.removeEventListener('mouseleave', leave)
    gsap.killTweensOf(el)
  }
}

export function useShowcaseProjectGsap(root: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  const cleanups: Array<() => void> = []

  onMounted(() => {
    const el = root.value
    if (!el) return

    const scroller = document.documentElement

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ctx = gsap.context(() => {
        const nav = el.querySelector<HTMLElement>('[data-gsap-project-nav]')
        if (nav) gsap.set(nav, { yPercent: 0, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-project-hero-el]'), {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0
        })
        gsap.set(el.querySelectorAll('[data-gsap-project-hero-visual]'), {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1
        })
        const heroImg = el.querySelector('[data-gsap-project-hero-visual-img]')
        if (heroImg) gsap.set(heroImg, { yPercent: 0, scale: 1, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-project-section]'), { opacity: 1, x: 0, y: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-project-section] img'), { yPercent: 0, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-section-head]'), { opacity: 1, x: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-project-stagger] > *'), { opacity: 1, y: 0, x: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-project-cta] > *'), { opacity: 1, y: 0 })
      }, el)
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    ctx = gsap.context(() => {
      const nav = el.querySelector<HTMLElement>('[data-gsap-project-nav]')
      const hero = el.querySelector<HTMLElement>('[data-gsap-project-hero]')
      const heroVisual = el.querySelector<HTMLElement>('[data-gsap-project-hero-visual]')
      const heroImg = heroVisual?.querySelector<HTMLImageElement>('[data-gsap-project-hero-visual-img]')

      const loadTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'power4.out' }
      })
      if (nav) {
        loadTl.from(nav.querySelectorAll('a'), { y: -12, opacity: 0, stagger: 0.05, duration: 0.5 }, 0)
      }
      const heroEls = el.querySelectorAll('[data-gsap-project-hero-el]')
      if (heroEls.length) {
        loadTl.from(heroEls, { y: 40, opacity: 0, stagger: 0.12, duration: 0.85 }, 0.08)
      }
      if (heroVisual) {
        loadTl.from(heroVisual, { x: 36, opacity: 0, rotate: 1.5, duration: 0.95 }, 0.18)
      }

      if (hero && heroImg) {
        gsap.fromTo(
          heroImg,
          { yPercent: -6, scale: 1.04 },
          {
            yPercent: 6,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              scroller,
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.85
            }
          }
        )
      }

      if (nav) {
        let navHidden = false
        ScrollTrigger.create({
          scroller,
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll()
            if (y < 40) {
              if (navHidden) {
                navHidden = false
                gsap.to(nav, { yPercent: 0, duration: 0.42, ease: 'power2.out', overwrite: 'auto' })
              }
              return
            }
            if (self.direction === 1 && y > 80 && !navHidden) {
              navHidden = true
              gsap.to(nav, { yPercent: -100, duration: 0.45, ease: 'power2.inOut' })
            } else if (self.direction === -1 && navHidden) {
              navHidden = false
              gsap.to(nav, { yPercent: 0, duration: 0.48, ease: 'power2.out' })
            }
          }
        })
      }

      el.querySelectorAll('[data-gsap-section-head]').forEach((head) => {
        gsap.from(head, {
          scrollTrigger: { scroller, trigger: head, start: 'top 90%', toggleActions: 'play none none none' },
          x: -28,
          opacity: 0,
          duration: 0.72,
          ease: 'power3.out'
        })
      })

      el.querySelectorAll('[data-gsap-project-section]').forEach((section, i) => {
        const fromX = i % 2 === 0 ? -44 : 44
        gsap.from(section, {
          scrollTrigger: { scroller, trigger: section, start: 'top 88%', toggleActions: 'play none none none' },
          x: fromX,
          opacity: 0,
          duration: 0.88,
          ease: 'power3.out'
        })
        const parallaxImg = section.querySelector<HTMLImageElement>('img[data-gsap-project-media-parallax]')
        if (parallaxImg) {
          gsap.fromTo(
            parallaxImg,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                scroller,
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            }
          )
        }
      })

      el.querySelectorAll('[data-gsap-project-stagger]').forEach((wrap) => {
        const kids = Array.from(wrap.children)
        if (!kids.length) return
        gsap.from(kids, {
          scrollTrigger: { scroller, trigger: wrap, start: 'top 86%', toggleActions: 'play none none none' },
          y: 36,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power2.out'
        })
      })

      const cta = el.querySelector('[data-gsap-project-cta]')
      if (cta) {
        gsap.from(Array.from(cta.children), {
          scrollTrigger: { scroller, trigger: cta, start: 'top 86%', toggleActions: 'play none none none' },
          y: 32,
          opacity: 0,
          stagger: 0.12,
          duration: 0.68,
          ease: 'power3.out'
        })
      }

      el.querySelectorAll<HTMLElement>('[data-gsap-magnetic]').forEach((btn) => {
        cleanups.push(attachMagnetic(btn))
      })
    }, el)

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)
    cleanups.push(() => window.removeEventListener('load', refresh))
  })

  onUnmounted(() => {
    cleanups.splice(0).forEach((fn) => fn())
    ctx?.revert()
    ctx = null
  })
}
