<template>
  <v-dialog v-model="dialogActive" width="auto">
    <v-card>
      <v-card-text>

        <VueDatePicker
          v-model="dateAsNumber"
          teleport-center
          inline
          auto-apply
          model-type="timestamp"
          :enable-time-picker="false"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green-darken-5" variant="outlined" size="small" @click="dateSelected('cancel')">
          Cancel
        </v-btn>
        <v-btn color="green-darken-3" variant="outlined" size="small" @click="dateSelected('select')">
          Select
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits({
  dialogActionSelectOrCancel(payload, dateAsNumber) {
    return true; //validation pass
  }
});

const props = defineProps(['dialog-active', 'date-to-edit']);

// "props.dateToEdit" is local time as string. Ex: 2022-03-18T10:11:22
// transform recieved date, trimming the time from DateTime. Show today as preselected date if not set.
// Mantain only date part of Date.
const dateToEdit = props.dateToEdit ? new Date(props.dateToEdit) : new Date();
dateToEdit.setHours(0, 0, 0, 0);
const dateAsNumber = ref(dateToEdit.getTime());

const dateSelected = (selectOrCancel) => {
  emit('dialogActionSelectOrCancel', selectOrCancel, dateAsNumber.value)
}

</script>