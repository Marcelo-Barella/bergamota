# Bergamota

Personal portfolio site for **Marcelo Barella**, branded as **Bergamota**. Single-page Nuxt 4 app: hero, projects, and contact.

## Requirements

- Node.js (LTS recommended)
- npm

## Commands

| Script        | Action                    |
| ------------- | ------------------------- |
| `npm install` | Install dependencies      |
| `npm run dev` | Dev server (port 3027)    |
| `npm run build` | Production build        |
| `npm run preview` | Serve production build locally |

Dev server binds to `0.0.0.0:3027` per `nuxt.config.ts`.

## Stack

Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS 4, GSAP / nuxt-anime, `@nuxtjs/i18n`.

## Internationalization and routing

- URL strategy: `prefix_except_default` — English at `/` and `/projects/...`, Portuguese at `/pt-BR/` and `/pt-BR/projects/...`.
- SSR is enabled so the server renders the locale implied by the URL; use `useLocalePath()` (or `localePath` from `useLocalePath()`) for internal `NuxtLink` targets so links stay on the active locale.
- Locale cookie: `bergamota_locale` (set by the module’s `detectBrowserLanguage` on the root path). The client plugin `app/plugins/i18n-locale-persist.client.ts` mirrors the chosen locale to `localStorage` under the same key name.
- **Caveats:** Copy in Vue templates is still hard-coded English until messages are wired through `vue-i18n` keys. `nuxt preview` is not supported for this Vercel preset build; validate SSR via deploy or a local Nitro handler. If `app:mounted` syncs `localStorage` to a locale that disagrees with the URL, the plugin may navigate after hydration (rare if users stay on prefixed URLs).
