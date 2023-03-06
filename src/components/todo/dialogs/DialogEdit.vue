<template>
    <v-dialog v-model="dialogActive" persistent width="auto" >
    <template v-slot:activator="vars" >
      <!-- <v-btn color="primary" v-bind="vars.props">
        Open Dialog
      </v-btn>
      <v-btn color="primary" v-on:click="vars.props.onClick($event)">
        Open Dialog2
      </v-btn> -->
    </template>

        <v-card class="pa-4" min-width="300">
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
              :disabled="taskTitleInvalid"
              @click="closeDialog('save')"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
       
        </v-dialog>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps(['dialog-active', 'task']);
const emit = defineEmits({
  dialogActionSaveOrNot(payload){
    console.log('payload', payload)
    return true; //validation pass
  }
});

const copiedTask = reactive(Object.assign({}, props.task));

const taskTitleInvalid = computed( () => !copiedTask.title || copiedTask.title === props.task.title);

const closeDialog = ( saveOrCancel ) => {
  emit('dialogActionSaveOrNot', saveOrCancel, copiedTask);
}

</script>