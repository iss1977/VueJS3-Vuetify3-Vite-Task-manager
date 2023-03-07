<template>
  <v-text-field
    :modelValue="$store.searchInput"
    v-on:update:modelValue="$store.dispatch('updateSearchTerm', $event)"
    prepend-inner-icon="mdi-magnify"
    label="search for a task"
    variant="underlined"
    density="compact"
    clearable
    hide-details
  ></v-text-field>
</template>

<script setup>


</script>