<script setup lang="ts">
definePageMeta({
  layout: false
})

const localePath = useLocalePath()
const { t, locale } = useI18n()

useHead({
  title: () =>
    locale.value === 'pt-BR'
      ? 'Otimização de tokens: Bergamota'
      : 'Token optimization: Bergamota',
  meta: [
    {
      name: 'description',
      content: () => t('thoughts.lesson.metaDescription')
    }
  ],
  htmlAttrs: { class: 'dark' }
})

await navigateTo(localePath('/thoughts/token-efficiency'), { redirectCode: 301 })
</script>

<template>
  <div />
</template>
