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

const sectionIds = [
  'inicio',
  'hoje',
  'cursor',
  'agente',
  'token',
  'tipos',
  'preco',
  'conversa',
  'contexto',
  'anel',
  'arroba',
  'rules',
  'ignore',
  'skills',
  'mcp',
  'batedor',
  'ensaio',
  'confirmar',
  'bloquear',
  'sala-quieta',
  'epilogo'
] as const

const sectionFiles: Partial<Record<(typeof sectionIds)[number], string>> = {
  arroba: 'app/pages/thoughts/token-efficiency.vue',
  bloquear: 'app/data/token-optimization-mcp.ts',
  mcp: 'app/data/token-optimization-mcp.ts'
}

const sectionRuleIds = new Set<(typeof sectionIds)[number]>(['rules'])
const sectionSkillIds = new Set<(typeof sectionIds)[number]>(['skills'])

export function warmSectionPromptKeys(translate: (key: string) => string) {
  for (const id of sectionIds) {
    translate(`thoughts.prompts.${id}.title`)
    translate(`thoughts.prompts.${id}.preset`)
    translate(`thoughts.prompts.${id}.chat`)
    if (sectionRuleIds.has(id)) {
      translate(`thoughts.prompts.${id}.rule`)
    }
    if (sectionSkillIds.has(id)) {
      translate(`thoughts.prompts.${id}.skill`)
    }
  }
}

export function sectionPromptById(
  id: string,
  translate: (key: string) => string
): SectionAgentPrompt | undefined {
  if (!sectionIds.includes(id as (typeof sectionIds)[number])) {
    return undefined
  }
  const key = id as (typeof sectionIds)[number]
  const file = sectionFiles[key]
  const rule = sectionRuleIds.has(key) ? translate(`thoughts.prompts.${id}.rule`) : undefined
  const skill = sectionSkillIds.has(key) ? translate(`thoughts.prompts.${id}.skill`) : undefined
  return {
    id,
    title: translate(`thoughts.prompts.${id}.title`),
    preset: translate(`thoughts.prompts.${id}.preset`),
    chat: translate(`thoughts.prompts.${id}.chat`),
    ...(file ? { file } : {}),
    ...(rule ? { rule } : {}),
    ...(skill ? { skill } : {})
  }
}
