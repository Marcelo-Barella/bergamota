declare module 'vue-i18n' {
  export interface DefineLocaleMessage {
    app: { title: string }
    plural: { demo: string }
    common: Record<string, string>
    errors: Record<string, string>
    layout: Record<string, string>
    projectsData: Record<string, Record<string, string>>
    home: Record<string, unknown>
    projectPages: Record<string, Record<string, unknown>>
  }
}

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  missing: (locale, key) => {
    if (import.meta.dev) {
      console.warn(`[i18n] missing key "${key}" (locale: ${locale})`)
    }
    return key
  },
  missingWarn: import.meta.dev,
  fallbackWarn: import.meta.dev,
  datetimeFormats: {
    en: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    'pt-BR': {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
  numberFormats: {
    en: {
      currency: { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' },
      decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      percent: { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 2 },
    },
    'pt-BR': {
      currency: { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' },
      decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      percent: { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 2 },
    },
  },
}))
