<template>
  <v-list select-strategy="multiple" class="pt-0" v-if="tasks.length">
    <Task 
      v-for="(task, i) in tasks" :task="task" :key="task.id"
    />
  </v-list>
  <NoTasks 
    v-else class="text-center my-6"
  />
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Task from '@/components/todo/Task.vue'
import NoTasks from '@/components/todo/NoTasks.vue'

const store = useStore();

const tasks = computed(() => store.state.tasks);



</script>