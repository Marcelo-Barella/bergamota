import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const triggers: ScrollTrigger[] = []

function clearScrollMotion() {
  triggers.splice(0).forEach((t) => t.kill())
}

function mountScrollMotion() {
  clearScrollMotion()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }
  document.querySelectorAll('[data-scroll-beat]').forEach((beat) => {
    const title = beat.querySelector('[data-scroll-section-title]')
    const items = beat.querySelectorAll('[data-scroll-reveal]')
    gsap.set([title, ...items], { opacity: 0, y: 14 })
    const st = ScrollTrigger.create({
      trigger: beat,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
        if (title) {
          tl.to(title, { opacity: 1, y: 0, duration: 0.42 }, 0)
        }
        if (items.length) {
          tl.to(
            items,
            { opacity: 1, y: 0, duration: 0.48, stagger: 0.07 },
            title ? 0.12 : 0
          )
        }
      }
    })
    triggers.push(st)
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const schedule = () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        mountScrollMotion()
        ScrollTrigger.refresh()
      })
    })
  }
  schedule()
  const router = useRouter()
  router.afterEach(() => schedule())
  nuxtApp.hook('app:beforeUnmount', () => {
    clearScrollMotion()
  })
})
