import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state: {
    tasks: [
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
    ],
    snackbar: {
      show: false,
      text: '',
      timeout: 30000,
    },
  },
  mutations: {
    addTask ( state, newTaskTitle)  {
      if (!newTaskTitle) return;
    
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      }
      state.tasks.push(newTask);
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
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', `Task deleted.`)
    },
    doneTask( { commit }, { id, done }){
      commit( 'doneTask', {id, done} )
    },
    hideSnackbar( {commit} ){
      commit('hideSnackbar');
    }

  },

  getters: {
    snackbarText(state){
      return state.snackbar.text
    },
    snackbarTimeout(state){
      return state.snackbar.timeout
    }
  }
})

