export const SKILLS_DOCS = 'https://cursor.com/docs/skills'
export const DYNAMIC_CTX_POST = 'https://cursor.com/blog/dynamic-context-discovery'
export const AGENT_BP_POST = 'https://cursor.com/blog/agent-best-practices'
export const SKILLS_SH = 'https://skills.sh'
export const PSTACK_REPO = 'https://github.com/cursor/plugins/tree/main/pstack'

export const SKILL_DESC_ONLY_TOKENS = 48
export const SKILL_FULL_TOKENS = 3200

export type SkillQuizOption = {
  id: string
  label: string
  installs: string
  correct?: boolean
}

export const FRONTEND_SKILL_QUIZ = {
  prompt: 'Componente React + Tailwind neste repo',
  options: [
    { id: 'frontend-design', label: 'frontend-design', installs: '1.0M', correct: true },
    { id: 'vercel-react', label: 'vercel-react-best-practices', installs: '842K' },
    { id: 'web-design', label: 'web-design-guidelines', installs: '789K' },
    { id: 'design-taste', label: 'design-taste-frontend', installs: '683K' },
    { id: 'composition', label: 'vercel-composition-patterns', installs: '420K' },
    { id: 'supabase', label: 'supabase-postgres-best-practices', installs: '462K' },
    { id: 'remotion', label: 'remotion-best-practices', installs: '690K' }
  ] as SkillQuizOption[],
  docExample: { name: 'react-component-patterns', paths: '**/*.tsx' }
}

export const SKILLS_SH_TOP_OCT26 = [
  { name: 'find-skills', installs: '4.1M' },
  { name: 'grill-me', installs: '1.4M' },
  { name: 'hyperframes-cli', installs: '1.3M' },
  { name: 'agent-browser', installs: '1.3M' },
  { name: 'grill-with-docs', installs: '1.2M' },
  { name: 'hyperframes', installs: '1.2M' },
  { name: 'improve-codebase-architecture', installs: '1.2M' },
  { name: 'tdd', installs: '1.2M' },
  { name: 'media-use', installs: '1.1M' },
  { name: 'reddit-automation', installs: '1.1M' }
]

export type SkillBuildPiece = {
  id: string
  label: string
  snippet: string
}

export const SKILL_BUILD_PIECES: SkillBuildPiece[] = [
  { id: 'name', label: 'name', snippet: 'name: my-skill' },
  { id: 'desc', label: 'description', snippet: 'description: When to use this skill…' },
  { id: 'paths', label: 'paths', snippet: 'paths:\n  - "**/*.tsx"' },
  { id: 'disable', label: 'disable-model-invocation', snippet: 'disable-model-invocation: true' },
  { id: 'refs', label: 'references/', snippet: '# See references/ on demand' },
  { id: 'scripts', label: 'scripts/', snippet: '# scripts/run.sh loaded when needed' }
]

export const PSTACK_SKILLS = [
  'poteto-mode',
  'how',
  'why',
  'unslop',
  'arena',
  'principle-*'
]
