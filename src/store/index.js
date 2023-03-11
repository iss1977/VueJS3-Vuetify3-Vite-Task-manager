import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import * as localforage from './localforage';


// Create a new store instance.
export const store = createStore({
  state: {
    appTitle: import.meta.env.VITE_APP_TITLE,

    searchTerm: null,

    tasks: [],

    snackbar: {
      show: false,
      text: '',
      timeout: 3000,
    },
    sorting: false,
  },
  /**
   * MUTATIONS
   */
  mutations: {
    addTask(state, newTask) {
      if (!newTask) return;
      state.tasks.push(newTask);
    },
    saveTask(state, newTask) {
      const task = state.tasks.filter((task) => task.id === newTask.id)[0];
      Object.assign(task, newTask);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id)
    },
    doneTask(state, { id, done }) {
      const found = state.tasks.find((el) => el.id === id);
      if (found) {
        found.done = done;
      }
    },
    setDueDateOfTask(state, { id, localeDateLikeISOString }) {
      const found = state.tasks.find((el) => el.id === id);
      if (found) {
        found.dueDate = localeDateLikeISOString;
      }
    },
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    isSorting(state, value) {
      state.sorting = value
    },
    // Snackbar
    showSnackbar(state, message) {
      state.snackbar.text = message;
      state.snackbar.show = true;
      state.snackbar.timeout = state.snackbar.timeout + 1; // reset timer
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    setTasks(state, newTasks) {
      state.tasks = newTasks
    },

    reorderTaskList(state, reorderInformation) {
      orderTasksBetweenIndexes(state.tasks, reorderInformation.oldTaskIndex, reorderInformation.newTaskIndex);
    },

    sortTasks( state ){
      sortTasksbyOrderField(state.tasks).then( ( tasks ) => state.tasks =tasks )
    }
  },

  /**
   * ACTIONS
   */
  actions: {
    async addTask({ commit, getters }, newTitle) {
      console.log('Vuex action add task. New title is ', newTitle)
      const newTask = {
        id: uuidv4(),
        order: getters.numberOfTasks,
        title: newTitle,
        done: false,
        dueDate: null,
      }

      try {
        await localforage.addTask(newTask)
        commit('addTask', newTask);
        commit('showSnackbar', `Task \"${newTitle}\" added.`)
      } catch (error) {
        console.error(error)
      }

    },

    saveTask({ commit }, newTask) {
      commit('saveTask', newTask);
      commit('showSnackbar', `Task \"${newTask.title}\" saved.`)
    },

    deleteTask({ commit }, id) {
      localforage.deleteTask(id).then( () => {
        commit('deleteTask', id)
        commit('showSnackbar', `Task deleted.`)
      })
    },

    doneTask({ commit }, { id, done }) {
      localforage.setTaskDone(id, done).then(() => {
        commit('doneTask', { id, done })
      }).catch((error) => {
        console.error(error)
      })
    },

    hideSnackbar({ commit }) {
      commit('hideSnackbar');
    },

    setDueDateOfTask({ commit }, { id, localeDateLikeISOString }) {
      localforage.setDueDateOfTask(id, localeDateLikeISOString).then( () => {
        commit('setDueDateOfTask', { id, localeDateLikeISOString })
        commit('showSnackbar', `Task due Date updated.`)
      });
    },

    updateSearchTerm({ commit }, searchTerm) {
      commit('updateSearchTerm', searchTerm)
    },

    setTasks({ commit }, newTasks) {
      commit('setTasks', newTasks)
    },

    getTasks({ commit }) {
      localforage.getAllTasks().then( (tasks) => sortTasksbyOrderField(tasks)).then((tasks) => commit('setTasks', tasks));
    },

    reorderTaskList({ state, commit }, reorderInformation) {
      commit('reorderTaskList', reorderInformation)
      commit('sortTasks')
      localforage.setAllTasks(state.tasks, true)
    }
  },

  /**
   * GETTERS
   */

  getters: {
    tasksFiltered(state) {
      if (!state.searchTerm)
        return state.tasks

      return state.tasks.filter(task => task.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
    },
    numberOfTasks(state) {
      return state.tasks.length
    },
    snackbarText(state) {
      return state.snackbar.text
    },
    snackbarTimeout(state) {
      return state.snackbar.timeout
    },
    getAppTitle(state) {
      return state.appTitle
    }
  }
})

function sortTasksbyOrderField(tasks){
  return new Promise( (resolve) => {
    resolve(tasks.sort( (taskA, taskB) => taskA.order-taskB.order ))
  })
}

// sets the order of tasks after manual sort with draggable by sorting the tasks[].order field between oldIndex and newIndex.
function orderTasksBetweenIndexes(tasks, oldIndex, newIndex){
  if ( oldIndex < newIndex ) {
    const temp = tasks[newIndex].order
    for (let index = newIndex; index > oldIndex; index--) {
      tasks[index].order = tasks[index - 1].order
    }
    tasks[oldIndex].order = temp
  } else {
    const temp = tasks[newIndex].order
    for (let index = newIndex; index <= oldIndex - 1; index++) {
      tasks[index].order = tasks[index + 1].order
    }
    tasks[oldIndex].order = temp
  }
}