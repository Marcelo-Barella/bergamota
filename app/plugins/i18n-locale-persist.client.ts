const STORAGE_KEY = 'bergamota_locale'

function readCookieLocale(key: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }
  for (const part of document.cookie.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) {
      continue
    }
    const k = part.slice(0, idx).trim()
    if (k === key) {
      return decodeURIComponent(part.slice(idx + 1).trim())
    }
  }
  return null
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {
      /* ignore */
    }
  })

  nuxtApp.hook('app:mounted', async () => {
    const fromCookie = readCookieLocale(STORAGE_KEY)
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      stored = null
    }
    const chosen = fromCookie || stored
    if (!chosen) {
      return
    }
    await nuxtApp.runWithContext(async () => {
      const { locale, locales, setLocale } = useI18n()
      const codes = locales.value.map((l) => (typeof l === 'string' ? l : l.code))
      if (codes.includes(chosen) && chosen !== locale.value) {
        await setLocale(chosen)
      }
    })
  })
})
