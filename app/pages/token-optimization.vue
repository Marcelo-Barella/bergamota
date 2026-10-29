<script setup lang="ts">
definePageMeta({
  layout: false
})

const localePath = useLocalePath()

await navigateTo(localePath('/thoughts/token-efficiency'), { redirectCode: 301 })
</script>

<template>
  <div />
</template>
