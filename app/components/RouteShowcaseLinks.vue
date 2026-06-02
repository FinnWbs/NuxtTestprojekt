<script setup lang="ts">
import type { ShowcaseRouteLink } from '~/types/showcase'

defineProps<{
  highlight: boolean
  links: ShowcaseRouteLink[]
}>()
</script>

<template>
  <section
    class="route-showcase"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="routes"
    aria-label="Nuxt-Routen ausprobieren"
  >
    <div>
      <p class="eyebrow">
        Routing-Showcase
      </p>
      <h2>Routen ausprobieren</h2>
      <p>
        Diese Links führen zu echten Nuxt-Routen: Page, dynamische Detailseite und Nitro-API.
      </p>
    </div>

    <div class="route-link-grid">
      <template
        v-for="link in links"
        :key="link.to"
      >
        <a
          v-if="link.external"
          class="route-link-card"
          :href="link.to"
        >
          <span>{{ link.eyebrow }}</span>
          <strong>{{ link.label }}</strong>
          <small>{{ link.description }}</small>
        </a>

        <NuxtLink
          v-else
          class="route-link-card"
          :to="link.to"
        >
          <span>{{ link.eyebrow }}</span>
          <strong>{{ link.label }}</strong>
          <small>{{ link.description }}</small>
        </NuxtLink>
      </template>
    </div>
  </section>
</template>
