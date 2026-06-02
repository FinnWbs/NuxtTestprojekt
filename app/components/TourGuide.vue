<script setup lang="ts">
import type { TourStep } from '~/types/showcase'

const props = defineProps<{
  activeStep: number
  currentStep: TourStep
  highlight: boolean
  spotlightRunning: boolean
  steps: TourStep[]
}>()

const emit = defineEmits<{
  next: []
  previous: []
  reset: []
  start: []
}>()

const primaryLabel = computed(() => {
  if (!props.spotlightRunning && props.activeStep === 0) {
    return 'Spotlight starten'
  }

  if (props.activeStep === props.steps.length - 1) {
    return 'Tour beenden'
  }

  return 'Nächstes Feature'
})

const handlePrimaryAction = () => {
  if (!props.spotlightRunning && props.activeStep === 0) {
    emit('start')
    return
  }

  if (props.activeStep === props.steps.length - 1) {
    emit('reset')
    return
  }

  emit('next')
}
</script>

<template>
  <aside
    class="tour-panel"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="tools"
  >
    <p class="eyebrow">
      Spotlight-Guide
    </p>
    <h2>{{ currentStep.title }}</h2>
    <p>{{ currentStep.copy }}</p>

    <div class="tour-progress" aria-label="Tour-Fortschritt">
      <span
        v-for="(step, index) in steps"
        :key="step.key"
        :class="{ active: index === activeStep, complete: index < activeStep }"
      />
    </div>

    <div class="tour-controls">
      <button
        type="button"
        :disabled="!spotlightRunning && activeStep === 0"
        @click="$emit('previous')"
      >
        Zurück
      </button>
      <button
        type="button"
        @click="handlePrimaryAction"
      >
        {{ primaryLabel }}
      </button>
    </div>
  </aside>
</template>
