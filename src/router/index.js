import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../views/Todo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Todo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
   ]
});

router.beforeEach((to, from) => {
  document.title = `${import.meta.env.VITE_APP_TITLE} - ${capitalize(to.name)}`
  return true
});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default router
