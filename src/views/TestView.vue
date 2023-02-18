<script setup>
import { ref } from 'vue';

const doneTask = (id) => {


  const foundIndex = tasks.findIndex( (task, index) => task.id === id) 
 
}

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
]

const testModel = ref()

const item = ref(1)

</script>

<template>
 <div>
    <v-list>

      <v-list-item :isActive="true" :toggle="false">
        <v-list-item-content>
          List element one
        </v-list-item-content>
      </v-list-item>

      <v-list-item :active="true" :toggle="true">
        <v-list-item-content>
          List element two
        </v-list-item-content>
      </v-list-item>

      <v-list-item :value="item">
          <!-- <template v-slot:default="{ active }"> -->
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          <!-- </template> -->
        </v-list-item>


    </v-list>

    <v-text-field
      v-model="testModel"
      clearable
      hide-details="auto"
      label="Last name"
    ></v-text-field>


    <v-list>
      <v-list-item v-for="task in tasks" :key="task.id" :value="task">
          Hello
      </v-list-item>
    </v-list>
  </div>
</template>
