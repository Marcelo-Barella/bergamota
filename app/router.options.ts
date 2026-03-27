import type { RouterConfig } from 'vue-router'

function motionBehavior(): ScrollBehavior {
  if (import.meta.server) {
    return 'auto'
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
}

export default {
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: motionBehavior(),
      }
    }
    return { top: 0, behavior: motionBehavior() }
  },
} satisfies RouterConfig
