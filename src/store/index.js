import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import * as localforge from './localforage';


// Create a new store instance.
export const store = createStore({
  state: {
    appTitle: import.meta.env.VITE_APP_TITLE,

    searchTerm: null,

    tasks: [
      {
        id: 1,
        title: "Wake up",
        done: false,
        dueDate: '2022-03-15T12:10:52',
      },
      {
        id: 2,
        title: "Eat",
        done: true,
        dueDate: '2022-03-18T10:11:22',
      },
      {
        id: 3,
        title: "Go to sleep",
        done: false,
        dueDate: null,
      },
    ],
    snackbar: {
      show: false,
      text: '',
      timeout: 3000,
    },
    sorting: false,
  },
  mutations: {
    addTask ( state, newTask)  {
      if (!newTask) return;
    
      state.tasks.push(newTask);
    },
    saveTask(state, newTask){
      const task =  state.tasks.filter( (task) => task.id === newTask.id)[0];
      Object.assign(task,newTask);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter( (task) => task.id !== id)
    },
    doneTask(state,{id,done}){
      const found = state.tasks.find( (el) => el.id === id);
      if (found){
        found.done = done;
      }
    },
    setDueDateOfTask(state, {id, localeDateLikeISOString}) {
      const found = state.tasks.find( (el) => el.id === id);
      if (found){
        found.dueDate = localeDateLikeISOString;
      }
    },
    updateSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    isSorting(state, value){
      state.sorting = value
    },
    // Snackbar
    showSnackbar(state, message){
      state.snackbar.text = message;
      state.snackbar.show = true;
      state.snackbar.timeout= state.snackbar.timeout+1; // reset timer
    },
    hideSnackbar(state){
      state.snackbar.show = false;
    },
    setTasks(state, newTasks) {
      state.tasks = newTasks
    },
    
  },
  actions: {
    async addTask ({ commit }, newTitle)  {
      
      const newTask = {
        id: uuidv4(),
        title: newTitle,
        done: false,
        dueDate: null,
      }

      try {
        await localforge.addTask(newTask)
        console.log('saved!')
        commit('addTask', newTitle);
        commit('showSnackbar', `Task \"${ newTitle }\" added.`)
      } catch (error) {
        console.log(error)
      }

    },
    saveTask( { commit }, newTask){
      commit('saveTask', newTask);
      commit('showSnackbar', `Task \"${ newTask.title }\" saved.`)
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', `Task deleted.`)
    },
    doneTask( { commit }, { id, done }){
      commit( 'doneTask', {id, done} )
    },
    hideSnackbar( {commit} ){
      commit('hideSnackbar');
    },
    setDueDateOfTask( { commit }, {id, localeDateLikeISOString}) {
      commit('setDueDateOfTask', {id, localeDateLikeISOString})
      commit('showSnackbar', `Task due Date updated.`)
    },
    updateSearchTerm( { commit }, searchTerm ) {
      commit('updateSearchTerm', searchTerm)
    },
    setTasks( { commit }, newTasks ){
      commit('setTasks', newTasks)
    },
    getTasks( { commit }){
      
    }
  },

  getters: {
    tasksFiltered(state){
      if (!state.searchTerm)
        return state.tasks
      
      return state.tasks.filter( task => task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) )
    },
    numberOfTasks(state){
      return state.tasks.length
    },
    snackbarText(state){
      return state.snackbar.text
    },
    snackbarTimeout(state){
      return state.snackbar.timeout
    },
    getAppTitle(state){
      return state.appTitle
    }
  }
})

