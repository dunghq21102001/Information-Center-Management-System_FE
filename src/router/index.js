import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../views/Page404.vue'


// users
import Managers from '../views/Users/Managers.vue'
import Teachers from '../views/Users/Teachers.vue'
import CreateUser from '../views/Users/Add.vue'
import UpdateUser from '../views/Users/Update.vue'
import Staffs from '../views/Users/Staffs.vue'
import Children from '../views/Users/Children.vue'

// contract
import Contract from '../views/Contracts/Contract.vue'

// attendance
import TodayAttendance from '../views/Attendance/TodayAttendance.vue'
import UserAttendance from '../views/Attendance/UserAttendance.vue'

// calendar
import MyCalendar from '../views/Calendar/MyCalendar.vue'
import UserCalendar from '../views/Calendar/UserCalendar.vue'

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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        // middleware: checkAuth,
      }
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
    {
      path: '/user-create',
      name: 'user-create',
      component: CreateUser,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/user-update/:id',
      name: 'user-update',
      component: UpdateUser,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/today-attendance',
      name: 'today-attendance',
      component: TodayAttendance,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/user-attendance',
      name: 'user-attendance',
      component: UserAttendance,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/my-calendar',
      name: 'my-calendar',
      component: MyCalendar,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/user-calendar',
      name: 'user-calendar',
      component: UserCalendar,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: PageNotFound,
      meta: {
        // middleware: checkAuth,
      }
    },
  ]
})

export default router
