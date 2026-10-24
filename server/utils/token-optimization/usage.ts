type TokenUsage = {
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
  totalTokens: number
  reasoningTokens?: number
}

/** SDK run.usage may double-count cache in totalTokens; prefer input+output for display. */
export function normalizeRunUsage(usage: TokenUsage | undefined) {
  if (!usage) {
    return undefined
  }
  const inputTokens = usage.inputTokens
  const outputTokens = usage.outputTokens
  const cacheReadTokens = usage.cacheReadTokens
  const cacheWriteTokens = usage.cacheWriteTokens
  const totalTokens = inputTokens + outputTokens
  return {
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    totalTokens,
    reasoningTokens: usage.reasoningTokens,
    source: 'sdk' as const
  }
}

export function estimateCostUsd(totalTokens: number, inputRatio = 0.85, pricePerMInput = 3, pricePerMOutput = 15) {
  const inputTokens = Math.round(totalTokens * inputRatio)
  const outputTokens = totalTokens - inputTokens
  const cost =
    (inputTokens / 1_000_000) * pricePerMInput + (outputTokens / 1_000_000) * pricePerMOutput
  return { costUsd: cost, label: 'estimate' as const }
}
