export interface Project {
  id: string
  title: string
  description: string
  repoUrl: string
  imageSrc: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    id: 'tangerina',
    title: 'Tangerina',
    description:
      'A conversational assistant that weaves chat, voice, and music context into a single calm surface.',
    repoUrl: 'https://github.com/Marcelo-Barella/tangerina',
    imageSrc: '/images/projects/tangerina.svg',
    imageAlt: 'Abstract illustration of a chat, voice, and music assistant in warm neutrals and amber accents.'
  }
]
