type CacheEntry<T> = { value: T; expiresAt: number }

const store = new Map<string, CacheEntry<unknown>>()

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key)
  if (!entry) {
    return undefined
  }
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return undefined
  }
  return entry.value as T
}

export function setCached<T>(key: string, value: T, ttlMs: number) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}

export function cacheKey(parts: Record<string, string | number | boolean | undefined>) {
  return Object.entries(parts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${String(v ?? '')}`)
    .join('|')
}
