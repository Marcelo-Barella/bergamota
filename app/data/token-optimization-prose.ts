import type { WorkshopLevelId } from '~/data/token-optimization-levels'

export type ProseBlock = {
  paragraphs: string[]
}

export const INTRO_CONTEXT_PROSE: ProseBlock = {
  paragraphs: [
    'Contexto é tudo o que o modelo enxerga num turno: instruções do sistema, Rules, histórico, arquivos anexados e saídas de tools, tudo virando tokens dentro de uma janela finita (no Cursor, pense na janela do <strong>Composer-2.5</strong>).',
    'Quando a janela enche, o produto precisa resumir ou compactar; detalhes somem e a qualidade cai. Por isso cada nível abaixo é uma tática para caber mais trabalho em menos tokens.',
    'Abrir um <strong>chat novo</strong> zera o histórico: um pedido isolado costuma gastar muito menos do que vários turnos no mesmo fio. Isso já é otimização, antes de qualquer truque avançado.',
    'Referência: <a href="https://cursor.com/learn" target="_blank" rel="noopener">Cursor Learn</a> e <a href="https://cursor.com/learn/tool-calling" target="_blank" rel="noopener">tool calling</a>.'
  ]
}

export const TOKEN_SPLITTER_PROSE: ProseBlock = {
  paragraphs: [
    'Token é a unidade de cobrança e de limite. Texto longo = mais tokens; respostas do modelo também contam na fatura.',
    'No painel, digite uma frase e veja a estimativa (tokenizer cl100k_base) e um custo ilustrativo de entrada vs saída para <strong>Composer-2.5</strong> conforme <a href="https://cursor.com/docs/models" target="_blank" rel="noopener">preços publicados</a>.'
  ]
}

export const PRICING_PROSE: ProseBlock = {
  paragraphs: [
    'Otimizar não é só “gastar menos tokens”: é empurrar trabalho para <strong>cache</strong> (entrada repetida mais barata), reduzir <strong>input</strong> fresco e enxugar <strong>output</strong>.',
    'Você paga entrada e saída; saída costuma ser várias vezes mais cara que entrada no mesmo modelo. Cache read (quando aplicável) reduz o custo da parte repetida do prompt.',
    'Use o painel com os valores de <strong>Composer-2.5</strong> em <a href="https://cursor.com/docs/models" target="_blank" rel="noopener">cursor.com/docs/models</a> ($0,50/M input, $0,20/M cache read, $2,50/M output).'
  ]
}

export const LEARN_CUSTOM_PROSE: ProseBlock = {
  paragraphs: [
    '<strong>Tool calling</strong> (<a href="https://cursor.com/learn/tool-calling" target="_blank" rel="noopener">learn</a>): cada definição de tool ocupa centenas de tokens no input; cada resultado de tool volta para o contexto.',
    '<strong>Agents</strong> (<a href="https://cursor.com/learn/agents" target="_blank" rel="noopener">learn</a>): agente = tools em loop: muito mais tokens que uma pergunta única, porque o contexto é reenviado a cada passo.',
    '<strong>Customizing</strong> (<a href="https://cursor.com/learn/customizing-agents" target="_blank" rel="noopener">learn</a>): Rules entram como contexto estático em toda conversa; Skills carregam só a descrição até serem relevantes ou invocadas.',
    '<table class="ws-prose-table"><thead><tr><th></th><th>Rules</th><th>Skills</th></tr></thead><tbody><tr><td>Quando carrega</td><td>Toda conversa (tipos variam)</td><td>Sob demanda</td></tr><tr><td>Melhor para</td><td>Convenções fixas</td><td>Fluxos especializados</td></tr><tr><td>Custo de contexto</td><td>Sempre presente se aplicada</td><td>Descrição leve; corpo sob demanda</td></tr></tbody></table>'
  ]
}

export const RULES_PROSE: ProseBlock = {
  paragraphs: [
    'Rules vivem em <code>.cursor/rules</code> (<a href="https://cursor.com/docs/rules" target="_blank" rel="noopener">docs</a>). Comece simples: adicione regra só quando o agente repetir o mesmo erro (<a href="https://cursor.com/blog/agent-best-practices" target="_blank" rel="noopener">agent best practices</a>).',
    'Mantenha focadas, com menos de 500 linhas, apontando <code>@arquivo</code> em vez de colar conteúdo. Evite “escreva código limpo” ou style guide inteiro em Always Apply.',
    'Team Rules e <code>AGENTS.md</code> existem. Comece mínimo e cresça com erros reais. A ordem de custo por tipo (Always &gt; Glob &gt; Apply Intelligently &gt; Manual @) é <em>dedução nossa</em>, não documentada assim na Cursor.'
  ]
}

export const SKILLS_PROSE: ProseBlock = {
  paragraphs: [
    'Skills seguem o padrão aberto em <code>.cursor/skills/&lt;name&gt;/SKILL.md</code> (<a href="https://cursor.com/docs/skills" target="_blank" rel="noopener">docs</a>). No contexto estático ficam nome e descrição; o resto carrega sob demanda (<a href="https://cursor.com/blog/dynamic-context-discovery" target="_blank" rel="noopener">dynamic context</a>).',
    'Diferente de Rules “sempre incluídas”, Skills são dinâmicas (<a href="https://cursor.com/blog/agent-best-practices" target="_blank" rel="noopener">agent best practices</a>). Skill fixada em Custom Mode se comporta como Rule em custo.',
    'Crie com <code>/create-skill</code> ou migre com <code>/migrate-to-skills</code> quando fizer sentido.'
  ]
}

export const MCP_PROSE: ProseBlock = {
  paragraphs: [
    'MCP conecta o agente a sistemas externos (protocolo aberto em <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">modelcontextprotocol.io</a>). Muitas tools com descrições longas incham o contexto; a Cursor passou a carregar só nomes e buscar o resto sob demanda (<a href="https://cursor.com/blog/dynamic-context-discovery" target="_blank" rel="noopener">−46,9% tokens em runs que chamaram MCP</a>, não economia geral).',
    'Desligue servidores ociosos, use <code>.cursor/mcp.json</code> por projeto e prefira tools que filtram/paginam. Servidor parado hoje custa ~10 tokens por nome vs ~800 por definição completa (<em>estimativa nossa</em>). O motivo para manter só o necessário mudou de tokens para ruído, processos e escolha errada de tool.',
    'Medições Anthropic em setups grandes: ~55K tokens só em defs de 58 tools (<a href="https://www.anthropic.com/engineering/advanced-tool-use" target="_blank" rel="noopener">advanced tool use</a>); code execution com MCP reporta 150K→2K tokens (<a href="https://www.anthropic.com/engineering/code-execution-with-mcp" target="_blank" rel="noopener">post</a>).'
  ]
}

export const SUBAGENTS_PROSE: ProseBlock = {
  paragraphs: [
    'Subagents são assistentes especializados com janela própria; devolvem um resumo ao pai (<a href="https://cursor.com/docs/subagents" target="_blank" rel="noopener">docs</a>). Contexto limpo: lixo intermediário fica dentro do subagent; herdam tools e MCP.',
    'Modelo padrão <code>inherit</code>; Explore usa modelo mais rápido. O post de eficiência sugere planejador caro + implementador mais barato quando o harness direciona modelos (<a href="https://cursor.com/blog/improved-token-efficiency" target="_blank" rel="noopener">set/2026</a>).',
    'Paralelizar multiplica tokens (~5× com cinco em paralelo, ilustrativo): o ganho é isolamento de contexto, não velocidade. Defina em <code>.cursor/agents/*.md</code> com <code>/name</code> ou linguagem natural; built-ins Explore e Browser.',
    'Economiza com muito lixo intermediário ou modelo mais barato no filho; custa mais em paralelo ou em tarefas simples (use Skill).'
  ]
}

export const LEVEL_PROSE: Record<WorkshopLevelId, ProseBlock> = {
  0: {
    paragraphs: [
      'Nível <strong>Base</strong>: meça texto com tokenizer e enxergue a barra lateral como a janela do <strong>Composer-2.5</strong> (~200k de referência).',
      'Interaja: digite no painel e observe tokens e a barra de contexto do nível.'
    ]
  },
  1: {
    paragraphs: [
      '<strong>Decisão simples</strong>: um pedido, uma ação verificável: menos narrativa no prompt.',
      'Compare verboso vs conciso e, se houver chave no servidor, meça com o SDK no painel.'
    ]
  },
  2: {
    paragraphs: [
      '<strong>Múltipla escolha</strong>: opções A/B/C no prompt em vez de parágrafo aberto reduzem tokens e ambiguidade.'
    ]
  },
  3: {
    paragraphs: [
      '<strong>Critérios fixos</strong>: Rules persistentes evitam repetir convenções. O harness da Cursor também enxugou o system prompt (~66% no post de <a href="https://cursor.com/blog/improved-token-efficiency" target="_blank" rel="noopener">eficiência set/2026</a>).',
      'Do nível 3 em diante há chat de prática com <strong>Composer-2.5</strong> (servidor) no painel.'
    ]
  },
  4: {
    paragraphs: [
      '<strong>Confirmar antes</strong>: planos e confirmação evitam dumps de tools caras no contexto. Skills entram aqui no fluxo do lab (carregamento sob demanda).'
    ]
  },
  5: {
    paragraphs: [
      '<strong>Roteamento</strong> e <strong>MCP</strong>: carregue integrações só quando precisar; nomes no estático, defs sob demanda (<a href="https://cursor.com/blog/dynamic-context-discovery" target="_blank" rel="noopener">Cursor</a>).'
    ]
  },
  6: {
    paragraphs: [
      '<strong>Guardrails</strong>: bloqueie tools arriscadas; built-in offloaded cortou ~60% das defs estáticas no <a href="https://cursor.com/blog/improved-token-efficiency" target="_blank" rel="noopener">post set/2026</a>.'
    ]
  },
  7: {
    paragraphs: [
      '<strong>Hora de compactar</strong>: prefixo estável e cache breakpoints reduziram cold cache misses em ~20% no mesmo post. Ajuste thresholds na barra lateral.'
    ]
  },
  8: {
    paragraphs: [
      '<strong>Leitura barata</strong>: resumo/diff em vez de arquivo inteiro; leitura com numeração 1 em 10 linhas economizou cache-read (~1,6% no post).'
    ]
  },
  9: {
    paragraphs: [
      '<strong>Arquivos em escala</strong>: filtre em paralelo antes do Read para não inundar a janela.'
    ]
  },
  10: {
    paragraphs: [
      '<strong>Agêntico</strong>: Subagents, Cloud Agents e stream ACP. Veja também a seção Subagents após MCP para o mergulho completo.'
    ]
  }
}
