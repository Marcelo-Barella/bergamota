import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    nuxtApp.provide('lenis', null)
    return
  }

  const lenis = new Lenis({ autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  const scroller = document.documentElement
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(Number(value), { immediate: true })
      }
      return lenis.scroll
    },
    scrollLeft(value) {
      if (arguments.length && lenis.isHorizontal) {
        lenis.scrollTo(Number(value), { immediate: true })
      }
      return lenis.isHorizontal ? lenis.scroll : window.scrollX ?? 0
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    }
  })

  const refreshScroll = () => {
    lenis.resize()
    ScrollTrigger.refresh()
  }

  nuxtApp.hook('page:finish', refreshScroll)
  nuxtApp.hook('page:transition:finish', refreshScroll)
  window.addEventListener('load', refreshScroll)

  nuxtApp.provide('lenis', lenis)
})
