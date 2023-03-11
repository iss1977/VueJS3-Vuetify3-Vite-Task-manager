<template>
  <v-list select-strategy="multiple" class="pt-0" v-if="tasks.length" >
    <draggable
        v-model="tasks"
        handle=".handle"
        itemKey="id"
        @change="reorderTaskList($event)"
      >
      <template #item="{ element, index }">
      <Task :task="element" :key="element.id"/>
    </template>
    </draggable>
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
import draggable from "vuedraggable";

const store = useStore();

//const tasks = computed(() => store.getters.tasksFiltered); // also working without a setter in computed

const tasks = computed({
  get() {
    return store.getters.tasksFiltered
  },
  set(newValue) {
    // will be executed by reorderTaskList function below
  }
});

const reorderTaskList = (event) => {
  const reorderInformation = {
    movedTaskId: event.moved?.element?.id,
    oldTaskIndex: event.moved?.oldIndex,
    newTaskIndex: event.moved?.newIndex
  }
  store.dispatch('reorderTaskList', reorderInformation)
}

</script>

<style>
  .sortable-ghost[data-draggable="true"] > *{
    box-shadow: 0 0 10px rgba(0,0,0,.3);
  }
</style>