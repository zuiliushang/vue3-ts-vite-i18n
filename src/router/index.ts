import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
const { VITE_HIDE_HOME } = import.meta.env
console.log(VITE_HIDE_HOME, '====')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
})

export default router
