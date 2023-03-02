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
    }
    
  },
  actions: {
    addTask ({ commit }, newTitle)  {
      commit('addTask', newTitle);
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
    }

  },

  getters: {

  }
})

