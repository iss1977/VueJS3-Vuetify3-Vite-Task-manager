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
    return true; //validation pass
  },
  editTask(){
    return true; //validation pass
  },
  editDueDate(){
    console.log('emit edit  due date')
    return true
  }
})

const items = [
        { title: 'Edit', icon: 'mdi-playlist-edit', click: () => emit('editTask') },
        { title: 'Due date', icon: 'mdi-clipboard-text-clock-outline',click: () => emit('editDueDate') },
        { title: 'Delete', icon: 'mdi-delete', click: () =>  emit('deleteTask') },
      ]

</script>