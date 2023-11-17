import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Managers from '../views/Users/Managers.vue'
import Teachers from '../views/Users/Teachers.vue'
import Children from '../views/Users/Children.vue'
import Staffs from '../views/Users/Staffs.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/managers',
      name: 'managers',
      component: Managers,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/staffs',
      name: 'staffs',
      component: Staffs,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: Teachers,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/children',
      name: 'children',
      component: Children,
      meta: {
        // middleware: checkAuth,
      }
    },
  ]
})

export default router
