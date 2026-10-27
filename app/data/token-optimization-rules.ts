export const RULES_DOCS = 'https://cursor.com/docs/rules'
export const AGENT_BP_POST = 'https://cursor.com/blog/agent-best-practices'

export type RuleApplyType = 'always' | 'glob' | 'intelligent' | 'manual'

export const RULE_TYPE_LABELS: Record<RuleApplyType, string> = {
  always: 'Always Apply',
  glob: 'Glob (arquivos no contexto)',
  intelligent: 'Apply Intelligently',
  manual: 'Manual @'
}

export const ILLUSTRATIVE_TOKENS_PER_MESSAGE: Record<RuleApplyType, number> = {
  always: 2400,
  glob: 420,
  intelligent: 140,
  manual: 0
}

export type RuleSortCard = {
  id: string
  text: string
  kind: 'good' | 'bad'
}

export const RULE_SORT_CARDS: RuleSortCard[] = [
  { id: 'dist', text: 'Never modify generated files in dist/', kind: 'good' },
  { id: 'exports', text: 'Use named exports (*.tsx glob)', kind: 'good' },
  { id: 'clean', text: 'Write clean code', kind: 'bad' },
  { id: 'guide', text: 'Full style guide as Always Apply', kind: 'bad' }
]

export const SAMPLE_RULE_BODY = `---
globs: src/components/**/*.tsx
alwaysApply: false
---
- Use named exports, not default exports`
