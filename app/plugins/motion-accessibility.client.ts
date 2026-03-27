export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    return
  }
  const root = document.documentElement
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const apply = () => {
    root.dataset.reducedMotion = mq.matches ? 'true' : 'false'
  }
  apply()
  mq.addEventListener('change', apply)
})
