import { createAcpGatewaySession } from '../../../../utils/token-optimization/acp/gatewayClient'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  if (!config.acpBearerToken || !config.acpGatewayUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'ACP gateway is not configured'
    })
  }

  const session = await createAcpGatewaySession()
  return {
    ok: true,
    sessionId: session.id,
    acpSessionId: session.acp_session_id
  }
})
