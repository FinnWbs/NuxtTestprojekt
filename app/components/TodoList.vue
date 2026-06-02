<script setup lang="ts">
import type { Todo } from '~/types/showcase'

defineProps<{
  highlight: boolean
  todos: Todo[]
}>()

defineEmits<{
  remove: [id: number]
  toggle: [id: number]
}>()
</script>

<template>
  <section
    class="todo-list"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="list"
    aria-label="Aufgaben"
  >
    <article
      v-for="todo in todos"
      :key="todo.id"
      class="todo-item"
      :class="{ done: todo.done }"
    >
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="$emit('toggle', todo.id)"
        >
        <span>{{ todo.title }}</span>
      </label>
      <div>
        <small>{{ todo.nuxtFeature }}</small>
        <button
          type="button"
          aria-label="Aufgabe entfernen"
          @click="$emit('remove', todo.id)"
        >
          x
        </button>
      </div>
    </article>

    <p
      v-if="todos.length === 0"
      class="empty-state"
    >
      Noch keine Aufgaben für diesen Filter.
    </p>
  </section>
</template>
