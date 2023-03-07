<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item prepend-avatar="https://picsum.photos/200" title="Todo" subtitle="forever free" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="drawer = !drawer"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item v-for="item in items" :key="item.title" :prepend-icon="item.icon" :title="item.title"
          :value="item.title" :to="item.to">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar color="primary" extension-height="64">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.4), rgba(128,208,199,.4)"></v-img>
      </template>


      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="mx-2">Todo App</v-app-bar-title>
      </template>

      <template #default>
        <div>
          <v-btn icon @click="showSearchBar = !showSearchBar">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

        </div>
      </template>

      <template #extension>

        <v-container fluid class="pa-0 ma-0 v-container" :class="{ hidden : !showSearchBar}">
          <v-row>
            <v-spacer></v-spacer>
            <v-col
              cols="10"
              sm="8"
              lg="6"
              class="mx-6"
            >
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="search for a task"
                variant="underlined"
                density="compact"
                clearable
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script setup>
import Snackbar from '@/components/shared/Snackbar.vue';


import { ref } from 'vue';

const drawer = ref(false);

const items = [
  { title: 'Todo', icon: 'mdi-checkbox-marked-circle-plus-outline', to: '/' },
  { title: 'About', icon: 'mdi-information-variant', to: '/about' },

];

const updateFocus = (e) => showSearchBar.value = e;

const showSearchBar = ref(false)


</script>

<style lang="scss" scoped>
.v-container{
  transition: all .3s;
  &.hidden{
      // transform: translateY(100px);
      opacity: 0;
    }

}
</style>