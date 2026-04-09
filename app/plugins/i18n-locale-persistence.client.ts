const STORAGE_KEY = 'bergamota_i18n_locale'

export default defineNuxtPlugin({
  name: 'i18n-locale-persistence',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const { locale, setLocale } = nuxtApp.$i18n

    const readStored = (): string | null => {
      try {
        return localStorage.getItem(STORAGE_KEY)
      } catch {
        return null
      }
    }

    const writeStored = (code: string) => {
      try {
        localStorage.setItem(STORAGE_KEY, code)
      } catch {
        /* ignore quota / private mode */
      }
    }

    const supported = new Set(nuxtApp.$i18n.localeCodes.value as string[])

    const stored = readStored()
    if (stored && supported.has(stored) && stored !== locale.value) {
      await setLocale(stored)
    }

    watch(
      locale,
      (code) => {
        if (supported.has(code)) {
          writeStored(code)
        }
      },
      { immediate: true },
    )
  },
})
