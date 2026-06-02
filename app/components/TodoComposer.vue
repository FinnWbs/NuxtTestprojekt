<script setup lang="ts">
defineProps<{
  highlight: boolean
  modelValue: string
}>()

const emit = defineEmits<{
  submit: []
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <form
    class="composer"
    :class="{ 'is-spotlit': highlight }"
    data-tour-target="composer"
    @submit.prevent="$emit('submit')"
  >
    <label for="new-todo">Neue Aufgabe</label>
    <div class="input-row">
      <input
        id="new-todo"
        :value="modelValue"
        type="text"
        placeholder="Aufgabe für deine Nuxt-Demo hinzufügen"
        autocomplete="off"
        @input="updateValue"
      >
      <button type="submit">
        Hinzufügen
      </button>
    </div>
  </form>
</template>
