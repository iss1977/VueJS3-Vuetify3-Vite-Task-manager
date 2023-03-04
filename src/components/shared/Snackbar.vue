<template>
  <v-snackbar v-model="$store.state.snackbar.show" :timeout="snackbarTimeut">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="hideSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const snackbarText = computed( () => store.getters.snackbarText);
const snackbarTimeut = computed( () => store.getters.snackbarTimeout);
const hideSnackbar = () => {
  store.dispatch('hideSnackbar');
}
</script>
