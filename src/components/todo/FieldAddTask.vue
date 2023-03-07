<template>
    <v-text-field
    class="ma-3"
      label="Add task"
      variant="outlined"
      clearable
      density="compact"
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