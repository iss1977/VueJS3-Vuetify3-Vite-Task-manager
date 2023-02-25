<script setup>
import { ref, computed } from 'vue';

const doneTask = (id) => {


  const foundIndex = tasks.findIndex( (task, index) => task.id === id) 
  
  //tasks[foundIndex].done = !tasks[foundIndex].done

  
  
  

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

const lines = computed(() => {
    return {
      default: 'one',
      'two-lines': 'two',
      'three-lines': 'three',
    }['default']
  })

  const props = computed(() => {
    return {
      lines: lines.value,
    }
  })

  const items = [
    {
      title: 'Item One',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      title: 'Item Two',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      title: 'Item Three',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  ];

  const subtitle = computed(() => {
    switch (lines.value) {
      case 'two': return 'Subtitle two'
      case 'three': return 'Subtitle three'
      default: return 'Subtitle default'
    }
  })




</script>

<template>
  <div>

    <div>
      <v-list v-bind="props">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :subtitle="subtitle"
          :prepend-avatar="avatar ? item.avatar : undefined"
        ></v-list-item>
      </v-list>
    </div>


    <v-text-field> {{ lines  }}</v-text-field>
    <v-list select-strategy="multiple" class="pt-0">
      <div v-for="task in tasks" :key="task.id">

        <v-list-item
          @click="doneTask(task.id)"
          
        >
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title>{{ task.title }}</v-list-item-title>

        </v-list-item>
        <v-divider></v-divider>
      </div>

    </v-list>

    <v-list>

      <v-list-item :isActive="true" >
          List element one
      </v-list-item>

      <v-list-item :active="true" >
          List element two
      </v-list-item>

      <v-list-item value="tasks[2].done">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action>
              <v-checkbox :model-value="isActive"></v-checkbox>
            </v-list-item-action>
          </template>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
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
