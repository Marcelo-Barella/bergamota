export const CURSOR_TOKEN_EFFICIENCY_POST =
  'https://cursor.com/blog/improved-token-efficiency'

export type BlogFigure = {
  id: string
  label: string
  quote: string
  href: string
}

export const BLOG_FIGURES: Record<string, BlogFigure> = {
  overall7: {
    id: 'overall7',
    label: '−7% custo de tokens',
    quote: 'Changes across each of these layers reduced token costs for users by 7% without reducing agent quality.',
    href: CURSOR_TOKEN_EFFICIENCY_POST
  },
  systemTrim66: {
    id: 'systemTrim66',
    label: '~66% system prompt',
    quote: 'allowing us to trim roughly 66% of our system prompt.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#trimming-the-system-prompt`
  },
  toolsUnder20: {
    id: 'toolsUnder20',
    label: '<20% conversas',
    quote: 'each is needed in fewer than 20% of conversations.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#loading-tools-only-when-needed`
  },
  mcpDynamic469: {
    id: 'mcpDynamic469',
    label: '−46,9% tokens (MCP)',
    quote:
      'This reduced total tokens by 46.9% across sessions that called an MCP tool.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#loading-tools-only-when-needed`
  },
  builtinOffload60: {
    id: 'builtinOffload60',
    label: '−60% defs estáticas',
    quote: 'Offloading built-in tools cut static-context description tokens by 60%',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#loading-tools-only-when-needed`
  },
  cacheCold20: {
    id: 'cacheCold20',
    label: '−20% cold cache misses',
    quote: 'These changes reduced the rate of cold cache misses by 20%.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#improving-cache-reuse`
  },
  readCompress16: {
    id: 'readCompress16',
    label: '−1,6% cache-read',
    quote: 'the change reduced cache-read tokens by 1.6% with no reduction in quality.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#compressing-file-reads`
  },
  lineEvery10: {
    id: 'lineEvery10',
    label: '1 em 10 linhas',
    quote: 'We reduced that overhead by including line numbers only on every tenth line.',
    href: `${CURSOR_TOKEN_EFFICIENCY_POST}#compressing-file-reads`
  }
}
