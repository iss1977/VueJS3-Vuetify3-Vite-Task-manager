<template>
  <div class="about pa-6">
    <h1>About todo</h1>
    <h2>{{ subTiltle}}</h2>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis nesciunt illum rerum omnis illo, praesentium blanditiis ullam sit eveniet, eius sed quibusdam, magnam totam accusantium cupiditate distinctio quos veritatis minus!</p>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  const store = useStore();

  const subTiltle = store.getters.getAppTitle 
</script>

<style>

</style>
