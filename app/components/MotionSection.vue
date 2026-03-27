<template>
  <component
    :is="tag"
    ref="root"
    v-bind="forwardedAttrs"
    :class="sectionClass"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    tag?: string
    immediate?: boolean
  }>(),
  { tag: 'section', immediate: false },
)

const attrs = useAttrs()

const root = ref<HTMLElement | null>(null)
const reduced = usePrefersReducedMotion()
const revealed = ref(reduced.value || props.immediate)

const forwardedAttrs = computed(() => {
  const { class: _c, ...rest } = attrs
  return rest
})

const sectionClass = computed(() => {
  const extra = attrs.class
  return [
    'motion-section',
    { 'motion-section--visible': revealed.value },
    extra,
  ]
})

onMounted(() => {
  if (props.immediate || reduced.value || !root.value) {
    return
  }
  const el = root.value
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        revealed.value = true
        obs.disconnect()
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  )
  obs.observe(el)
})
</script>

<style scoped>
.motion-section {
  transition:
    opacity var(--motion-reveal-duration, 0.55s) var(--motion-ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform var(--motion-reveal-duration, 0.55s) var(--motion-ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}

.motion-section:not(.motion-section--visible) {
  opacity: 0;
  transform: translateY(0.75rem);
}

.motion-section--visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .motion-section {
    transition: none;
  }

  .motion-section:not(.motion-section--visible) {
    opacity: 1;
    transform: none;
  }
}
</style>
