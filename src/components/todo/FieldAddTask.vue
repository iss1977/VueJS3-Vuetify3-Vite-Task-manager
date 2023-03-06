<template>
  <v-row>
    <v-text-field
      class="py-4 mx-6 my-4"
      label="Add task"
      variant="outlined"
      clearable
      hide-details="true"
      v-model="newTaskTitle"
      @click:appendInner="addTask"
      @keyup.enter="addTask"
    >
      <template v-slot:append-inner>
        <v-icon
          icon="mdi-plus"
          v-if="!taskTitleInvalid"
          @click="addTask"
        />
      </template>
    </v-text-field>
   
  </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newTaskTitle = ref('');

const taskTitleInvalid = computed( () => !newTaskTitle.value);

const addTask = () => {
  if(!taskTitleInvalid.value){
    store.dispatch('addTask', newTaskTitle.value);
    newTaskTitle.value = '';
  }
}

</script>