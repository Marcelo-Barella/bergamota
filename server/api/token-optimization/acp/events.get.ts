import { getAcpManager } from '../../../utils/token-optimization/acp/manager'
import { subscribeAcp } from '../../../utils/token-optimization/acp/subscribers'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const manager = getAcpManager()
  const binary = await manager.resolveAgentBinary()

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
    hasApiKey: Boolean(config.cursorApiKey)
  })

  if (config.cursorApiKey && manager.isEnabled()) {
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
