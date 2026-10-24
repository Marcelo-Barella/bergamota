type Bucket = { count: number; resetAt: number }

const ipBuckets = new Map<string, Bucket>()
const globalBucket: Bucket = { count: 0, resetAt: 0 }

function touchBucket(bucket: Bucket, windowMs: number, now: number) {
  if (now >= bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + windowMs
  }
}

export function checkRateLimit(
  ip: string,
  opts: { perIpLimit: number; perIpWindowMs: number; globalLimit: number; globalWindowMs: number }
): { allowed: boolean; reason?: 'ip' | 'global' } {
  const now = Date.now()
  touchBucket(globalBucket, opts.globalWindowMs, now)
  if (globalBucket.count >= opts.globalLimit) {
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

  globalBucket.count += 1
  ipBucket.count += 1
  return { allowed: true }
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
