<template>
  <div>
    <label class="sr-only" for="token-opt-input">Texto para tokenizar</label>
    <textarea
      id="token-opt-input"
      v-model="text"
      class="token-opt-textarea"
      placeholder="Digite um prompt de exemplo…"
      aria-describedby="token-opt-token-help"
    />
    <p id="token-opt-token-help" class="token-opt-stats">
      Visualização com tokenizer <strong>cl100k_base</strong> (estimativa para modelos compatíveis; o tokenizer exato do Composer pode diferir).
    </p>
    <div class="token-opt-stats" aria-live="polite">
      <span class="token-opt-stat"><strong>{{ tokenCount }}</strong> tokens</span>
      <span class="token-opt-stat"><strong>{{ charCount }}</strong> caracteres</span>
      <span class="token-opt-stat">razão ~{{ ratio }}</span>
    </div>
    <div class="token-opt-token-stream" role="region" aria-label="Tokens coloridos">
      <span
        v-for="(piece, index) in pieces"
        :key="index"
        class="token-opt-token"
        :style="{ backgroundColor: colorFor(index) }"
        >{{ piece }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { decode, encode } from 'gpt-tokenizer'

const text = ref(
  'Explique em detalhes como o Cursor usa Rules, Skills e MCP para reduzir tokens repetidos no contexto.'
)

const palette = [
  '#3b2f6b',
  '#2f4a6b',
  '#2f6b4a',
  '#6b4a2f',
  '#6b2f4a',
  '#4a2f6b',
  '#2f6b6b'
]

const tokens = computed(() => {
  if (!text.value) {
    return [] as number[]
  }
  try {
    return encode(text.value)
  } catch {
    return [] as number[]
  }
})

const pieces = computed(() => tokens.value.map((id) => decode([id])))

const tokenCount = computed(() => tokens.value.length)
const charCount = computed(() => text.value.length)
const ratio = computed(() => {
  if (!charCount.value) {
    return '0'
  }
  return (tokenCount.value / charCount.value).toFixed(2)
})

function colorFor(index: number) {
  return palette[index % palette.length]
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
