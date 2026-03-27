export function usePrefersReducedMotion() {
  const reduced = ref(false)
  if (import.meta.client) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    mq.addEventListener('change', () => {
      reduced.value = mq.matches
    })
  }
  return reduced
}
