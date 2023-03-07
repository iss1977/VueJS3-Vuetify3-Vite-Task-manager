<template>
  <div class="text-teal-lighten-4 text-body-2 font-weight-medium pa-1">
    {{ date }}
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { format } from 'date-fns';

const date = ref(null)

const getDate = () => format( Date.now(), 'MMMM d, H:mm:ss')

const timer = setInterval( () => {
  date.value = getDate()
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>