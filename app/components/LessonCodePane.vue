<script setup lang="ts">
import type { TourStep } from '~/types/showcase'

defineProps<{
  activeStep: number
  currentCodeExample: TourStep
  currentStep: TourStep
  stepsLength: number
}>()

const isExpanded = ref(false)
const panelId = 'lesson-code-panel'

const togglePanel = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <aside
    class="code-pane"
    :class="{ 'is-expanded': isExpanded, 'is-collapsed': !isExpanded }"
    aria-label="Spotlight-Quellcode"
  >
    <button
      class="code-pane-toggle"
      type="button"
      :aria-controls="panelId"
      :aria-expanded="isExpanded"
      :aria-label="isExpanded ? 'Info-Panel schliessen' : 'Info-Panel oeffnen'"
      @click="togglePanel"
      @keydown.enter.prevent="togglePanel"
      @keydown.space.prevent="togglePanel"
    >
      <span class="toggle-label">
        {{ isExpanded ? 'Schliessen' : 'Infos' }}
      </span>
    </button>

    <div
      v-show="isExpanded"
      :id="panelId"
      class="code-panel"
      :aria-hidden="!isExpanded"
    >
      <div class="lesson-header">
        <span class="step-count">
          Schritt {{ activeStep + 1 }} / {{ stepsLength }}
        </span>
        <span class="lesson-feature">
          {{ currentStep.eyebrow }}
        </span>
      </div>

      <div class="lesson-body">
        <section class="lesson-intro" aria-live="polite">
          <p class="eyebrow">
            Nuxt-Konzept
          </p>
          <h2>{{ currentStep.presentationTitle }}</h2>
          <p>{{ currentStep.presentationSummary }}</p>
        </section>

        <section class="why-card" aria-label="Wie Nuxt hilft">
          <span>Wie Nuxt hilft</span>
          <p>{{ currentStep.whyItMatters }}</p>
        </section>

      </div>

      <section class="code-section" aria-label="Quellcode-Fokus">
        <div class="code-panel-header">
          <div>
            <p class="eyebrow">
              Code-Fokus
            </p>
            <h3>{{ currentCodeExample.codeTitle }}</h3>
          </div>
          <span>{{ currentCodeExample.codeLanguage }}</span>
        </div>

        <pre><code>{{ currentCodeExample.code }}</code></pre>
      </section>
    </div>
  </aside>
</template>
