<template>
  <v-menu >
    <template v-slot:activator="{ props }">
      
      <v-btn
        variant="text"
        icon="mdi-dots-vertical"
        v-bind="props"
        size="small"
        color="primary"
        @click.stop>
      </v-btn>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        @click = "item.click"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>

const props = defineProps(['task']);
const task = props.task;
const emit = defineEmits({
  deleteTask(){
    console.log('emit delete task')
    return true; //validation pass
  },
  editTask(){
    console.log('emit edit  task')
    return true; //validation pass
  },
})

const items = [
        { title: 'Edit', icon: 'mdi-playlist-edit', click: () => emit('editTask') },
        { title: 'Due date', icon: 'mdi-clipboard-text-clock-outline', click: () => console.log('Date') },
        { title: 'Delete', icon: 'mdi-delete', click: () =>  emit('deleteTask') },
      ]

</script>