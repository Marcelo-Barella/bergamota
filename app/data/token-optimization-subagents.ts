export const SUBAGENTS_DOCS = 'https://cursor.com/docs/subagents'
export const TOKEN_EFF_POST = 'https://cursor.com/blog/improved-token-efficiency'

export type SubagentQuizCard = {
  id: string
  text: string
  kind: 'anti' | 'ok'
}

export const SUBAGENT_QUIZ: SubagentQuizCard[] = [
  { id: 'fifty', text: '50+ subagents vagos', kind: 'anti' },
  { id: 'few', text: '2–3 subagents focados', kind: 'ok' },
  { id: 'long', text: 'Prompt gigante = mais inteligente', kind: 'anti' },
  { id: 'skill', text: 'Tarefa simples → Skill', kind: 'ok' }
]

export const SUBAGENT_FRONTMATTER = `---
name: my-agent
description: Quando usar
model: inherit
readonly: false
is_background: false
---`
