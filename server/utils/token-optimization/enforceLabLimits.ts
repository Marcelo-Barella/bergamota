import {
  checkTokenLabRateLimit,
  getClientIp,
  tokenLabRateOptionsFromConfig,
  type RateLimitReason
} from './rateLimit'

export function enforceTokenLabLimits(
  event: Parameters<typeof getClientIp>[0],
  consume: boolean
): { allowed: boolean; reason?: RateLimitReason; ip: string } {
  const config = useRuntimeConfig()
  const ip = getClientIp(event)
  const opts = tokenLabRateOptionsFromConfig({
    tokenOptimizationPerIpLimit: config.tokenOptimizationPerIpLimit,
    tokenOptimizationGlobalLimit: config.tokenOptimizationGlobalLimit,
    tokenLabDailyCap: config.tokenLabDailyCap
  })
  const rate = checkTokenLabRateLimit(ip, opts, consume)
  return { allowed: rate.allowed, reason: rate.reason, ip }
}
