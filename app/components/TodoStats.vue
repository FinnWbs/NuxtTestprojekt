<script setup lang="ts">
defineProps<{
  activeCount: number
  completedCount: number
  completionRate: number
  highlight: boolean
  totalCount: number
}>()
</script>

<template>
  <div
    class="stats-grid"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="stats"
  >
    <article>
      <span>Gesamt</span>
      <strong>{{ totalCount }}</strong>
    </article>
    <article>
      <span>Aktiv</span>
      <strong>{{ activeCount }}</strong>
    </article>
    <article>
      <span>Erledigt</span>
      <strong>{{ completedCount }}</strong>
    </article>
    <article>
      <span>Fortschritt</span>
      <strong>{{ completionRate }}%</strong>
    </article>
  </div>
</template>
