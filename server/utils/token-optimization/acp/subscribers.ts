import type { AcpPublicEvent } from './manager'

type Listener = (event: AcpPublicEvent) => void

const listeners = new Set<Listener>()

export function subscribeAcp(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function broadcastAcp(event: AcpPublicEvent) {
  for (const listener of listeners) {
    listener(event)
  }
}
