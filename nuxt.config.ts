import tailwindcss from "@tailwindcss/vite"

const nitroPreset = process.env.NITRO_PRESET || 'vercel'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    cursorApiKey: process.env.CURSOR_API_KEY || '',
    acpGatewayUrl: process.env.CURSOR_ACP_GATEWAY_URL || 'http://127.0.0.1:8000',
    acpBearerToken: '',
    tokenOptimizationPerIpLimit: Number(process.env.TOKEN_LAB_PER_IP_PER_MIN || 8),
    tokenOptimizationGlobalLimit: Number(process.env.TOKEN_LAB_GLOBAL_PER_MIN || 80),
    tokenLabDailyCap: Number(process.env.TOKEN_LAB_DAILY_CAP || 200),
    tokenOptimizationMaxOutputChars: 600,
    acpEnabled: process.env.ACP_ENABLED === 'true',
    public: {
      tokenOptimizationDefaultModel: 'composer-2.5',
      tokenOptimizationContextWindow: 200000,
      acpEnabled: process.env.ACP_ENABLED === 'true'
    }
  },
  nitro: {
    preset: nitroPreset,
    externals: {
      traceInclude: ['@cursor/sdk/**', '@cursor/sdk--*/**']
    }
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
  ssr: true,
  app: {
    head: {
      title: 'Marcelo Barella: Bergamota',
      meta: [
        {
          name: 'description',
          content:
            'Marcelo Barella (Bergamota): AI tools and workflows that ship: portfolio, projects, and how to get in touch.'
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
  modules: ['@hypernym/nuxt-gsap', '@hypernym/nuxt-anime', '@nuxt/ui', '@nuxtjs/i18n'],
  i18n: {
    restructureDir: 'i18n',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://bergamota.dev',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'pt-BR', language: 'pt-BR', name: 'Português (Brasil)', file: 'pt-BR.json' },
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    experimental: {
      localeDetector: 'locale-detector.ts',
    },
  },
  colorMode: {
    preference: 'dark'
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true
    }
  }
})
