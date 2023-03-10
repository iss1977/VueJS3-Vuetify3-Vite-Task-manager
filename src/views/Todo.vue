<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FieldAddTask from '@/components/todo/FieldAddTask.vue';
import ListTasks from '@/components/todo/ListTasks.vue';
import ButtonDoneSorting from '@/components/todo/ButtonDoneSorting.vue';

const store = useStore();
const numberOfTasks = computed( () => store.getters.numberOfTasks)
const isSorting = computed( () => store.state.sorting);

const doneSorting = () => {
  store.commit('isSorting', false);
}

</script>

<template>
  <div>
   
    <FieldAddTask />

    <ListTasks v-if="numberOfTasks"/>
    <div v-else class="text-center my-6">
      <v-icon size="x-large" color="primary">
        mdi-email
      </v-icon>
      <div class="text-body-1  text-primary">
        No tasks
      </div>
    </div>
  <ButtonDoneSorting 
    class="button-done-sorting"
    @click="doneSorting"
    v-if="isSorting"
  />
  </div>
</template>

<style>
  .button-done-sorting{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%,0)
  }
</style>
