import { promptAcpGatewaySession } from '../../../../../../utils/token-optimization/acp/gatewayClient'
import { enforceTokenLabLimits } from '../../../../../../utils/token-optimization/enforceLabLimits'

type Body = {
  prompt?: string
  stream?: boolean
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.acpBearerToken || !config.acpGatewayUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'ACP gateway is not configured'
    })
  }

  const rate = enforceTokenLabLimits(event, true)
  if (!rate.allowed) {
    return { ok: false, throttled: true, reason: rate.reason }
  }

  const sessionId = getRouterParam(event, 'id')?.trim()
  if (!sessionId) {
    throw createError({ statusCode: 400, statusMessage: 'session id is required' })
  }

  const body = await readBody<Body>(event)
  const prompt =
    body.prompt?.trim() ||
    'In one sentence, explain why server-side ACP proxying keeps secrets off the client.'

  const result = await promptAcpGatewaySession(sessionId, prompt, Boolean(body.stream))
  return {
    ok: true,
    mode: 'gateway',
    result
  }
})
