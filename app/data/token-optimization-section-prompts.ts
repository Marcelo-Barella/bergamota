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
    title: 'A porta tem tranca',
    preset:
      'Explique em uma frase por que o que não entra não gasta a janela, sem copiar o texto da página.',
    chat: 'A porta tem tranca'
  },
  {
    id: 'ensaio',
    title: 'O ensaio da contenção',
    preset:
      'Explique em uma frase a passagem da porta fechada até o bilhete na fresta, sem copiar o texto da página.',
    chat: 'O ensaio da contenção'
  },
  {
    id: 'confirmar',
    title: 'Confirmar antes',
    preset:
      'Explique em uma frase por que uma ferramenta cara pede confirmação antes de escrever no chat, sem copiar o texto da página.',
    chat: 'Confirmar antes'
  },
  {
    id: 'bloquear',
    title: 'Bloquear o que é arriscado',
    preset:
      'Explique em uma frase por que o shell local e a ferramenta remota ficam com ferrolho duplo, sem copiar o texto da página.',
    file: 'app/data/token-optimization-mcp.ts',
    chat: 'Bloquear o que é arriscado'
  },
  {
    id: 'sala-quieta',
    title: 'Sala quieta',
    preset:
      'Explique em uma frase por que uma bandeja de ferramentas vazia deixa a resposta do modelo curta, sem copiar o texto da página.',
    chat: 'Sala quieta'
  },
  {
    id: 'epilogo',
    title: 'A tranca é parte da frase',
    preset:
      'Explique em uma frase por que saber fechar a porta faz parte da frase, sem copiar o texto da página.',
    chat: 'A tranca é parte da frase'
  }
]

export function sectionPromptById(id: string): SectionAgentPrompt | undefined {
  return sectionAgentPrompts.find((entry) => entry.id === id)
}
