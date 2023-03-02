<script setup>
import { ref, computed } from 'vue';

const doneTask = (id) => {


  const foundIndex = tasks.findIndex( (task, index) => task.id === id) 
  
  //tasks[foundIndex].done = !tasks[foundIndex].done

  
  
  

}

const tasks = ref([
  {
    id: 1,
    title: "Wake up",
    done: false
  },
  {
    id: 2,
    title: "Eat",
    done: true
  },
  {
    id: 3,
    title: "Go to sleep",
    done: false
  },
]);


const testModel = ref()

const item = ref(1)



</script>

<template>
  <div>
    <v-list select-strategy="multiple" class="pt-0">
      <div v-for="(task,i) in tasks" :key="task.id">

        <v-list-item 
          :value = "task.id"
          @click = "task.done = !task.done"
          :class=" { 'bg-blue-lighten-5': task.done }"
        >
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn :model-value="task.done" @update:modelValue="task.done = !task.done"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title :class="{'text-decoration-line-through': task.done}">{{ task.title }}</v-list-item-title>

        </v-list-item>
        <v-divider></v-divider>
      </div>

    </v-list>

    <pre>
      {{ tasks }}
    </pre>
  
  </div>
</template>
