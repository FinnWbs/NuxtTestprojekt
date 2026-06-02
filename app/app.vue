<script setup lang="ts">
useSeoMeta({
  titleTemplate: (title) => (
    title ? `${title} | Nuxt Showcase` : 'Nuxt Showcase'
  ),
  ogSiteName: 'Nuxt Showcase'
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
