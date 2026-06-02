<script setup lang="ts">
import type { TourStep } from '~/types/showcase'

defineProps<{
  activeStep: number
  currentCodeExample: TourStep
  currentStep: TourStep
  stepsLength: number
}>()
</script>

<template>
  <aside class="code-pane" aria-label="Spotlight-Quellcode">
    <div class="code-panel">
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

        <section class="takeaway-grid" aria-label="Wichtige Erkenntnisse">
          <article
            v-for="takeaway in currentStep.takeaways"
            :key="takeaway"
          >
            {{ takeaway }}
          </article>
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

        <p class="code-context">
          {{ currentStep.codeFocus }}
        </p>

        <pre><code>{{ currentCodeExample.code }}</code></pre>
      </section>
    </div>
  </aside>
</template>
