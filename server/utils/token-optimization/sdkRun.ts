import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeRunUsage } from './usage'

const SYSTEM_PROMPT =
  'Você é um assistente em um workshop sobre otimização de tokens. Responda em português do Brasil, em no máximo 120 palavras, sem usar ferramentas nem pedir arquivos adicionais.'

export type LiveRunResult = {
  mode: 'live'
  model: string
  output: string
  usage: ReturnType<typeof normalizeRunUsage>
  durationMs?: number
  requestId?: string
  note: string
}

export async function runWithCursorSdk(apiKey: string, prompt: string, modelId: string, maxOutputChars: number) {
  const { Agent, JsonlLocalAgentStore } = await import('@cursor/sdk')
  const storeDir = join(tmpdir(), 'bergamota-token-opt')
  await mkdir(storeDir, { recursive: true })

  const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${prompt}`

  const result = await Agent.prompt(fullPrompt, {
    apiKey,
    model: { id: modelId },
    tools: [],
    local: {
      cwd: process.cwd(),
      store: new JsonlLocalAgentStore(storeDir)
    }
  })

  let output = result.result ?? ''
  if (output.length > maxOutputChars) {
    output = `${output.slice(0, maxOutputChars)}…`
  }

  return {
    mode: 'live' as const,
    model: modelId,
    output,
    usage: normalizeRunUsage(result.usage),
    durationMs: result.durationMs,
    requestId: result.requestId,
    note: result.usage
      ? 'Contagem reportada pelo Cursor SDK (input+output; ver docs sobre cache).'
      : 'O SDK não retornou usage nesta execução — valores ausentes.'
  } satisfies LiveRunResult
}
