import { OPTIMIZATION_SCENARIOS } from '../../utils/token-optimization/fallback'
import { getAcpManager } from '../../utils/token-optimization/acp/manager'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const hasKey = Boolean(config.cursorApiKey)
  const manager = getAcpManager()
  const agentCliFound = Boolean(await manager.resolveAgentBinary())
  return {
    hasApiKey: hasKey,
    defaultModel: config.public.tokenOptimizationDefaultModel,
    contextWindowTokens: config.public.tokenOptimizationContextWindow,
    rateLimits: {
      perIpPerMinute: config.tokenOptimizationPerIpLimit,
      globalPerMinute: config.tokenOptimizationGlobalLimit
    },
    sdk: {
      package: '@cursor/sdk',
      authEnv: 'CURSOR_API_KEY',
      supportsCloudAgents: true,
      cloudDocs: 'https://cursor.com/docs/sdk/typescript',
      supportsUsage: true,
      usageNote:
        'TokenUsage em run.wait()/result.usage e eventos stream type usage; agent.getUsage() para custo faturado (pode atrasar). totalTokens no run pode incluir cache de forma inconsistente — usamos inputTokens+outputTokens.'
    },
    acp: {
      enabled: manager.isEnabled(),
      agentCliFound,
      transport: 'stdio',
      framing: 'newline-delimited JSON-RPC 2.0',
      command: 'agent acp',
      docsUrl: 'https://cursor.com/docs/cli/acp',
      protocolUrl: 'https://agentclientprotocol.com',
      tokenUsageExposure:
        'Não documentado explicitamente na página ACP do Cursor; este app repassa session/update e tenta extrair campos usage quando presentes. Marcar como não confirmado até validar em runtime.',
      ssePath: '/api/token-optimization/acp/events'
    },
    hosting: {
      primary: 'contabo-vps-docker',
      nitroPreset: process.env.NITRO_PRESET || 'vercel',
      vercelStillSupported: true
    },
    scenarios: OPTIMIZATION_SCENARIOS
  }
})
