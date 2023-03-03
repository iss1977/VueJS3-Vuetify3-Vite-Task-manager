<template>
  <v-row>
    <v-text-field class="py-4 mx-6 my-4" label="Add task" append-inner-icon="mdi-plus" variant="outlined" clearable
      hide-details="true" v-model="newTaskTitle" @click:appendInner="addTask" @keyup.enter="addTask"></v-text-field>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newTaskTitle = ref('');

const addTask = () => {
  store.dispatch('addTask', newTaskTitle.value);
  newTaskTitle.value = '';
}

</script>