import type { AcpPublicEvent } from './manager'

export function getFallbackAcpEvents(prompt: string): AcpPublicEvent[] {
  const base = Date.now()
  return [
    {
      type: 'session_update',
      at: base,
      payload: {
        update: {
          sessionUpdate: 'agent_thinking',
          text: 'Analisando o prompt do workshop (simulação local — instale o Cursor CLI no VPS para ACP real).'
        }
      }
    },
    {
      type: 'session_update',
      at: base + 120,
      payload: {
        update: {
          sessionUpdate: 'agent_message_chunk',
          content: { text: 'Dica: prompts curtos e contexto selecionado reduzem tokens.\n' }
        }
      }
    },
    {
      type: 'session_update',
      at: base + 200,
      payload: {
        update: {
          sessionUpdate: 'file_edit',
          path: 'src/exemplo.ts',
          operation: 'replace_range',
          preview: '-  for (let i = 0; i < len - 1; i++)\n+  for (let i = 0; i < len; i++)'
        }
      }
    },
    {
      type: 'session_update',
      at: base + 240,
      payload: {
        update: {
          sessionUpdate: 'tool_call',
          name: 'read',
          status: 'completed',
          args: { path: 'exemplo.ts' },
          result: { preview: '// trecho relevante apenas' }
        }
      }
    },
    {
      type: 'token_usage',
      at: base + 360,
      payload: {
        inputTokens: 620,
        outputTokens: 88,
        totalTokens: 708,
        source: 'estimate',
        unconfirmed: true,
        promptPreview: prompt.slice(0, 80)
      }
    },
    {
      type: 'session_update',
      at: base + 400,
      payload: {
        update: {
          sessionUpdate: 'agent_message_chunk',
          content: {
            text: `Seu prompt tinha ~${prompt.length} caracteres. No modo live, o Cursor Agent envia thinking, tool calls e usage via ACP.`
          }
        }
      }
    }
  ]
}
