<script setup lang="ts">
import { featureDetailTourSteps } from '~/data/routeShowcaseContent'

type Feature = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  details: string
}

definePageMeta({
  title: 'Feature-Detail'
})

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data: features, pending, error } = await useFetch<Feature[]>('/api/features')
const feature = computed(() => features.value?.find((item) => item.slug === slug.value))
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
} = useSpotlightTour(featureDetailTourSteps)

useSeoMeta({
  title: () => feature.value ? feature.value.title : 'Feature nicht gefunden',
  description: () => feature.value?.summary ?? 'Detailseite für ein Nuxt-Feature.'
})
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
        <div class="route-page route-page-shell detail-page">
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
                v-if="pending"
                class="route-hero"
                :class="{ 'is-spotlit': isTargetActive('route-hero') }"
                data-tour-target="route-hero"
              >
                <p class="eyebrow">
                  useFetch
                </p>
                <h1>Feature wird geladen</h1>
                <p>Nuxt lädt die Daten aus <code>/api/features</code>.</p>
              </section>

              <section
                v-else-if="error || !feature"
                class="route-hero"
                :class="{ 'is-spotlit': isTargetActive('route-hero') }"
                data-tour-target="route-hero"
              >
                <p class="eyebrow">
                  Dynamische Route
                </p>
                <h1>Feature nicht gefunden</h1>
                <p>
                  Für <code>{{ slug }}</code> gibt es keinen Eintrag in der API.
                </p>
                <NuxtLink class="text-link" to="/routing">
                  Zur Routing-Demo
                </NuxtLink>
              </section>

              <section
                v-else
                class="route-hero"
                :class="{ 'is-spotlit': isTargetActive('route-hero') }"
                data-tour-target="route-hero"
              >
                <p class="eyebrow">
                  {{ feature.eyebrow }}
                </p>
                <h1>{{ feature.title }}</h1>
                <p>{{ feature.summary }}</p>
                <p>{{ feature.details }}</p>
                <NuxtLink class="text-link" to="/routing">
                  Alle Features ansehen
                </NuxtLink>
              </section>

              <section
                class="feature-demo detail-data-panel"
                :class="{ 'is-spotlit': isTargetActive('detail-data') }"
                data-tour-target="detail-data"
                aria-label="Geteilte Feature-Daten"
              >
                <p class="eyebrow">
                  Geteilte Datenquelle
                </p>
                <h2>/api/features</h2>
                <p>
                  Übersicht und Detailseite nutzen denselben Nitro-Endpunkt. Diese Detailseite filtert
                  den passenden Eintrag über den aktuellen Slug <code>{{ slug }}</code>.
                </p>
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
