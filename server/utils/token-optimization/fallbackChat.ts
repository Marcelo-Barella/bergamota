import type { DemoRunResult } from './fallback'

export function getFallbackChat(levelId: number, userMessage: string, model: string): DemoRunResult {
  const snippet = userMessage.slice(0, 120)
  const outputs: Record<number, string> = {
    3: `Critério fixo em Rules: "${snippet}…" — economiza repetir no chat.`,
    4: `Plano: (1) mapear API (2) refatorar com teste — aguardo sua confirmação antes de tools.`,
    5: `Tarefa mecânica → tier barato; arquitetura → escalar para Composer-2.5 se precisar.`,
    6: 'Sem tools neste lab: resposta só em texto, sem dumps de shell/MCP.',
    7: 'Sinais: barra acima do threshold recommend/compact; histórico longo; latência sobe.',
    8: 'Resumo: diff focado na condição do loop; sem colar o arquivo inteiro.',
    9: 'Filtro: rank por nome de símbolo em paralelo; Read só no top-3.',
    10: 'Subagent: exploração ampla; pai mantém contexto enxuto com o resumo.'
  }
  const output =
    outputs[levelId] ??
    'Modo demonstração: configure CURSOR_API_KEY no servidor para respostas reais via Cursor SDK.'
  const base = 180 + levelId * 40 + Math.min(200, userMessage.length)
  return {
    mode: 'fallback',
    model,
    output,
    usage: {
      inputTokens: base,
      outputTokens: 48,
      totalTokens: base + 48,
      source: 'estimate'
    },
    note: 'Resposta pré-computada (sem CURSOR_API_KEY ou limite atingido).'
  }
}
