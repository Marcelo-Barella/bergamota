import type { WorkshopLevelId } from '~/data/token-optimization-levels'

export type PracticeTask = {
  levelId: WorkshopLevelId
  starter: string
  task: string
}

export const PRACTICE_BY_LEVEL: Partial<Record<WorkshopLevelId, PracticeTask>> = {
  3: {
    levelId: 3,
    starter: 'Lab · Rules',
    task:
      'Em uma frase: o que você colocaria em Rules em vez de repetir no chat? Depois peça um exemplo de critério fixo para PRs.'
  },
  4: {
    levelId: 4,
    starter: 'Lab · confirmar',
    task:
      'Descreva um plano em 2 bullets para refatorar uma função; diga que só quer executar após sua confirmação.'
  },
  5: {
    levelId: 5,
    starter: 'Lab · roteamento',
    task: 'Classifique: "renomear variável local" vs "desenhar arquitetura multi-tenant". Qual vai no modelo mais barato primeiro?'
  },
  6: {
    levelId: 6,
    starter: 'Lab · guardrails',
    task: 'Explique em 2 frases por que `tools: []` evita shell/MCP poluindo o contexto neste exercício.'
  },
  7: {
    levelId: 7,
    starter: 'Lab · compactar',
    task: 'Liste 3 sinais de que a barra de contexto pede compactação (use os thresholds do painel).'
  },
  8: {
    levelId: 8,
    starter: 'Lab · leitura',
    task: 'Peça um resumo de diff em vez do arquivo inteiro; máximo 40 palavras na resposta.'
  },
  9: {
    levelId: 9,
    starter: 'Lab · escala',
    task: 'Dado um glob com 40 arquivos, proponha um filtro paralelo em 1 frase antes de qualquer Read.'
  },
  10: {
    levelId: 10,
    starter: 'Lab · agêntico',
    task: 'Quando delegar a um Subagent vs manter no agente pai? Resposta em 3 bullets curtos.'
  }
}
