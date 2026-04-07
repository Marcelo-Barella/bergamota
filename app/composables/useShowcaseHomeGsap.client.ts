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

export function useShowcaseHomeGsap(root: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  let mm: ReturnType<typeof gsap.matchMedia> | null = null
  const cleanups: Array<() => void> = []

  onMounted(() => {
    const el = root.value
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ctx = gsap.context(() => {
        const nav = el.querySelector<HTMLElement>('[data-gsap-nav]')
        if (nav) gsap.set(nav, { yPercent: 0, clearProps: 'transform' })
        gsap.set(
          el.querySelectorAll(
            '[data-gsap-nav] a, [data-gsap-hero-badge], [data-gsap-hero-line], [data-gsap-hero-lead], [data-gsap-hero-cta]'
          ),
          { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 }
        )
        gsap.set(el.querySelectorAll('[data-gsap-hero-visual]'), { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 })
        const heroImg = el.querySelector('[data-gsap-hero-visual-img]')
        if (heroImg) gsap.set(heroImg, { yPercent: 0, scale: 1, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-hero-watermark]'), { opacity: 1, scale: 1, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('figure[data-gsap-photo-tile]'), { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 })
        gsap.set(el.querySelectorAll('figure[data-gsap-photo-tile] img'), { scale: 1, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-project]'), { opacity: 1, x: 0, y: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-project-tween]'), { opacity: 1, x: 0, y: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-project-media] img'), { yPercent: 0, clearProps: 'transform' })
        gsap.set(el.querySelectorAll('[data-gsap-how-step]'), { opacity: 1, y: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-how-num]'), { color: '#d97706', scale: 1 })
        gsap.set(el.querySelectorAll('[data-gsap-how-title]'), { color: 'rgba(255,255,255,1)' })
        gsap.set(el.querySelectorAll('[data-gsap-contact] > *'), { opacity: 1, y: 0 })
        gsap.set(el.querySelectorAll('[data-gsap-section-head]'), { opacity: 1, x: 0 })
      }, el)
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    const mq = gsap.matchMedia()
    mm = mq

    ctx = gsap.context(() => {
      const heroSection = el.querySelector<HTMLElement>('[data-gsap-hero-section]')
      const heroBadge = el.querySelector('[data-gsap-hero-badge]')
      const heroLines = el.querySelectorAll('[data-gsap-hero-line]')
      const heroLead = el.querySelector('[data-gsap-hero-lead]')
      const heroCta = el.querySelector('[data-gsap-hero-cta]')
      const heroVisual = el.querySelector('[data-gsap-hero-visual]')
      const heroImg = heroVisual?.querySelector<HTMLElement>('[data-gsap-hero-visual-img]')
      const heroWater = el.querySelector('[data-gsap-hero-watermark]')
      const nav = el.querySelector<HTMLElement>('[data-gsap-nav]')
      const scroller = document.documentElement

      const loadTl = gsap.timeline({
        delay: 0.12,
        defaults: { ease: 'power4.out' }
      })
      if (nav) {
        loadTl.from(nav.querySelectorAll('a'), { y: -12, opacity: 0, stagger: 0.05, duration: 0.5 }, 0)
      }
      if (heroBadge) {
        loadTl.from(heroBadge, { y: 28, opacity: 0, rotate: -5, duration: 0.75 }, 0.05)
      }
      if (heroLines.length) {
        loadTl.from(heroLines, { y: 56, opacity: 0, stagger: 0.16, duration: 0.95 }, 0.12)
      }
      if (heroLead) {
        loadTl.from(heroLead, { y: 32, opacity: 0, duration: 0.8 }, 0.28)
      }
      if (heroCta) {
        loadTl.from(heroCta, { y: 20, opacity: 0, scale: 0.96, duration: 0.65 }, 0.4)
      }
      if (heroVisual) {
        loadTl.from(heroVisual, { x: 40, opacity: 0, rotate: 2, duration: 1 }, 0.22)
      }
      if (heroWater) {
        loadTl.from(heroWater, { opacity: 0, scale: 1.08, duration: 1.2 }, 0)
      }

      if (heroSection && heroWater) {
        gsap.to(heroWater, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            scroller,
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1
          }
        })
      }

      if (heroSection && heroImg) {
        gsap.fromTo(
          heroImg,
          { yPercent: -7, scale: 1.05 },
          {
            yPercent: 7,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              scroller,
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.85
            }
          }
        )
      }

      if (heroSection && heroLines.length) {
        gsap.to(heroLines, {
          x: (i) => (i === 0 ? -10 : 14),
          ease: 'none',
          scrollTrigger: {
            scroller,
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        })
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

      el.querySelectorAll('[data-gsap-photo-grid]').forEach((grid) => {
        const figs = grid.querySelectorAll('figure')
        if (!figs.length) return
        gsap.from(figs, {
          scrollTrigger: { scroller, trigger: grid, start: 'top 82%', toggleActions: 'play none none none' },
          y: 64,
          opacity: 0,
          scale: 0.78,
          rotation: (i) => (i % 2 === 0 ? -6 : 6),
          transformOrigin: '50% 88%',
          duration: 0.88,
          stagger: { each: 0.1, from: 'center' },
          ease: 'back.out(1.9)'
        })
      })

      el.querySelectorAll('[data-gsap-project]').forEach((row, i) => {
        const fromX = i % 2 === 0 ? -56 : 56
        const tweenEls = row.querySelectorAll<HTMLElement>('[data-gsap-project-tween]')
        const targets: HTMLElement | HTMLElement[] =
          tweenEls.length > 0 ? Array.from(tweenEls) : (row as HTMLElement)
        gsap.from(targets, {
          scrollTrigger: { scroller, trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
          x: fromX,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0
        })
      })

      el.querySelectorAll<HTMLElement>('[data-gsap-project]').forEach((row) => {
        const media = row.querySelector<HTMLElement>('[data-gsap-project-media]')
        const img = media?.querySelector('img')
        if (!img || !media) return
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              scroller,
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65
            }
          }
        )
      })

      const how = el.querySelector('[data-gsap-how]')
      if (how) {
        const steps = how.querySelectorAll('[data-gsap-how-step]')
        gsap.from(steps, {
          scrollTrigger: { scroller, trigger: how, start: 'top 80%', toggleActions: 'play none none none' },
          y: 48,
          opacity: 0,
          stagger: 0.22,
          duration: 0.85,
          ease: 'power2.out'
        })
      }

      el.querySelectorAll('[data-gsap-how-step]').forEach((step) => {
        const num = step.querySelector('[data-gsap-how-num]')
        const title = step.querySelector('[data-gsap-how-title]')
        if (num) {
          gsap.fromTo(
            num,
            { color: 'rgba(217, 119, 6, 0.28)' },
            {
              color: '#d97706',
              scale: 1.06,
              transformOrigin: 'left center',
              ease: 'none',
              scrollTrigger: {
                scroller,
                trigger: step,
                start: 'top 82%',
                end: 'top 28%',
                scrub: 0.65
              }
            }
          )
        }
        if (title) {
          gsap.fromTo(
            title,
            { color: 'rgba(255, 255, 255, 0.55)' },
            {
              color: 'rgba(255, 255, 255, 1)',
              ease: 'none',
              scrollTrigger: {
                scroller,
                trigger: step,
                start: 'top 78%',
                end: 'top 32%',
                scrub: 0.7
              }
            }
          )
        }
      })

      const contact = el.querySelector('[data-gsap-contact]')
      if (contact) {
        gsap.from(Array.from(contact.children), {
          scrollTrigger: { scroller, trigger: contact, start: 'top 84%', toggleActions: 'play none none none' },
          y: 36,
          opacity: 0,
          stagger: 0.14,
          duration: 0.72,
          ease: 'power3.out'
        })
      }

      const sectionHeadings = el.querySelectorAll('[data-gsap-section-head]')
      sectionHeadings.forEach((head) => {
        gsap.from(head, {
          scrollTrigger: { scroller, trigger: head, start: 'top 90%', toggleActions: 'play none none none' },
          x: -32,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out'
        })
      })

      el.querySelectorAll<HTMLElement>('[data-gsap-magnetic]').forEach((btn) => {
        cleanups.push(attachMagnetic(btn))
      })

      mq.add('(min-width: 768px)', () => {
        const unsubs: Array<() => void> = []
        el.querySelectorAll<HTMLElement>('[data-gsap-photo-tile]').forEach((tile) => {
          const img = tile.querySelector('img')
          gsap.set(tile, { transformPerspective: 1200 })
          const rotX = gsap.quickTo(tile, 'rotationX', { duration: 0.32, ease: 'power2.out' })
          const rotY = gsap.quickTo(tile, 'rotationY', { duration: 0.32, ease: 'power2.out' })
          const onMove = (e: MouseEvent) => {
            const r = tile.getBoundingClientRect()
            const x = e.clientX - r.left - r.width / 2
            const y = e.clientY - r.top - r.height / 2
            rotY(x / 9)
            rotX(-y / 9)
          }
          const onEnter = () => {
            gsap.to(tile, { scale: 1.03, duration: 0.4, ease: 'power2.out' })
            if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' })
          }
          const onLeave = () => {
            rotX(0)
            rotY(0)
            gsap.to(tile, { scale: 1, duration: 0.55, ease: 'power3.out' })
            if (img) gsap.to(img, { scale: 1, duration: 0.55, ease: 'power3.out' })
          }
          tile.addEventListener('mousemove', onMove)
          tile.addEventListener('mouseenter', onEnter)
          tile.addEventListener('mouseleave', onLeave)
          unsubs.push(() => {
            tile.removeEventListener('mousemove', onMove)
            tile.removeEventListener('mouseenter', onEnter)
            tile.removeEventListener('mouseleave', onLeave)
            gsap.killTweensOf([tile, img].filter(Boolean))
            gsap.set(tile, { clearProps: 'transform,scale,rotationX,rotationY,transformPerspective' })
          })
        })
        return () => unsubs.splice(0).forEach((u) => u())
      })

      mq.add('(max-width: 767px)', () => {
        const unsubs: Array<() => void> = []
        el.querySelectorAll<HTMLElement>('[data-gsap-photo-tile]').forEach((tile) => {
          const img = tile.querySelector('img')
          const enter = () => {
            gsap.to(tile, { scale: 1.03, duration: 0.4, ease: 'power2.out' })
            if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' })
          }
          const leave = () => {
            gsap.to(tile, { scale: 1, duration: 0.55, ease: 'power3.out' })
            if (img) gsap.to(img, { scale: 1, duration: 0.55, ease: 'power3.out' })
          }
          tile.addEventListener('mouseenter', enter)
          tile.addEventListener('mouseleave', leave)
          unsubs.push(() => {
            tile.removeEventListener('mouseenter', enter)
            tile.removeEventListener('mouseleave', leave)
            gsap.killTweensOf([tile, img].filter(Boolean))
          })
        })
        return () => unsubs.splice(0).forEach((u) => u())
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
    mm?.revert()
    mm = null
  })
}
