<template>
  <pre class="ws-code" aria-label="Snippet SDK ou ACP"><code>{{ code }}</code></pre>
</template>

<script setup lang="ts">
import type { WorkshopLevelId } from '~/data/token-optimization-levels'

const props = defineProps<{
  level: WorkshopLevelId
  modelId: string
  blockTools: boolean
  useCloud: boolean
  confirmBefore: boolean
}>()

const code = computed(() => {
  if (props.level === 0) {
    return `import { encode } from 'gpt-tokenizer'

const ids = encode(textoBase)
// Nível 0 Base — estimativa cl100k_base
const model = { id: "${props.modelId}" } // Composer-2.5
const contextWindow = 200_000`
  }
  if (props.level === 10 || props.useCloud) {
    return `// Nível 10 Agêntico — @cursor/sdk Cloud Agent
const result = await Agent.prompt(prompt, {
  apiKey: process.env.CURSOR_API_KEY,
  model: { id: "${props.modelId}" },
  cloud: { repos: [] }
})

// ACP: agent acp (stdio JSON-RPC)
await send("session/prompt", { sessionId, prompt: [{ type: "text", text }] })
// session/update → thinking, tools, edits`
  }
  if (props.level === 5) {
    return `const model = {
  id: "auto-smart",
  params: [{ id: "optimize_for", value: "cost" }]
}
// Roteamento de modelo — depois Composer-2.5 se precisar`
  }
  if (props.level === 4 && props.confirmBefore) {
    return `// Confirmar antes — modes plan / ask
const run = await agent.send(prompt, { mode: "plan" })
// session/request_permission no ACP`
  }
  return `import { Agent } from "@cursor/sdk"

const result = await Agent.prompt(prompt, {
  apiKey: process.env.CURSOR_API_KEY,
  model: { id: "${props.modelId}" },
  tools: ${props.blockTools || props.level >= 6 ? '[]' : 'undefined'},
  local: { cwd: process.cwd() }
})`
})
</script>
