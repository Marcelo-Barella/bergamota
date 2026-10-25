export type WorkshopLevelId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type WorkshopLevel = {
  id: WorkshopLevelId
  title: string
  subtitle: string
  tier: 'basic' | 'intermediate' | 'advanced' | 'agentic'
  beforeTokens: number
  afterTokens: number
  flowNodes: string[]
  snippetKind: 'tokenizer' | 'context' | 'sdk' | 'acp' | 'policy'
}

export const WORKSHOP_LEVELS: WorkshopLevel[] = [
  {
    id: 0,
    title: 'Base',
    subtitle: 'Tokens, janela de contexto e Composer-2.5',
    tier: 'basic',
    beforeTokens: 1200,
    afterTokens: 1200,
    flowNodes: ['Texto', 'Tokenizer', 'Janela 200k', 'Composer-2.5'],
    snippetKind: 'tokenizer'
  },
  {
    id: 1,
    title: 'Decisão simples',
    subtitle: 'Uma ação clara por mensagem — menos tokens no prompt',
    tier: 'basic',
    beforeTokens: 1842,
    afterTokens: 412,
    flowNodes: ['Pedido vago', 'Decisão única', 'Prompt curto', 'SDK'],
    snippetKind: 'sdk'
  },
  {
    id: 2,
    title: 'Múltipla escolha',
    subtitle: 'Opções A/B/C no prompt em vez de narrativa longa',
    tier: 'basic',
    beforeTokens: 2100,
    afterTokens: 680,
    flowNodes: ['Enunciado', 'Opções', 'Escolha', 'Modelo'],
    snippetKind: 'sdk'
  },
  {
    id: 3,
    title: 'Critérios fixos',
    subtitle: 'Rules e critérios persistentes — não repetir a cada turno',
    tier: 'intermediate',
    beforeTokens: 6200,
    afterTokens: 1400,
    flowNodes: ['Rules', '@file', 'Critérios', 'Turno'],
    snippetKind: 'sdk'
  },
  {
    id: 4,
    title: 'Confirmar antes',
    subtitle: 'Confirmar antes de tools caras poluirem o contexto',
    tier: 'intermediate',
    beforeTokens: 8800,
    afterTokens: 5200,
    flowNodes: ['Plano', 'Confirmar', 'Tool', 'Resultado'],
    snippetKind: 'policy'
  },
  {
    id: 5,
    title: 'Roteamento de modelo',
    subtitle: 'Modelo mais barato primeiro; escala se necessário',
    tier: 'intermediate',
    beforeTokens: 8000,
    afterTokens: 3200,
    flowNodes: ['Tarefa', 'Router', 'Tier barato', 'Composer-2.5'],
    snippetKind: 'sdk'
  },
  {
    id: 6,
    title: 'Guardrails',
    subtitle: 'Bloquear shell/MCP arriscados antes de poluir contexto',
    tier: 'advanced',
    beforeTokens: 9500,
    afterTokens: 4100,
    flowNodes: ['Pedido', 'Guardrails', 'tools: []', 'Texto'],
    snippetKind: 'policy'
  },
  {
    id: 7,
    title: 'Hora de compactar',
    subtitle: 'Thresholds notice / recommend / compact na barra',
    tier: 'advanced',
    beforeTokens: 150000,
    afterTokens: 72000,
    flowNodes: ['Histórico', 'Barra %', 'Compact', 'Novo turno'],
    snippetKind: 'policy'
  },
  {
    id: 8,
    title: 'Leitura barata',
    subtitle: 'Devolver resposta/diff, não o arquivo inteiro (~4k economizados)',
    tier: 'advanced',
    beforeTokens: 12000,
    afterTokens: 8000,
    flowNodes: ['Read', 'Resumo', 'Chat', 'Sem dump'],
    snippetKind: 'sdk'
  },
  {
    id: 9,
    title: 'Arquivos em escala',
    subtitle: 'Filtrar arquivos em paralelo antes do agent ler',
    tier: 'advanced',
    beforeTokens: 22000,
    afterTokens: 6800,
    flowNodes: ['Glob', 'Rank paralelo', 'Top-K', 'Read'],
    snippetKind: 'sdk'
  },
  {
    id: 10,
    title: 'Agêntico',
    subtitle: 'Subagents, Cloud Agents (SDK) e stream ACP ao vivo',
    tier: 'agentic',
    beforeTokens: 28000,
    afterTokens: 9000,
    flowNodes: ['SDK', 'Cloud Agent', 'ACP', 'Usage'],
    snippetKind: 'acp'
  }
]

export function estimateCostUsd(tokens: number, inputRatio = 0.85) {
  const inputTokens = tokens * inputRatio
  const outputTokens = tokens * (1 - inputRatio)
  return (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15
}
