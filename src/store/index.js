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
    }
    
  },
  actions: {
    addTask ({ commit }, newTitle)  {
      commit('addTask', newTitle);
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
    },
    doneTask( { commit }, { id, done }){
      commit( 'doneTask', {id, done} )
    }

  },

  getters: {

  }
})

