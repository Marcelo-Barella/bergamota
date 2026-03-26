export type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  body: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Vue 3 Composition API',
    excerpt: 'Learn the basics of Composition API.',
    date: '2026-02-20',
    body: 'The Composition API groups related logic with `setup()` and reactive refs. Start with `ref` and `reactive`, then extract reusable logic into composables.'
  },
  {
    id: 2,
    title: 'Nuxt 4 Routing',
    excerpt: 'Advanced routing techniques in Nuxt 4.',
    date: '2026-02-22',
    body: 'File-based routes under `app/pages` map to URLs. Dynamic segments use bracket folders such as `blog/[id].vue` for `/blog/:id`.'
  },
  {
    id: 3,
    title: 'Design Tokens',
    excerpt: 'Using CSS variables for consistent design.',
    date: '2026-02-25',
    body: 'Define tokens as custom properties on `:root` and reference them in components. Keeps themes and spacing consistent without scattering magic values.'
  }
]
