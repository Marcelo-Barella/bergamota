export type DemoRunResult = {
  mode: 'fallback'
  model: string
  output: string
  usage: {
    inputTokens: number
    outputTokens: number
    totalTokens: number
    source: 'estimate'
  }
  note: string
}

const FALLBACK_RUNS: Record<string, DemoRunResult> = {
  'verbose|composer-2.5': {
    mode: 'fallback',
    model: 'composer-2.5',
    output:
      'Para refatorar esta função, analise o fluxo completo, liste dependências, proponha testes e documente cada passo antes de editar o arquivo.',
    usage: { inputTokens: 1842, outputTokens: 96, totalTokens: 1938, source: 'estimate' },
    note: 'Resposta pré-computada (sem CURSOR_API_KEY ou limite atingido).'
  },
  'concise|composer-2.5': {
    mode: 'fallback',
    model: 'composer-2.5',
    output: 'Refatore extraindo validação, mantenha a assinatura e adicione um teste unitário mínimo.',
    usage: { inputTokens: 412, outputTokens: 38, totalTokens: 450, source: 'estimate' },
    note: 'Resposta pré-computada (sem CURSOR_API_KEY ou limite atingido).'
  },
  'context-heavy|composer-2.5': {
    mode: 'fallback',
    model: 'composer-2.5',
    output: 'Com base no trecho relevante, o bug está na condição do loop na linha indicada.',
    usage: { inputTokens: 6200, outputTokens: 44, totalTokens: 6244, source: 'estimate' },
    note: 'Resposta pré-computada (sem CURSOR_API_KEY ou limite atingido).'
  },
  'context-focused|composer-2.5': {
    mode: 'fallback',
    model: 'composer-2.5',
    output: 'A condição `i < len - 1` deveria ser `i < len`: off-by-one no loop.',
    usage: { inputTokens: 890, outputTokens: 42, totalTokens: 932, source: 'estimate' },
    note: 'Resposta pré-computada (sem CURSOR_API_KEY ou limite atingido).'
  }
}

export function getFallbackRun(scenarioId: string, model: string): DemoRunResult {
  const key = `${scenarioId}|${model}`
  return (
    FALLBACK_RUNS[key] ?? {
      mode: 'fallback',
      model,
      output: 'Modo demonstração: configure CURSOR_API_KEY no servidor para medições reais via Cursor SDK.',
      usage: { inputTokens: 500, outputTokens: 40, totalTokens: 540, source: 'estimate' },
      note: 'Resposta genérica pré-computada.'
    }
  )
}

export const OPTIMIZATION_SCENARIOS = [
  {
    id: 'prompt',
    title: 'Prompt conciso',
    beforeTokens: 1842,
    afterTokens: 412,
    description: 'Remova contexto narrativo e peça uma ação única e verificável.'
  },
  {
    id: 'context',
    title: 'Seleção de contexto',
    beforeTokens: 6200,
    afterTokens: 890,
    description: 'Anexe só o arquivo e o intervalo de linhas relevantes (@file), não o repositório inteiro.'
  },
  {
    id: 'rules',
    title: 'Rules',
    beforeTokens: 2400,
    afterTokens: 1200,
    description: 'Rules persistentes evitam repetir convenções em cada mensagem.'
  },
  {
    id: 'skills',
    title: 'Skills',
    beforeTokens: 3100,
    afterTokens: 1400,
    description: 'Skills carregam o procedimento certo sob demanda, em vez de colar manuais longos.'
  },
  {
    id: 'mcp',
    title: 'MCPs',
    beforeTokens: 4500,
    afterTokens: 2100,
    description: 'Conecte ferramentas externas só quando necessário; desative MCPs não usados na sessão.'
  },
  {
    id: 'subagents',
    title: 'Subagents',
    beforeTokens: 12000,
    afterTokens: 4800,
    description: 'Delegue pesquisa ampla a Subagents e mantenha o chat principal enxuto.'
  },
  {
    id: 'model',
    title: 'Escolha de modelo',
    beforeTokens: 8000,
    afterTokens: 3200,
    description: 'Modelos menores ou Balance no Router para tarefas mecânicas; reserve modelos maiores para raciocínio difícil.'
  }
] as const
