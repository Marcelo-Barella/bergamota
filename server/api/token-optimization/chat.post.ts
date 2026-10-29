import { cacheKey, getCached, setCached } from '../../utils/token-optimization/cache'
import { getFallbackChat } from '../../utils/token-optimization/fallbackChat'
import { enforceTokenLabLimits } from '../../utils/token-optimization/enforceLabLimits'
import { runWithCursorSdk } from '../../utils/token-optimization/sdkRun'
import { estimateCostUsd } from '../../utils/token-optimization/usage'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

type ChatBody = {
  levelId?: number
  messages?: ChatMessage[]
  userMessage?: string
  model?: string
}

function buildPrompt(levelId: number, messages: ChatMessage[], userMessage: string) {
  const history =
    messages.length > 0
      ? messages.map((m) => `${m.role === 'user' ? 'Usuário' : 'Assistente'}: ${m.content}`).join('\n')
      : ''
  const levelHint = `Nível do workshop: ${levelId}.`
  return [levelHint, history, `Usuário: ${userMessage}`, 'Assistente:'].filter(Boolean).join('\n\n')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ChatBody>(event)
  const levelId = body.levelId ?? 3
  const userMessage = (body.userMessage ?? '').trim()
  if (!userMessage) {
    throw createError({ statusCode: 400, statusMessage: 'userMessage required' })
  }
  const messages = body.messages ?? []
  const model = body.model ?? config.public.tokenOptimizationDefaultModel
  const prompt = buildPrompt(levelId, messages, userMessage)

  const cacheId = cacheKey({ scenarioId: `chat-L${levelId}`, model, prompt })
  const cached = getCached<Record<string, unknown>>(cacheId)
  if (cached) {
    return { ...cached, cached: true }
  }

  const rate = enforceTokenLabLimits(event, true)

  if (!config.cursorApiKey || !rate.allowed) {
    const fallback = getFallbackChat(levelId, userMessage, model)
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
      mode: live.mode,
      model: live.model,
      output: live.output,
      usage: live.usage,
      note: live.note,
      cost: total ? estimateCostUsd(total) : { costUsd: 0, label: 'estimate' as const },
      cached: false,
      durationMs: live.durationMs
    }
    setCached(cacheId, payload, 20 * 60_000)
    return payload
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SDK error'
    const fallback = getFallbackChat(levelId, userMessage, model)
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
