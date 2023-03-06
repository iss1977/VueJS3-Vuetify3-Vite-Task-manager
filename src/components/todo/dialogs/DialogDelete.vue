<template>
  <v-dialog v-model="dialogActive" persistent width="auto">
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
import { ref } from 'vue';

const props = defineProps(['dialog-active']); // v-model for dialog (dialogActive)
const emit = defineEmits({
  dialogActionYesOrNo(payload){
    console.log('payload', payload)
    return true; //validation pass
  }
});
  

//const  dialogActive2  = ref(props.dialogActive);

const closeDialog = ( deleteNoOrYes ) => {
//  dialogActive2.value = false
  emit('dialogActionYesOrNo', deleteNoOrYes);
}

</script>