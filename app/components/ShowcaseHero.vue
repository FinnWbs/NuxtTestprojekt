<script setup lang="ts">
defineProps<{
  featureTags: string[]
  heroCollapsed: boolean
  highlight: boolean
  isHydrated: boolean
}>()

defineEmits<{
  start: []
}>()
</script>

<template>
  <section
    class="hero"
    :class="{ 'is-spotlit': highlight, 'hero-collapsed': heroCollapsed }"
    data-tour-target="hero"
  >
    <div class="hero-copy">
      <p class="eyebrow">
        Nuxt.js Feature-Showcase
      </p>
      <h1>
        <span>Aufgaben-</span>
        <span>Spotlight</span>
      </h1>
      <p class="hero-text">
        Eine kompakte Aufgaben-App, die Nuxt-Rendering, Vue-Reaktivität,
        berechnete Daten, Client-Persistenz und Entwicklerwerkzeuge in einer geführten Tour zeigt.
      </p>
      <div class="hero-actions">
        <button
          class="primary-button"
          type="button"
          @click="$emit('start')"
        >
          Spotlight starten
        </button>
        <NuxtLink class="secondary-button" to="/routing">
          Routing-Demo öffnen
        </NuxtLink>
        <span class="hydration-pill">
          {{ isHydrated ? 'Hydriert und interaktiv' : 'Nuxt-Shell wird gerendert' }}
        </span>
      </div>
    </div>

    <div class="feature-strip" aria-label="Nuxt-Features, die diese App zeigt">
      <span
        v-for="tag in featureTags"
        :key="tag"
      >
        {{ tag }}
      </span>
    </div>
  </section>
</template>
