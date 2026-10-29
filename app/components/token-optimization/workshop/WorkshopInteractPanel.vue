<template>
  <Teleport to="body">
    <Transition name="ws-panel-fade">
      <div v-if="open" class="ws-panel-backdrop" aria-hidden="true" @click="emit('close')" />
    </Transition>
    <Transition name="ws-panel-slide">
      <aside
        v-if="open"
        class="ws-panel"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <header class="ws-panel-head">
          <h3 class="ws-panel-title">{{ title }}</h3>
          <button type="button" class="ws-panel-close" aria-label="Fechar" @click="emit('close')">×</button>
        </header>
        <div class="ws-panel-body">
          <slot />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{ close: [] }>()

watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
  }
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>
