export const CURSOR_LEARN = 'https://cursor.com/learn'
export const LEARN_TOOL_CALLING = 'https://cursor.com/learn/tool-calling'
export const LEARN_AGENTS = 'https://cursor.com/learn/agents'
export const LEARN_CUSTOMIZING = 'https://cursor.com/learn/customizing-agents'

export const LEARN_SNIPPETS = [
  {
    id: 'tools',
    title: 'Tool calling',
    href: LEARN_TOOL_CALLING,
    text: 'Cada definição de tool entra no input (centenas de tokens por tool) e o retorno da tool também enche o contexto.'
  },
  {
    id: 'agents',
    title: 'Agents',
    href: LEARN_AGENTS,
    text: 'Agent = tools em loop: muito mais caro que uma pergunta única, porque cada passo reenvia contexto.'
  },
  {
    id: 'custom',
    title: 'Customizing',
    href: LEARN_CUSTOMIZING,
    text: 'Rules ficam no contexto estático de toda conversa; Skills trazem só a descrição até serem usadas.'
  }
] as const

export type RuleSkillCase = {
  id: string
  prompt: string
  answer: 'rule' | 'skill'
  hint: string
}

export const RULE_SKILL_QUIZ: RuleSkillCase[] = [
  {
    id: 'lint',
    prompt: 'Sempre rodar typecheck após mudanças',
    answer: 'rule',
    hint: 'Convenção sempre ativa (customizing-agents).'
  },
  {
    id: 'deploy',
    prompt: 'Playbook de deploy para staging sob demanda',
    answer: 'skill',
    hint: 'Workflow especializado quando pedido.'
  },
  {
    id: 'header',
    prompt: 'Copyright em todo arquivo fonte',
    answer: 'rule',
    hint: 'Instrução persistente por conversa.'
  },
  {
    id: 'changelog',
    prompt: 'Gerar changelog de um release',
    answer: 'skill',
    hint: 'Tarefa pontual: docs sugerem skill, não subagent.'
  }
]
