export type SectionAgentPrompt = {
  id: string
  title: string
  preset: string
  file?: string
  chat: string
  rule?: string
  skill?: string
}

export type DrawerPhase = 'closed' | 'opening' | 'open'
export type SendPhase = 'idle' | 'sending' | 'failed'

export const sectionAgentPrompts: SectionAgentPrompt[] = [
  {
    id: 'inicio',
    title: 'A janela é uma sala',
    preset:
      'Explique em uma frase o que significa tratar a janela de contexto como uma sala finita, sem copiar o texto da página.',
    chat: 'A janela é uma sala'
  },
  {
    id: 'um-token-nao-e-uma-palavra',
    title: 'Um token não é uma palavra',
    preset:
      'Explique em uma frase por que token não equivale a palavra inteira, sem copiar o texto da página.',
    chat: 'Um token não é uma palavra'
  },
  {
    id: 'regras-na-parede',
    title: 'Regras na parede',
    preset:
      'Explique em uma frase por que regras fixas devem ficar na parede do system prompt, sem copiar o texto da página.',
    file: 'app/data/token-optimization-rules.ts',
    chat: 'Regras na parede',
    rule: 'token-optimization-rules'
  },
  {
    id: 'caixa-fechada',
    title: 'Caixa fechada',
    preset:
      'Explique em uma frase a metáfora da caixa fechada versus despejar páginas no chão, sem copiar o texto da página.',
    chat: 'Caixa fechada'
  },
  {
    id: 'o-que-a-ferramenta-traz',
    title: 'O que a ferramenta traz',
    preset:
      'Explique em uma frase como tool calls podem inflar o contexto com payload desnecessário, sem copiar o texto da página.',
    file: 'app/data/token-optimization-mcp.ts',
    chat: 'O que a ferramenta traz'
  },
  {
    id: 'o-scroll-esvazia-a-sala',
    title: 'O scroll esvazia a sala',
    preset:
      'Explique em uma frase por que o scroll tira a mobília descartável e deixa a placa e o bilhete, sem copiar o texto da página.',
    chat: 'O scroll esvazia a sala'
  },
  {
    id: 'compactar',
    title: 'Compactar',
    preset:
      'Explique em uma frase por que sintetizar turnos antigos libera chão na sala, sem copiar o texto da página.',
    chat: 'Compactar'
  },
  {
    id: 'conclusao-da-aula',
    title: 'Conclusão da aula',
    preset:
      'Explique em uma frase a ideia de mobiliar uma sala finita com prompts, sem copiar o texto da página.',
    chat: 'Conclusão da aula'
  }
]

export function sectionPromptById(id: string): SectionAgentPrompt | undefined {
  return sectionAgentPrompts.find((entry) => entry.id === id)
}
