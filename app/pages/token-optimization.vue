<script setup lang="ts">
definePageMeta({
  layout: false
})

const localePath = useLocalePath()
const { t } = useI18n()

useHead({
  title: () => t('thoughts.lesson.metaTitle')
})

await navigateTo(localePath('/thoughts/token-efficiency'), { redirectCode: 301 })
</script>

<template>
  <div />
</template>
