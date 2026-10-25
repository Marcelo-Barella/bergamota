import { getAcpManager } from '../../../utils/token-optimization/acp/manager'
import { subscribeAcp } from '../../../utils/token-optimization/acp/subscribers'
import { enforceTokenLabLimits } from '../../../utils/token-optimization/enforceLabLimits'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const manager = getAcpManager()
  const binary = await manager.resolveAgentBinary()
  const rate = enforceTokenLabLimits(event, false)

  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive'
  })

  const stream = createEventStream(event)

  const send = (data: Record<string, unknown>) => {
    stream.push(JSON.stringify(data))
  }

  send({
    type: 'meta',
    acpEnabled: manager.isEnabled(),
    agentCliFound: Boolean(binary),
    hasApiKey: Boolean(config.cursorApiKey),
    throttled: !rate.allowed,
    throttleReason: rate.reason
  })

  if (config.cursorApiKey && manager.isEnabled() && rate.allowed) {
    void manager.ensureStarted(config.cursorApiKey)
  }

  const unsubscribe = subscribeAcp((acpEvent) => {
    send(acpEvent)
  })

  stream.onClosed(() => {
    unsubscribe()
  })

  return stream.send()
})
