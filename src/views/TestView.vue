<script setup>
import { ref } from 'vue';


const tasks = [
  {
    id: 1,
    title: "Wake up",
    done: false
  },
  {
    id: 2,
    title: "Eat",
    done: false
  },
  {
    id: 3,
    title: "Go to sleep",
    done: false
  },
];

const model = [1,2];

</script>

<template>
  <div>
    <v-list>
      <v-list-group v-model="model" multiple>
        <template v-slot:activator="{ isOpen, props }">
          <div v-for="(task, i) in tasks" :key="i">
            <pre>
              {{ model }}
            </pre>
            <pre>
                {{ props }}
                {{ isOpen }}
            </pre>
            <v-list-item v-bind="props" active-class="deep-purple--text text--accent-4">
              <template #default="{ isActive, isSelected }">
                <v-list-item-action start>
                  <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                </v-list-item-action>
                <v-list-item-title> {{ task.title }}</v-list-item-title>
                Is active {{ isActive }} , is selected {{ isSelected }}
              </template>
            </v-list-item>
          </div>
        </template>
      </v-list-group>
    </v-list>

  </div>
</template>
