import type { H3Event } from 'h3'
import { tryCookieLocale, tryHeaderLocale } from '@intlify/utils/h3'
import { parseAcceptLanguage } from '@intlify/utils'
import { findBrowserLocale } from '#i18n-kit/browser'

const COOKIE_NAME = 'i18n_redirected'

const browserLocales = [
  { code: 'en', language: 'en-US' },
  { code: 'pt-BR', language: 'pt-BR' },
]

function localeFromPath(event: H3Event): string | null {
  const path = (event.path?.split('?')[0] ?? '').replace(/\/+$/, '') || '/'
  if (path === '/pt-BR' || path.startsWith('/pt-BR/')) {
    return 'pt-BR'
  }
  return null
}

export default defineI18nLocaleDetector((event, config) => {
  const pathLocale = localeFromPath(event)
  if (pathLocale) {
    return pathLocale
  }

  const cookieLocale = tryCookieLocale(event, { lang: 'en-US', name: COOKIE_NAME })
  if (cookieLocale) {
    const code = cookieLocale.toString()
    if (code === 'en' || code === 'pt-BR') {
      return code
    }
  }

  const headerParser = (value: string) => [
    findBrowserLocale(browserLocales, parseAcceptLanguage(value)),
  ]
  const headerLocale = tryHeaderLocale(event, { lang: 'en-US', parser: headerParser })
  if (headerLocale) {
    const code = headerLocale.toString()
    if (code === 'en' || code === 'pt-BR') {
      return code
    }
  }

  return String(config.defaultLocale)
})
