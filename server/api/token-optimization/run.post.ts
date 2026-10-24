import { cacheKey, getCached, setCached } from '../../utils/token-optimization/cache'
import { getFallbackRun } from '../../utils/token-optimization/fallback'
import { checkRateLimit, getClientIp } from '../../utils/token-optimization/rateLimit'
import { runWithCursorSdk } from '../../utils/token-optimization/sdkRun'
import { estimateCostUsd } from '../../utils/token-optimization/usage'

type RunBody = {
  scenarioId?: string
  prompt?: string
  model?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<RunBody>(event)
  const scenarioId = body.scenarioId ?? 'verbose'
  const model = body.model ?? config.public.tokenOptimizationDefaultModel
  const prompt =
    body.prompt ??
    (scenarioId === 'concise' || scenarioId === 'context-focused'
      ? 'Refatore a função anexa mantendo a API pública e adicione um teste.'
      : 'Preciso que você analise todo o contexto do projeto, entenda a arquitetura completa, liste todas as dependências, proponha uma refatoração detalhada passo a passo com justificativas longas e também escreva documentação.')

  const cacheId = cacheKey({ scenarioId, model, prompt })
  const cached = getCached<Record<string, unknown>>(cacheId)
  if (cached) {
    return { ...cached, cached: true }
  }

  const ip = getClientIp(event)
  const rate = checkRateLimit(ip, {
    perIpLimit: config.tokenOptimizationPerIpLimit,
    perIpWindowMs: 60_000,
    globalLimit: config.tokenOptimizationGlobalLimit,
    globalWindowMs: 60_000
  })

  if (!config.cursorApiKey || !rate.allowed) {
    const fallback = getFallbackRun(scenarioId, model)
    const total = fallback.usage.totalTokens
    const payload = {
      ...fallback,
      throttled: !rate.allowed,
      throttleReason: rate.reason,
      cost: estimateCostUsd(total),
      cached: false
    }
    setCached(cacheId, payload, 10 * 60_000)
    return payload
  }

  try {
    const live = await runWithCursorSdk(
      config.cursorApiKey,
      prompt,
      model,
      config.tokenOptimizationMaxOutputChars
    )
    const total = live.usage?.totalTokens ?? 0
    const payload = {
      ...live,
      cost: total ? estimateCostUsd(total) : { costUsd: 0, label: 'estimate' as const },
      cached: false
    }
    setCached(cacheId, payload, 30 * 60_000)
    return payload
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SDK error'
    const fallback = getFallbackRun(scenarioId, model)
    const total = fallback.usage.totalTokens
    const payload = {
      ...fallback,
      sdkError: message,
      cost: estimateCostUsd(total),
      cached: false
    }
    setCached(cacheId, payload, 5 * 60_000)
    return payload
  }
})
