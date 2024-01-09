import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../views/Page404.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'

// users
import Managers from '../views/Users/Managers.vue'
import Teachers from '../views/Users/Teachers.vue'
import CreateUser from '../views/Users/Add.vue'
import UpdateUser from '../views/Users/Update.vue'
import Staffs from '../views/Users/Staffs.vue'
import Children from '../views/Users/Children.vue'

// contract
import Contract from '../views/Contracts/Contract.vue'

// salary
import Salary from '../views/Salary/Salary.vue'

// attendance
import TodayAttendance from '../views/Attendance/TodayAttendance.vue'
import UserAttendance from '../views/Attendance/UserAttendance.vue'

// calendar
import MyCalendar from '../views/Calendar/MyCalendar.vue'
import UserCalendar from '../views/Calendar/UserCalendar.vue'

// courses
import CreateCourse from '../views/Courses/Add.vue'
import Courses from '../views/Courses/Course.vue'

// locations
import Locations from '../views/Locations/Locations.vue'
import CreateLocation from '../views/Locations/Add.vue'

// reports
import Reports from '../views/Reports/Reports.vue'


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
      path: '/login',
      name: 'login',
      component: Login
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
      path: '/courses',
      name: 'courses',
      component: Courses,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/course-create',
      name: 'course-create',
      component: CreateCourse,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/location-create',
      name: 'location-create',
      component: CreateLocation,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/salary',
      name: 'salary',
      component: Salary,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
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
