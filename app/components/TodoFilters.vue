<script setup lang="ts">
import type { Filter } from '~/types/showcase'

defineProps<{
  activeFilter: Filter
  completedCount: number
  filterLabels: Record<Filter, string>
  filters: Filter[]
  highlight: boolean
}>()

defineEmits<{
  clearCompleted: []
  setFilter: [filter: Filter]
}>()
</script>

<template>
  <div
    class="filter-bar"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="filters"
  >
    <div class="segmented" role="group" aria-label="Aufgabenfilter">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :class="{ selected: activeFilter === filter }"
        @click="$emit('setFilter', filter)"
      >
        {{ filterLabels[filter] }}
      </button>
    </div>
    <button
      class="quiet-button"
      type="button"
      :disabled="completedCount === 0"
      @click="$emit('clearCompleted')"
    >
      Erledigte löschen
    </button>
  </div>
</template>
