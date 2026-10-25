import { cacheKey, getCached, setCached } from '../../utils/token-optimization/cache'
import { getFallbackRun } from '../../utils/token-optimization/fallback'
import { enforceTokenLabLimits } from '../../utils/token-optimization/enforceLabLimits'
import { runCloudAgentPrompt } from '../../utils/token-optimization/sdkCloudRun'
import { estimateCostUsd } from '../../utils/token-optimization/usage'

type Body = {
  scenarioId?: string
  prompt?: string
  model?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<Body>(event)
  const scenarioId = body.scenarioId ?? 'concise'
  const model = body.model ?? config.public.tokenOptimizationDefaultModel
  const prompt = body.prompt ?? 'Resuma em 2 frases como Cloud Agents ajudam em tarefas longas.'

  const cacheId = cacheKey({ kind: 'cloud', scenarioId, model, prompt })
  const cached = getCached<Record<string, unknown>>(cacheId)
  if (cached) {
    return { ...cached, cached: true }
  }

  const rate = enforceTokenLabLimits(event, true)

  if (!config.cursorApiKey || !rate.allowed) {
    const fallback = getFallbackRun(scenarioId, model)
    const payload = {
      ...fallback,
      runtime: 'fallback',
      throttled: !rate.allowed,
      throttleReason: rate.reason,
      cost: estimateCostUsd(fallback.usage.totalTokens)
    }
    setCached(cacheId, payload, 10 * 60_000)
    return payload
  }

  try {
    const live = await runCloudAgentPrompt(
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
    const message = error instanceof Error ? error.message : 'cloud sdk error'
    const fallback = getFallbackRun(scenarioId, model)
    const payload = {
      ...fallback,
      runtime: 'fallback',
      sdkError: message,
      cost: estimateCostUsd(fallback.usage.totalTokens)
    }
    setCached(cacheId, payload, 5 * 60_000)
    return payload
  }
})
