import type { H3Event } from 'h3'
import { getRequestHeader } from 'h3'
import { parseAcceptLanguage } from '@intlify/utils'
import { tryCookieLocale } from '@intlify/utils/h3'
import { findBrowserLocale } from '#i18n-kit/browser'
import { getLocaleFromRoute } from '#i18n-kit/routing'
import { normalizedLocales } from '#internal/i18n-options.mjs'

const COOKIE_KEY = 'bergamota_i18n_redirected'

export default function localeDetector(
  event: H3Event,
  config: { defaultLocale: string; fallbackLocale: string | false },
): string {
  const fromRoute = getLocaleFromRoute(event.path)
  if (fromRoute && normalizedLocales.some((l) => l.code === fromRoute)) {
    return fromRoute
  }

  const fromCookie = tryCookieLocale(event, { lang: '', name: COOKIE_KEY })
  const cookieCode = fromCookie?.toString()
  if (cookieCode && normalizedLocales.some((l) => l.code === cookieCode)) {
    return cookieCode
  }

  const headerLocales = parseAcceptLanguage(getRequestHeader(event, 'accept-language') || '')
  const fromHeader = findBrowserLocale(
    normalizedLocales.map((l) => ({ code: l.code, language: l.language ?? l.code })),
    headerLocales,
  )
  if (fromHeader && normalizedLocales.some((l) => l.code === fromHeader)) {
    return fromHeader
  }

  if (config.fallbackLocale && normalizedLocales.some((l) => l.code === config.fallbackLocale)) {
    return String(config.fallbackLocale)
  }

  return config.defaultLocale
}
