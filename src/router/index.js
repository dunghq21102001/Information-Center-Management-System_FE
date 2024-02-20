import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../views/Page404.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import Welcome from '../views/Welcome.vue'
import checkAuth from '../middleware/auth'
import PaymentResult from '../views/Payment/PaymentResult.vue'

// users
import Users from '../views/Users/Users.vue'
import CreateUser from '../views/Users/Add.vue'
import UpdateUser from '../views/Users/Update.vue'

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

// training program
import TrainingProgram from '../views/TrainingProgram/TrainingProgram.vue'
import CreateTP from '../views/TrainingProgram/Add.vue'

// courses
import CreateCourse from '../views/Courses/Add.vue'
import Courses from '../views/Courses/Course.vue'

// lessons
import Lessons from '../views/Lessons/Lessons.vue'
import CreateLesson from '../views/Lessons/Add.vue'

// locations
import Locations from '../views/Locations/Locations.vue'
import CreateLocation from '../views/Locations/Add.vue'

// equipments
import Equipments from '../views/Equipments/Equipments.vue'
import CreateEquipment from '../views/Equipments/Add.vue'

// blogs
import Blogs from '../views/Blogs/Blogs.vue'
import CreateBlog from '../views/Blogs/Add.vue'

// semester
import Semesters from '../views/Semester/Semesters.vue'
import CreateSemester from '../views/Semester/Add.vue'

// rooms
import Rooms from '../views/Rooms/Rooms.vue'
import CreateRoom from '../views/Rooms/Add.vue'

// chat
import Chat from '../views/Chat/Chat.vue'
import AnonymousChat from '../views/Chat/AnonymousChat.vue'

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
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
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
        middleware: checkAuth,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      }
    },
    {
      path: '/user-create',
      name: 'user-create',
      component: CreateUser,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      }
    },
    {
      path: '/user-update/:id',
      name: 'user-update',
      component: UpdateUser,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      }
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      }
    },
    {
      path: '/today-attendance',
      name: 'today-attendance',
      component: TodayAttendance,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      }
    },
    {
      path: '/user-attendance',
      name: 'user-attendance',
      component: UserAttendance,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      }
    },
    {
      path: '/my-calendar',
      name: 'my-calendar',
      component: MyCalendar,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      }
    },
    {
      path: '/user-calendar',
      name: 'user-calendar',
      component: UserCalendar,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      }
    },
    {
      path: '/training-program',
      name: 'training-program',
      component: TrainingProgram,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      }
    },
    {
      path: '/training-program-create',
      name: 'training-program-create',
      component: CreateTP,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/course-create',
      name: 'course-create',
      component: CreateCourse,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']

      }
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: Lessons,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      }
    },
    {
      path: '/lesson-create',
      name: 'lesson-create',
      component: CreateLesson,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']

      }
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/location-create',
      name: 'location-create',
      component: CreateLocation,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/blog-create',
      name: 'blog-create',
      component: CreateBlog,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/semesters',
      name: 'semesters',
      component: Semesters,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/semester-create',
      name: 'semester-create',
      component: CreateSemester,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/room-create',
      name: 'room-create',
      component: CreateRoom,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/equipments',
      name: 'equipments',
      component: Equipments,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/equipment-create',
      name: 'equipment-create',
      component: CreateEquipment,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      }
    },
    {
      path: '/anonymous-chat',
      name: 'anonymous-chat',
      component: AnonymousChat,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']

      }
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']

      }
    },
    {
      path: '/salary',
      name: 'salary',
      component: Salary,
      meta: {
        middleware: checkAuth,
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      }
    },
    {
      path: '/payment-result',
      name: 'payment-result',
      component: PaymentResult,
      meta: {
        // middleware: checkAuth,
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        // middleware: checkAuth,
      },
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


function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

// const defaultTitle = 'LOG OT'
router.beforeEach((to, from, next) => {
  // document.title = to.name.toUpperCase() || defaultTitle
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})


export default router
