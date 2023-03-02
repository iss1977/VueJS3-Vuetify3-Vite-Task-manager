<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"

      >
        <v-list-item
          prepend-avatar="https://picsum.photos/200"
          title="Todo"
          subtitle="forever free"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="drawer = !drawer"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :value = "item.title"
            :to="item.to">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        density="prominent"
        color="primary"
        image="truck.jpg"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Todo App</v-app-bar-title>


        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>

import { ref } from 'vue';

const drawer = ref(false);

const items =  [
          { title: 'Todo', icon: 'mdi-checkbox-marked-circle-plus-outline', to:'/' },
          { title: 'About', icon: 'mdi-information-variant', to: '/about' },
          { title: 'Test', icon: 'mdi-information-variant', to: '/test' },
      ];


</script>