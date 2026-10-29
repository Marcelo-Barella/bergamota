<template>
  <div class="ws-flow-panel">
    <div class="ws-flow-diagram" aria-hidden="true">
      <div
        v-for="(node, i) in nodes"
        :key="node"
        class="ws-flow-node"
        :class="{ 'ws-flow-node--active': activeIndex === i }"
      >
        {{ node }}
      </div>
      <div v-if="nodes.length > 1" class="ws-flow-connector" />
    </div>
    <div class="ws-json">
      <div class="ws-json-head">
        <span>JSON</span>
        <span class="ws-latency" v-if="latencyMs != null">latência {{ latencyMs }} ms</span>
        <span class="ws-source">{{ sourceLabel }}</span>
      </div>
      <pre>{{ jsonPretty }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nodes: string[]
  payload: Record<string, unknown>
  latencyMs: number | null
  sourceLabel: string
}>()

const tick = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    tick.value += 1
  }, 900)
})
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const activeIndex = computed(() => tick.value % Math.max(props.nodes.length, 1))
const jsonPretty = computed(() => JSON.stringify(props.payload, null, 2))
</script>
