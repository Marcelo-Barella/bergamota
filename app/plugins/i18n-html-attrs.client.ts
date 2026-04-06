export default defineNuxtPlugin({
  name: 'i18n-html-attrs',
  dependsOn: ['i18n:plugin'],
  setup() {
    useLocaleHead({ dir: true, lang: true, seo: true })
  },
})
