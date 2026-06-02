<script setup lang="ts">
import { routingTourSteps } from '~/data/routeShowcaseContent'

type Feature = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  details: string
}

definePageMeta({
  title: 'Routing'
})

useSeoMeta({
  title: 'Routing & Data Fetching',
  description: 'Eine echte Nuxt-Seite mit NuxtLink-Navigation, useFetch und Links zu dynamischen Routen.'
})

const { data: features, pending, error } = await useFetch<Feature[]>('/api/features')
const {
  activeStep,
  currentCodeExample,
  currentStep,
  isTargetActive,
  nextStep,
  previousStep,
  resetTour,
  sitePaneRef,
  spotlightRunning,
  startTour,
  steps
} = useSpotlightTour(routingTourSteps)
</script>

<template>
  <main>
    <div
      v-if="spotlightRunning"
      class="spotlight-scrim"
      aria-hidden="true"
    />

    <div class="split-shell">
      <div ref="sitePaneRef" class="site-pane">
        <div class="route-page route-page-shell">
          <nav
            class="route-nav"
            :class="{ 'is-spotlit': isTargetActive('route-nav') }"
            data-tour-target="route-nav"
            aria-label="Showcase Navigation"
          >
            <NuxtLink to="/">
              Aufgaben-Spotlight
            </NuxtLink>
            <NuxtLink to="/routing">
              Routing-Demo
            </NuxtLink>
            <a href="/api/features">API JSON</a>
          </nav>

          <div class="route-workspace">
            <TourGuide
              :active-step="activeStep"
              :current-step="currentStep"
              :highlight="false"
              :spotlight-running="spotlightRunning"
              :steps="steps"
              @next="nextStep"
              @previous="previousStep"
              @reset="resetTour"
              @start="startTour"
            />

            <div class="route-demo-surface">
              <section
                class="route-hero"
                :class="{ 'is-spotlit': isTargetActive('route-hero') }"
                data-tour-target="route-hero"
              >
                <p class="eyebrow">
                  Nuxt-Grundfunktion
                </p>
                <h1>Routing, Pages und Fetching</h1>
                <p>
                  Diese Seite existiert, weil Nuxt aus <code>app/pages/routing.vue</code>
                  automatisch die Route <code>/routing</code> erzeugt.
                </p>
              </section>

              <section
                class="feature-demo"
                :class="{ 'is-spotlit': isTargetActive('feature-demo') }"
                data-tour-target="feature-demo"
                aria-label="Nuxt Feature-Daten"
              >
                <div>
                  <p class="eyebrow">
                    useFetch('/api/features')
                  </p>
                  <h2>Serverdaten in einer Page</h2>
                  <p>
                    Die Karten werden aus einer Nitro-API geladen und verlinken auf
                    dynamische Detailseiten unter <code>/features/[slug]</code>.
                  </p>
                </div>

                <p v-if="pending" class="route-state">
                  Lade Nuxt-Features...
                </p>
                <p v-else-if="error" class="route-state">
                  Die Feature-Daten konnten nicht geladen werden.
                </p>
                <div
                  v-else
                  class="feature-grid"
                  :class="{ 'is-spotlit': isTargetActive('feature-grid') }"
                  data-tour-target="feature-grid"
                >
                  <NuxtLink
                    v-for="feature in features"
                    :key="feature.slug"
                    class="feature-card"
                    :to="`/features/${feature.slug}`"
                  >
                    <span>{{ feature.eyebrow }}</span>
                    <strong>{{ feature.title }}</strong>
                    <p>{{ feature.summary }}</p>
                  </NuxtLink>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <LessonCodePane
        :active-step="activeStep"
        :current-code-example="currentCodeExample"
        :current-step="currentStep"
        :steps-length="steps.length"
      />
    </div>
  </main>
</template>
