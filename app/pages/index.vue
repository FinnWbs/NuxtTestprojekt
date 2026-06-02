<script setup lang="ts">
useSeoMeta({
  title: 'Aufgaben-Spotlight',
  description: 'Eine geführte Aufgaben-App, die Nuxt.js-Features zeigt.'
})

const {
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
} = useTodoShowcase()
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
        <ShowcaseHero
          :feature-tags="featureTags"
          :hero-collapsed="heroCollapsed"
          :highlight="isTargetActive('hero')"
          :is-hydrated="isHydrated"
          @start="startTour"
        />

        <section
          ref="workspaceRef"
          class="workspace"
          :class="{ 'workspace-focused': heroCollapsed }"
          aria-label="Arbeitsbereich des Aufgaben-Showcase"
        >
          <TourGuide
            :active-step="activeStep"
            :current-step="currentStep"
            :highlight="isTargetActive('tools')"
            :spotlight-running="spotlightRunning"
            :steps="tourSteps"
            @next="nextStep"
            @previous="previousStep"
            @reset="resetTour"
            @start="startTour"
          />

          <div class="todo-surface">
            <RouteShowcaseLinks
              :highlight="isTargetActive('routes')"
              :links="routeLinks"
            />

            <TodoComposer
              v-model="newTodo"
              :highlight="isTargetActive('composer')"
              @submit="addTodo"
            />

            <TodoStats
              :active-count="activeCount"
              :completed-count="completedCount"
              :completion-rate="completionRate"
              :highlight="isTargetActive('stats')"
              :total-count="todos.length"
            />

            <TodoFilters
              :active-filter="activeFilter"
              :completed-count="completedCount"
              :filter-labels="filterLabels"
              :filters="filters"
              :highlight="isTargetActive('filters')"
              @clear-completed="clearCompleted"
              @set-filter="setFilter"
            />

            <TodoList
              :highlight="isTargetActive('list')"
              :todos="filteredTodos"
              @remove="removeTodo"
              @toggle="toggleTodo"
            />
          </div>
        </section>
      </div>

      <LessonCodePane
        :active-step="activeStep"
        :current-code-example="currentCodeExample"
        :current-step="currentStep"
        :steps-length="tourSteps.length"
      />
    </div>
  </main>
</template>
