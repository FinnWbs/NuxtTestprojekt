import type { TourStep } from '~/types/showcase'

export const useSpotlightTour = (steps: TourStep[]) => {
  const activeStep = ref(0)
  const spotlightRunning = ref(false)
  const sitePaneRef = ref<HTMLElement | null>(null)

  const currentStep = computed(() => steps[activeStep.value] ?? steps[0])
  const currentCodeExample = computed(() => currentStep.value)

  const isTargetActive = (target: string) => (
    spotlightRunning.value && currentStep.value.target === target
  )

  const startTour = () => {
    activeStep.value = 0
    spotlightRunning.value = true
    sitePaneRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextStep = () => {
    if (activeStep.value === steps.length - 1) {
      spotlightRunning.value = false
      return
    }

    activeStep.value += 1
  }

  const previousStep = () => {
    if (activeStep.value === 0) {
      spotlightRunning.value = false
      return
    }

    activeStep.value -= 1
    spotlightRunning.value = true
  }

  const resetTour = () => {
    spotlightRunning.value = false
    activeStep.value = 0
  }

  return {
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
  }
}
