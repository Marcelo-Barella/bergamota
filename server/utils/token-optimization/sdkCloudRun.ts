import { normalizeRunUsage } from './usage'

const SYSTEM_PROMPT =
  'Workshop de otimização de tokens. Responda em português do Brasil, máximo 100 palavras, sem editar arquivos.'

export async function runCloudAgentPrompt(apiKey: string, prompt: string, modelId: string, maxOutputChars: number) {
  const { Agent } = await import('@cursor/sdk')
  const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${prompt}`

  const result = await Agent.prompt(fullPrompt, {
    apiKey,
    model: { id: modelId },
    cloud: { repos: [] }
  })

  let output = result.result ?? ''
  if (output.length > maxOutputChars) {
    output = `${output.slice(0, maxOutputChars)}…`
  }

  return {
    mode: 'live' as const,
    runtime: 'cloud' as const,
    model: modelId,
    output,
    usage: normalizeRunUsage(result.usage),
    durationMs: result.durationMs,
    requestId: result.requestId,
    agentId: (result as { agentId?: string }).agentId,
    note: 'Cloud Agent via @cursor/sdk (repos: []). Requer no-repo habilitado na conta.'
  }
}
