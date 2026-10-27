export type TokenOptConfig = {
  hasApiKey: boolean
  defaultModel: string
  contextWindowTokens: number
  rateLimits: { perIpPerMinute: number; globalPerMinute: number }
  sdk: {
    package: string
    authEnv: string
    supportsCloudAgents?: boolean
    cloudDocs?: string
    supportsUsage: boolean
    usageNote: string
  }
  acp?: {
    enabled: boolean
    agentCliFound: boolean
    transport: string
    framing: string
    command: string
    docsUrl: string
    protocolUrl: string
    tokenUsageExposure: string
    ssePath: string
  }
  hosting?: {
    primary: string
    nitroPreset: string
    vercelStillSupported: boolean
  }
  scenarios: Array<{
    id: string
    title: string
    beforeTokens: number
    afterTokens: number
    description: string
  }>
}

export type RunResponse = {
  mode: 'live' | 'fallback'
  model: string
  output: string
  usage?: {
    inputTokens: number
    outputTokens: number
    totalTokens: number
    source: string
  }
  note?: string
  throttled?: boolean
  throttleReason?: string
  sdkError?: string
  cost?: { costUsd: number; label: string }
  cached?: boolean
  durationMs?: number
}

export function useTokenOptimization() {
  const config = useState<TokenOptConfig | null>('token-opt-config', () => null)

  async function loadConfig() {
    if (config.value) {
      return config.value
    }
    config.value = await $fetch<TokenOptConfig>('/api/token-optimization/config')
    return config.value
  }

  async function runDemo(scenarioId: string, prompt?: string) {
    return $fetch<RunResponse>('/api/token-optimization/run', {
      method: 'POST',
      body: { scenarioId, prompt }
    })
  }

  async function sendChat(
    levelId: number,
    userMessage: string,
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ) {
    return $fetch<RunResponse>('/api/token-optimization/chat', {
      method: 'POST',
      body: { levelId, userMessage, messages }
    })
  }

  return { config, loadConfig, runDemo, sendChat }
}
