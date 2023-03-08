<template>
  <div>
    <v-list-item
      :value="task.id"
      :class="{ 'bg-blue-lighten-4': task.done }"
      class="bg-white"
      :ripple="false"
      @click="doneTask(task.id, !task.done)"
    >
      <template v-slot:prepend="{ isSelected, isActive, activate }">
        <v-list-item-action start>
          <v-checkbox-btn :modelValue="task.done" @update:modelValue="doneTask(task.id, !task.done)"></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}</v-list-item-title>

      <template v-slot:append>
        <span @click.stop class="d-flex align-center">
          <span @click="dialogs.dueDate = true">
            <v-icon icon="mdi-calendar-alert" v-if="task.dueDate" class="mr-2 text-grey-darken-3 "
              size="xs-small"></v-icon>
            <span class="text-caption text-grey-darken-3"> {{ dateFormated }}</span>
          </span>
          <TaskMenu v-bind:task="task" v-on:deleteTask="dialogs.delete = true" v-on:editTask="dialogs.edit = true"
            v-on:editDueDate="dialogs.dueDate = true" />
        </span>
        <v-list-item-action end class="ms-0 handle" v-if="sorting">
          <v-btn color="primary" variant="plain" size="xs-small" icon>
            <v-icon size="xs-small">mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>

    <DialogDelete v-bind:dialog-active="dialogs.delete" @dialog-action-yes-or-no="deleteDialogAction" />
    <DialogEdit v-bind:dialog-active="dialogs.edit" v-bind:task="task" @dialog-action-save-or-not="editDialogAction" />
    <DialogDueDate v-bind:dialog-active="dialogs.dueDate" v-bind:date-to-edit="task.dueDate"
      @dialog-action-select-or-cancel="editDueDateDialogAction" />
  </div>
</template>

<script setup>
import DialogDelete from '@/components/todo/dialogs/DialogDelete.vue';
import DialogEdit from '@/components/todo/dialogs/DialogEdit.vue';
import DialogDueDate from '@/components/todo/dialogs/DialogDueDate.vue';

import TaskMenu from './TaskMenu.vue';
import { format, parseISO } from 'date-fns';

import { useStore } from "vuex";
import { reactive, computed } from 'vue';

import { toISOStringWithTimezone } from '@/util/helpers.js';

const store = useStore();

const props = defineProps(['task']);
const task = props.task
const sorting = computed(() => store.state.sorting);

const dateFormated = computed(() => task.dueDate ? format(parseISO(task.dueDate), "dd-MM-yyyy") : null);

// store actions
const deleteTask = (id) => {
  store.dispatch('deleteTask', id);
}

const doneTask = (id, done) => {
  store.dispatch('doneTask', { id, done })
}

const saveTask = (taskPayload) => {
  store.dispatch('saveTask', taskPayload)
}

const setDueDateOfTask = (localeDateLikeISOString) => {
  store.dispatch('setDueDateOfTask', { id: task.id, localeDateLikeISOString })
}

// modals - controls witch dialogs are opened
const dialogs = reactive({
  edit: false,
  delete: false,
  dueDate: false,
});

const deleteDialogAction = (yesOoNo) => {
  dialogs.delete = false // close modal
  if (yesOoNo === 'yes') {
    setTimeout(() => deleteTask(task.id), 400); // wait for "confirm delete" window animation to end.
  }
};

const editDialogAction = (saveOrNot, editedTask) => {
  dialogs.edit = false
  if (saveOrNot === 'save') {
    saveTask(editedTask);
  }
}

const editDueDateDialogAction = (dialogActionSelectOrCancel, LocalDateAsNumber) => {
  dialogs.dueDate = false;
  if (dialogActionSelectOrCancel === 'select') {
    const localeDateLikeISOString = toISOStringWithTimezone(LocalDateAsNumber)
    setDueDateOfTask(localeDateLikeISOString);
  }
}


</script>

