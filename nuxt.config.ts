import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'vercel'
  },
  devtools: { enabled: false },
  devServer: {
    host: '0.0.0.0',
    port: 3027
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['bergamota.dev']
    }
  },
  ssr: false,
  app: {
    head: {
      title: 'Marcelo Barella — Bergamota',
      meta: [
        {
          name: 'description',
          content:
            'Portfolio of Marcelo Barella: Bergamota — product engineering, design-minded builds, and selected work.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Space+Grotesk:wght@300;400;700&family=Syne:wght@400;700;800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@hypernym/nuxt-gsap', '@hypernym/nuxt-anime', '@nuxt/ui'],
  colorMode: {
    preference: 'dark'
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true
    }
  }
})
