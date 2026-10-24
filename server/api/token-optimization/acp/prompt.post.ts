import { cacheKey, getCached, setCached } from '../../../utils/token-optimization/cache'
import { getAcpManager } from '../../../utils/token-optimization/acp/manager'
import { broadcastAcp } from '../../../utils/token-optimization/acp/subscribers'
import { checkRateLimit, getClientIp } from '../../../utils/token-optimization/rateLimit'

type Body = {
  prompt?: string
  model?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<Body>(event)
  const prompt =
    body.prompt?.trim() ||
    'Em uma frase, explique por que Rules e Skills economizam tokens no Cursor.'
  const model = body.model ?? config.public.tokenOptimizationDefaultModel

  const ip = getClientIp(event)
  const rate = checkRateLimit(ip, {
    perIpLimit: config.tokenOptimizationPerIpLimit,
    perIpWindowMs: 60_000,
    globalLimit: config.tokenOptimizationGlobalLimit,
    globalWindowMs: 60_000
  })

  const cacheId = cacheKey({ kind: 'acp', prompt, model })
  const cached = getCached<Record<string, unknown>>(cacheId)
  if (cached) {
    return { ...cached, cached: true }
  }

  if (!rate.allowed) {
    const payload = { ok: false, throttled: true, reason: rate.reason }
    setCached(cacheId, payload, 60_000)
    return payload
  }

  const manager = getAcpManager()
  const result = await manager.prompt(config.cursorApiKey, prompt, model)

  if (result.mode === 'fallback') {
    for (const acpEvent of result.events) {
      broadcastAcp(acpEvent)
    }
    const agentCli = Boolean(await manager.resolveAgentBinary())
    const payload = {
      ok: true,
      mode: 'fallback',
      note: agentCli
        ? 'ACP não iniciou a tempo — eventos simulados enviados ao feed.'
        : 'Cursor CLI (`agent`) ausente no servidor — eventos simulados enviados ao feed.'
    }
    setCached(cacheId, payload, 5 * 60_000)
    return payload
  }

  const payload = {
    ok: true,
    mode: 'live',
    result: result.result,
    note: 'Prompt enviado via ACP (agent acp, stdio JSON-RPC).'
  }
  setCached(cacheId, payload, 10 * 60_000)
  return payload
})
