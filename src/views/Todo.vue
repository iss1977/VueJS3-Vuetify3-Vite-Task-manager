<script setup>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();



const addTask = () => {
  store.dispatch('addTask', newTaskTitle.value);
  newTaskTitle.value = '';
}

const deleteTask = (id) => {
  store.dispatch('deleteTask', id);
}

const doneTask = (id, done) => {
  store.dispatch('doneTask', { id, done })
}

const checkFunctionality = () => console.log('Working!')

const newTaskTitle = ref('');

const tasks = computed(() => store.state.tasks);

</script>

<template>
  <div>
    <v-row>
      <v-text-field class="py-4 mx-6 my-4" label="Add task" append-inner-icon="mdi-plus" variant="outlined" clearable
        hide-details="true" v-model="newTaskTitle" @click:appendInner="addTask" @keyup.enter="addTask"></v-text-field>
    </v-row>

    <v-list select-strategy="multiple" class="pt-0" v-if="tasks.length">
      <div v-for="(task, i) in tasks" :key="task.id">
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
        <v-divider></v-divider>
      </div>
    </v-list>
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
