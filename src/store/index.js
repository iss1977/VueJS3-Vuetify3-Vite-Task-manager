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
      console.log('Executing addTask mutation with newTask:', newTask)
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
      console.log('New tasks:', newTasks)
      state.tasks = newTasks
    },

    reorderTaskList(state, reorderInformation) {
      [state.tasks[reorderInformation.oldTaskIndex].order, state.tasks[reorderInformation.newTaskIndex].order] = [state.tasks[reorderInformation.newTaskIndex].order, state.tasks[reorderInformation.oldTaskIndex].order]
    },

    sortTasks( state ){
      orderTasks(state.tasks).then( ( tasks ) => state.tasks =tasks )
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
        console.log('Sending to commit new task: ', newTask)
        commit('showSnackbar', `Task \"${newTitle}\" added.`)
      } catch (error) {
        console.log(error)
      }

    },

    saveTask({ commit }, newTask) {
      commit('saveTask', newTask);
      commit('showSnackbar', `Task \"${newTask.title}\" saved.`)
    },

    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', `Task deleted.`)
    },

    doneTask({ commit }, { id, done }) {
      localforage.setTaskDone(id, done).then(() => {
        commit('doneTask', { id, done })
      }).catch((error) => {
        console.log(error)
      })
    },

    hideSnackbar({ commit }) {
      commit('hideSnackbar');
    },

    setDueDateOfTask({ commit }, { id, localeDateLikeISOString }) {
      commit('setDueDateOfTask', { id, localeDateLikeISOString })
      commit('showSnackbar', `Task due Date updated.`)
    },

    updateSearchTerm({ commit }, searchTerm) {
      commit('updateSearchTerm', searchTerm)
    },

    setTasks({ commit }, newTasks) {
      commit('setTasks', newTasks)
    },

    getTasks({ commit }) {
      localforage.getAllTasks().then( (tasks) => orderTasks(tasks)).then((tasks) => commit('setTasks', tasks));
    },

    reorderTaskList({ state, commit }, reorderInformation) {
      console.log('New reorder information in store actions:', reorderInformation)
      commit('reorderTaskList', reorderInformation)
      commit('sortTasks')
      localforage.setAllTasks(state.tasks, true).then(() => console.log('actions: save done'))
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

function orderTasks(tasks){
  return new Promise( (resolve) => {
    resolve(tasks.sort( (taskA, taskB) => taskA.order-taskB.order ))
  })
}