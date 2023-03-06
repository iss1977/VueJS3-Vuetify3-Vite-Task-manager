<template>
  <v-list-item :value="task.id" :class="{ 'bg-blue-lighten-4': task.done }" @click="doneTask(task.id, !task.done)">
    <template v-slot:prepend="{ isSelected, isActive, activate }">
      <v-list-item-action start>
        <v-checkbox-btn :modelValue="task.done" @update:modelValue="doneTask(task.id, !task.done)"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}</v-list-item-title>

    <template v-slot:append>
      <!-- <v-btn @click.stop="dialogs.delete = true" color="primary lighten-1" icon="mdi-delete" variant="text"></v-btn> -->
      <TaskMenu
        v-bind:task="task"
        v-on:deleteTask="dialogs.delete = true"
        v-on:editTask="dialogs.edit = true"
      />
    </template>
  </v-list-item>

  <DialogDelete v-bind:dialog-active="dialogs.delete" @dialog-action-yes-or-no="deleteDialogAction"/>
  <DialogEdit v-bind:dialog-active="dialogs.edit" v-bind:task="task" @dialog-action-save-or-not="editDialogAction"/>
</template>

<script setup>
import DialogDelete from '@/components/todo/dialogs/DialogDelete.vue';
import DialogEdit from '@/components/todo/dialogs/DialogEdit.vue';
import TaskMenu from './TaskMenu.vue';

import { useStore } from "vuex";
import { reactive } from 'vue';

const store = useStore();

const props = defineProps(['task']);

const task = props.task

const deleteTask = (id) => {
  store.dispatch('deleteTask', id);
}

const doneTask = (id, done) => {
  store.dispatch('doneTask', { id, done })
}

const saveTask = (taskPayload) => {
  store.dispatch('saveTask', taskPayload)
}

// confirmation modals - open/close
const dialogs = reactive({
  edit: false,
  delete: false,
});

const deleteDialogAction = (yesOoNo) =>  {
  dialogs.delete = false // close modal
  if (yesOoNo === 'yes'){
    setTimeout( () => deleteTask(task.id), 400); // wait for "confirm delete" window animation to end.
  }
};

const editDialogAction = (saveOrNot, editedTask) => {
  dialogs.edit = false
  if (saveOrNot === 'save'){
    saveTask(editedTask);
  }
}

</script>