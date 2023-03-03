<template>
  <v-list-item :value="task.id" :class="{ 'bg-blue-lighten-4': task.done }" @click="doneTask(task.id, !task.done)">
    <template v-slot:prepend="{ isSelected, isActive, activate }">
      <v-list-item-action start>
        <v-checkbox-btn :modelValue="task.done" @update:modelValue="doneTask(task.id, !task.done)"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}</v-list-item-title>

    <template v-slot:append>
      <v-btn @click.stop="deleteTask(task.id)" color="primary lighten-1" icon="mdi-delete" variant="text"></v-btn>
    </template>

  </v-list-item>
</template>

<script setup>

import { useStore } from "vuex";

const store = useStore();

const props = defineProps(['task']);

const task = props.task

const deleteTask = (id) => {
  store.dispatch('deleteTask', id);
}

const doneTask = (id, done) => {
  store.dispatch('doneTask', { id, done })
}

</script>