type Bucket = { count: number; resetAt: number }

const ipBuckets = new Map<string, Bucket>()
const globalMinuteBucket: Bucket = { count: 0, resetAt: 0 }
const globalDailyBucket: Bucket = { count: 0, resetAt: 0 }

const DAY_MS = 24 * 60 * 60 * 1000

function touchBucket(bucket: Bucket, windowMs: number, now: number) {
  if (now >= bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + windowMs
  }
}

export type RateLimitReason = 'ip' | 'global' | 'daily'

export type TokenLabRateOptions = {
  perIpLimit: number
  perIpWindowMs: number
  globalLimit: number
  globalWindowMs: number
  dailyCap: number
}

export function checkTokenLabRateLimit(
  ip: string,
  opts: TokenLabRateOptions,
  consume: boolean
): { allowed: boolean; reason?: RateLimitReason } {
  const now = Date.now()

  touchBucket(globalMinuteBucket, opts.globalWindowMs, now)
  if (globalMinuteBucket.count >= opts.globalLimit) {
    return { allowed: false, reason: 'global' }
  }

  let ipBucket = ipBuckets.get(ip)
  if (!ipBucket) {
    ipBucket = { count: 0, resetAt: now + opts.perIpWindowMs }
    ipBuckets.set(ip, ipBucket)
  }
  touchBucket(ipBucket, opts.perIpWindowMs, now)
  if (ipBucket.count >= opts.perIpLimit) {
    return { allowed: false, reason: 'ip' }
  }

  if (opts.dailyCap > 0) {
    touchBucket(globalDailyBucket, DAY_MS, now)
    if (globalDailyBucket.count >= opts.dailyCap) {
      return { allowed: false, reason: 'daily' }
    }
  }

  if (!consume) {
    return { allowed: true }
  }

  globalMinuteBucket.count += 1
  ipBucket.count += 1
  if (opts.dailyCap > 0) {
    touchBucket(globalDailyBucket, DAY_MS, now)
    globalDailyBucket.count += 1
  }

  return { allowed: true }
}

/** @deprecated use checkTokenLabRateLimit */
export function checkRateLimit(
  ip: string,
  opts: { perIpLimit: number; perIpWindowMs: number; globalLimit: number; globalWindowMs: number }
): { allowed: boolean; reason?: 'ip' | 'global' } {
  const result = checkTokenLabRateLimit(
    ip,
    { ...opts, dailyCap: 0 },
    true
  )
  return { allowed: result.allowed, reason: result.reason === 'daily' ? 'global' : result.reason }
}

export function tokenLabRateOptionsFromConfig(config: {
  tokenOptimizationPerIpLimit: number
  tokenOptimizationGlobalLimit: number
  tokenLabDailyCap: number
}): TokenLabRateOptions {
  return {
    perIpLimit: config.tokenOptimizationPerIpLimit,
    perIpWindowMs: 60_000,
    globalLimit: config.tokenOptimizationGlobalLimit,
    globalWindowMs: 60_000,
    dailyCap: config.tokenLabDailyCap
  }
}

export function getClientIp(event: { node?: { req?: { headers?: Record<string, string | string[] | undefined> } } }) {
  const headers = event.node?.req?.headers ?? {}
  const forwarded = headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded
  if (first) {
    return first.split(',')[0]?.trim() || 'unknown'
  }
  const realIp = headers['x-real-ip']
  if (typeof realIp === 'string' && realIp) {
    return realIp
  }
  return 'unknown'
}
