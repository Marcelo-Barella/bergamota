export default defineNuxtPlugin(() => {
  const { t } = useI18n()
  useHead(() => ({
    title: t('meta.title'),
    meta: [{ name: 'description', content: t('meta.description') }]
  }))
})
