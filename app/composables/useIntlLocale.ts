export function useIntlBcp47() {
  const { locale, localeProperties } = useI18n()
  return computed(() => {
    const lang = localeProperties.value?.language
    if (typeof lang === 'string' && lang.length > 0) {
      return lang
    }
    const code = unref(locale)
    if (code === 'pt-BR') {
      return 'pt-BR'
    }
    if (code === 'en') {
      return 'en-US'
    }
    return String(code)
  })
}

export function useFormattedDateTime() {
  const bcp47 = useIntlBcp47()
  function format(
    input: Date | number | string,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
  ) {
    const date = input instanceof Date ? input : new Date(input)
    return new Intl.DateTimeFormat(bcp47.value, options).format(date)
  }
  return { format, bcp47 }
}

export function useFormattedNumber() {
  const bcp47 = useIntlBcp47()
  function format(value: number, options?: Intl.NumberFormatOptions) {
    return new Intl.NumberFormat(bcp47.value, options).format(value)
  }
  return { format, bcp47 }
}
