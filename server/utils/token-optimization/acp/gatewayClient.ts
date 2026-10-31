type GatewayJson = Record<string, unknown>

export async function callAcpGateway(path: string, init: RequestInit = {}): Promise<GatewayJson> {
  const config = useRuntimeConfig()
  const base = String(config.acpGatewayUrl || '').replace(/\/$/, '')
  const token = String(config.acpBearerToken || '')
  if (!base || !token) {
    throw createError({
      statusCode: 503,
      statusMessage: 'ACP gateway is not configured on the server'
    })
  }

  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${base}${path}`, {
    ...init,
    headers
  })

  const text = await response.text()
  let data: GatewayJson = {}
  if (text) {
    try {
      data = JSON.parse(text) as GatewayJson
    } catch {
      data = { raw: text }
    }
  }

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: typeof data.detail === 'string' ? data.detail : 'ACP gateway request failed',
      data
    })
  }

  return data
}

export async function createAcpGatewaySession(): Promise<{ id: string; acp_session_id: string }> {
  const data = await callAcpGateway('/sessions', { method: 'POST' })
  return data as { id: string; acp_session_id: string }
}

export async function promptAcpGatewaySession(
  sessionId: string,
  prompt: string,
  stream = false
): Promise<GatewayJson> {
  return callAcpGateway(`/sessions/${encodeURIComponent(sessionId)}/prompt`, {
    method: 'POST',
    body: JSON.stringify({ prompt, stream })
  })
}

export async function deleteAcpGatewaySession(sessionId: string): Promise<void> {
  await callAcpGateway(`/sessions/${encodeURIComponent(sessionId)}`, { method: 'DELETE' })
}
