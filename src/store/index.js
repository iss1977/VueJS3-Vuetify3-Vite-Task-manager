import { createStore } from 'vuex'

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
  },
  mutations: {
    addTask ( state, newTaskTitle)  {
      if (!newTaskTitle) return;
    
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      }
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
    // Snackbar
    showSnackbar(state, message){
      state.snackbar.text = message;
      state.snackbar.show = true;
      state.snackbar.timeout= state.snackbar.timeout+1; // reset timer
    },
    hideSnackbar(state){
      state.snackbar.show = false;
    }
    
  },
  actions: {
    addTask ({ commit }, newTitle)  {
      commit('addTask', newTitle);
      commit('showSnackbar', `Task \"${ newTitle }\" added.`)
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
    }

  },

  getters: {
    tasksFiltered(state){
      if (!state.searchTerm)
        return state.tasks
      
      return state.tasks.filter( task => task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) )
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

