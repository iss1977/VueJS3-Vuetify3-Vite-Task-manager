<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FieldAddTask from '@/components/todo/FieldAddTask.vue';
import ListTasks from '@/components/todo/ListTasks.vue';

const store = useStore();
const tasks = computed(() => store.state.tasks);

</script>

<template>
  <div>
   
    <FieldAddTask />

    <ListTasks v-if="tasks.length"/>
    <div v-else class="text-center my-6">
      <v-icon size="x-large" color="primary">
        mdi-email
      </v-icon>
      <div class="text-body-1  text-primary">
        No tasks
      </div>
    </div>

  </div>
</template>
