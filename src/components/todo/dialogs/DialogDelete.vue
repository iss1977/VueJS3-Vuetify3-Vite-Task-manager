<template>
  <v-dialog v-model="dialogActiveEditable" persistent width="auto">
    <template v-slot:activator="vars" >
      <!-- <v-btn color="primary" v-bind="vars.props">
        Open Dialog
      </v-btn>
      <v-btn color="primary" v-on:click="vars.props.onClick($event)">
        Open Dialog2
      </v-btn> -->
    </template>
    <v-card class="pa-4">
      <v-card-title class="text-h5">
        Delete Task
      </v-card-title>
      <v-card-text>Are you sure you want to delete Task?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-1" variant="outlined" size="small" @click="closeDialog('no')">
          No
        </v-btn>
        <v-btn color="red-darken-1" variant="outlined" size="small" @click="closeDialog('yes')">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['dialog-active']); // v-model for dialog (dialogActive)
const emit = defineEmits({
  dialogActionYesOrNo(payload){
    console.log('payload', payload)
    return true; //validation pass
  }
});

// dialogActiveEditable is only necessary to make v-model for dialog editable. Necessary on escape keypress
const dialogActiveEditable = ref(props.dialogActive);
const watchDialogActive = watch( () => props.dialogActive, () => {
  dialogActiveEditable.value = props.dialogActive
});

const closeDialog = ( deleteNoOrYes ) => {
  emit('dialogActionYesOrNo', deleteNoOrYes);
}
</script>
