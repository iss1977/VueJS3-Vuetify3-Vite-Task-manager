<template>
    <v-dialog v-model="dialogActiveEditable" width="auto" persistent no-click-animation>
    <template v-slot:activator="vars" >
      <!-- <v-btn color="primary" v-bind="vars.props"> //TODO: delete this @critical
        Open Dialog
      </v-btn>
      <v-btn color="primary" v-on:click="vars.props.onClick($event)">
        Open Dialog2
      </v-btn> -->
    </template>

        <v-card class="pa-4" min-width="300" @keydown.esc="keyEscape($event)">
          <v-card-item>
            <v-card-title class="text-h5">
              Edit Task
            </v-card-title>
            <v-card-subtitle>
              Enter task info
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            
            <v-text-field
              label="Task title"
              variant="underlined"
              hide-details="true"
              v-model="copiedTask.title"
              @keyup.enter="!taskTitleInvalid && closeDialog('save')"
            >
            </v-text-field>
            <v-checkbox label="Done" density="compact" v-model="copiedTask.done"></v-checkbox>
            <pre>
        </pre>
          </v-card-text>
    
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="outlined" size="small" @click="closeDialog('cancel')">
              Cancel
            </v-btn>
            <v-btn
              color="red-darken-1"
              variant="outlined"
              size="small"
              :disabled="taskTitleInvalid && ( copiedTask.done === task.done )"
              @click="closeDialog('save')"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
       
        </v-dialog>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue';

const props = defineProps(['dialog-active', 'task']);
const emit = defineEmits({
  dialogActionSaveOrNot(payload){
    return true; //validation pass
  }
});

// dialogActiveEditable is only necessary to make v-model for dialog editable. Necessary on escape keypress
const dialogActiveEditable = ref(props.dialogActive);
const watchDialogActive = watch( () => props.dialogActive, (newValue, oldValue ) => {
  dialogActiveEditable.value = props.dialogActive
});


const copiedTask = reactive(Object.assign({}, props.task));

const taskTitleInvalid = computed( () => !copiedTask.title || copiedTask.title === props.task.title);

const closeDialog = ( saveOrCancel ) => {
  emit('dialogActionSaveOrNot', saveOrCancel, copiedTask);
}
</script>