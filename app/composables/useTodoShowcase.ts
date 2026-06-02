import {
  featureTags,
  filterLabels,
  filters,
  initialTodos,
  routeLinks,
  tourSteps
} from '~/data/showcaseContent'
import type { Filter, Todo } from '~/types/showcase'

const storageKey = 'nuxt-showcase-todos-de'

export const useTodoShowcase = () => {
  const newTodo = ref('')
  const activeFilter = ref<Filter>('all')
  const todos = useState<Todo[]>('showcase-todos-de', () => (
    initialTodos.map((todo) => ({ ...todo }))
  ))
  const activeStep = ref(0)
  const spotlightRunning = ref(false)
  const heroCollapsed = ref(false)
  const isHydrated = ref(false)
  const sitePaneRef = ref<HTMLElement | null>(null)
  const workspaceRef = ref<HTMLElement | null>(null)

  const currentStep = computed(() => tourSteps[activeStep.value] ?? tourSteps[0])
  const currentCodeExample = computed(() => currentStep.value)
  const completedCount = computed(() => todos.value.filter((todo) => todo.done).length)
  const activeCount = computed(() => todos.value.length - completedCount.value)
  const completionRate = computed(() => (
    todos.value.length
      ? Math.round((completedCount.value / todos.value.length) * 100)
      : 0
  ))
  const filteredTodos = computed(() => {
    if (activeFilter.value === 'active') {
      return todos.value.filter((todo) => !todo.done)
    }

    if (activeFilter.value === 'done') {
      return todos.value.filter((todo) => todo.done)
    }

    return todos.value
  })

  const isTargetActive = (target: string) => (
    spotlightRunning.value && currentStep.value.target === target
  )

  const addTodo = () => {
    const title = newTodo.value.trim()

    if (!title) {
      return
    }

    todos.value = [
      {
        id: Date.now(),
        title,
        done: false,
        nuxtFeature: 'Reaktive Nutzereingabe'
      },
      ...todos.value
    ]
    newTodo.value = ''
  }

  const toggleTodo = (id: number) => {
    todos.value = todos.value.map((todo) => (
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const setFilter = (filter: Filter) => {
    activeFilter.value = filter
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.done)
  }

  const isStackedLayout = () => (
    import.meta.client && window.matchMedia('(max-width: 760px)').matches
  )

  const scrollSitePaneToTop = () => {
    if (isStackedLayout()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    sitePaneRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollWorkspaceIntoView = () => {
    if (!workspaceRef.value) {
      return
    }

    if (isStackedLayout() || !sitePaneRef.value) {
      workspaceRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    sitePaneRef.value.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextStep = () => {
    if (activeStep.value === tourSteps.length - 1) {
      spotlightRunning.value = false
      return
    }

    activeStep.value += 1
  }

  const previousStep = async () => {
    if (activeStep.value <= 1) {
      activeStep.value = 0
      spotlightRunning.value = false
      heroCollapsed.value = false

      await nextTick()
      scrollSitePaneToTop()
      return
    }

    activeStep.value -= 1
    spotlightRunning.value = true
  }

  const startTour = async () => {
    activeStep.value = 1
    spotlightRunning.value = true
    heroCollapsed.value = true

    await nextTick()
    window.setTimeout(() => {
      scrollWorkspaceIntoView()
    }, 560)
  }

  const resetTour = async () => {
    activeStep.value = 0
    spotlightRunning.value = false
    heroCollapsed.value = false

    await nextTick()
    scrollSitePaneToTop()
  }

  const persistTodos = (value: Todo[]) => {
    if (import.meta.client) {
      localStorage.setItem(storageKey, JSON.stringify(value))
    }
  }

  watch(todos, persistTodos, { deep: true })

  onMounted(() => {
    isHydrated.value = true

    const savedTodos = localStorage.getItem(storageKey)

    if (savedTodos) {
      try {
        todos.value = JSON.parse(savedTodos)
      } catch {
        localStorage.removeItem(storageKey)
      }
    }
  })

  return {
    activeCount,
    activeFilter,
    activeStep,
    addTodo,
    clearCompleted,
    completedCount,
    completionRate,
    currentCodeExample,
    currentStep,
    featureTags,
    filterLabels,
    filteredTodos,
    filters,
    heroCollapsed,
    isHydrated,
    isTargetActive,
    newTodo,
    nextStep,
    previousStep,
    removeTodo,
    resetTour,
    routeLinks,
    setFilter,
    sitePaneRef,
    spotlightRunning,
    startTour,
    todos,
    toggleTodo,
    tourSteps,
    workspaceRef
  }
}
