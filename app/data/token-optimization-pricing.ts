export const MODELS_PRICING_DOC = 'https://cursor.com/docs/models'

export const COMPOSER_25_RATES = {
  model: 'Composer 2.5',
  inputPerM: 0.5,
  cacheReadPerM: 0.2,
  outputPerM: 2.5,
  source: MODELS_PRICING_DOC
} as const

export function estimateComposerCost(inputTokens: number, outputTokens: number, cachedFraction: number) {
  const cached = Math.min(1, Math.max(0, cachedFraction))
  const freshInput = inputTokens * (1 - cached)
  const cachedInput = inputTokens * cached
  const inputCost = (freshInput / 1_000_000) * COMPOSER_25_RATES.inputPerM
  const cacheCost = (cachedInput / 1_000_000) * COMPOSER_25_RATES.cacheReadPerM
  const outputCost = (outputTokens / 1_000_000) * COMPOSER_25_RATES.outputPerM
  return {
    inputCost,
    cacheCost,
    outputCost,
    total: inputCost + cacheCost + outputCost
  }
}
