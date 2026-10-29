export const MCP_SPEC = 'https://modelcontextprotocol.io'
export const DYNAMIC_CTX_POST = 'https://cursor.com/blog/dynamic-context-discovery'
export const TOKEN_EFF_POST = 'https://cursor.com/blog/improved-token-efficiency'
export const CURSOR_MARKETPLACE = 'https://cursor.com/marketplace'
export const ANTHROPIC_ADV_TOOL =
  'https://www.anthropic.com/engineering/advanced-tool-use'
export const ANTHROPIC_CODE_MCP =
  'https://www.anthropic.com/engineering/code-execution-with-mcp'

export type SourceBadge = 'MEDIDO' | 'CURSOR' | 'ESTIMATIVA NOSSA'

export type SourcedFigure = {
  badge: SourceBadge
  label: string
  detail: string
  href: string
}

export const MCP_SOURCED_FIGURES: SourcedFigure[] = [
  {
    badge: 'MEDIDO',
    label: '~55K tokens · 58 tools',
    detail: 'GitHub, Slack, Sentry, Grafana, Splunk antes da conversa.',
    href: ANTHROPIC_ADV_TOOL
  },
  {
    badge: 'MEDIDO',
    label: 'GitHub · 35 tools · ~26K',
    detail: 'Um servidor no exemplo de cinco MCPs.',
    href: ANTHROPIC_ADV_TOOL
  },
  {
    badge: 'MEDIDO',
    label: 'Tool Search · −85% tokens',
    detail: 'Acurácia 49%→74% (Opus 4) no post.',
    href: ANTHROPIC_ADV_TOOL
  },
  {
    badge: 'MEDIDO',
    label: '150K → 2K tokens',
    detail: 'Code execution with MCP (definições).',
    href: ANTHROPIC_CODE_MCP
  },
  {
    badge: 'CURSOR',
    label: 'Só nomes no estático',
    detail: 'Resto carrega sob demanda.',
    href: `${DYNAMIC_CTX_POST}#4-efficiently-loading-only-the-mcp-tools-needed`
  },
  {
    badge: 'CURSOR',
    label: '−46,9% tokens',
    detail: 'Só em runs que chamaram MCP.',
    href: DYNAMIC_CTX_POST
  },
  {
    badge: 'CURSOR',
    label: '−60% defs built-in',
    detail: 'Tools offloaded no harness.',
    href: `${TOKEN_EFF_POST}#loading-tools-only-when-needed`
  }
]

export const MCP_ESTIMATE_ASSUMPTIONS =
  '~800 tokens/def completa · ~10/nome · ~10 tools/servidor (estimativa nossa).'

export function estimateMcpTurnTokens(servers: number, namesOnly: boolean) {
  if (namesOnly) {
    return servers * 100
  }
  return servers * 8500
}

export type McpQuizScenario = {
  id: string
  text: string
  answer: 'file' | 'skill' | 'mcp' | 'cli'
  answerLabel: string
}

export const MCP_TOOL_QUIZ: McpQuizScenario[] = [
  { id: 'repo', text: 'Arquivo conhecido no repo', answer: 'file', answerLabel: '@file' },
  { id: 'how', text: 'Know-how do time', answer: 'skill', answerLabel: 'Skill' },
  { id: 'figma', text: 'Figma com OAuth', answer: 'mcp', answerLabel: 'MCP' },
  { id: 'gh', text: 'gh logado no terminal', answer: 'cli', answerLabel: 'CLI' }
]

export const MCP_USE_CHIPS = [
  'Figma',
  'Supabase',
  'GitHub',
  'Context7',
  'Slack',
  'Sentry',
  'Datadog',
  'Notion'
]
