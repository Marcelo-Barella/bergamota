export interface ProjectItem {
  id: string
  title: string
  description: string
  repoUrl: string
  imageSrc: string
  imageAlt: string
  caseTeaser?: string
}

export const projects: ProjectItem[] = [
  {
    id: 'tangerina',
    title: 'Tangerina',
    description: 'Design-minded product surface and supporting tooling.',
    repoUrl: 'https://github.com',
    imageSrc: '/images/projects/tangerina.svg',
    imageAlt: 'Tangerina project mark',
    caseTeaser: 'Brand and product rhythm for a small studio site.'
  },
  {
    id: 'cursor-sync',
    title: 'Cursor Sync',
    description: 'Workflow glue for keeping local and shared context aligned.',
    repoUrl: 'https://github.com',
    imageSrc: '/images/projects/cursor-sync.png',
    imageAlt: 'Cursor Sync project preview',
    caseTeaser: 'Shipping reliable sync paths without noisy UI.'
  },
  {
    id: 'cursor-ca-orchestrator',
    title: 'Cursor CA Orchestrator',
    description: 'Orchestration layer for multi-step agent runs.',
    repoUrl: 'https://github.com',
    imageSrc: '/images/projects/cursor-ca-orchestrator.png',
    imageAlt: 'Cursor CA Orchestrator project preview',
    caseTeaser: 'Clear beats between agent phases, minimal surprise.'
  },
  {
    id: 'agentic-browser-ai',
    title: 'Agentic Browser AI',
    description: 'Exploring browser-native affordances for agentic tasks.',
    repoUrl: 'https://github.com',
    imageSrc: '/images/projects/agentic-browser-ai.png',
    imageAlt: 'Agentic Browser AI project preview',
    caseTeaser: 'Keeping the page content-forward while agents work.'
  },
  {
    id: 'ai-sdk-prototype',
    title: 'AI SDK Prototype',
    description: 'Fast iteration on model calls and structured outputs.',
    repoUrl: 'https://github.com',
    imageSrc: '/images/projects/ai-sdk-prototype.png',
    imageAlt: 'AI SDK prototype project preview',
    caseTeaser: 'Typed boundaries around experimental model flows.'
  }
]
