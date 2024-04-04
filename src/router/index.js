import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../views/Page404.vue'
import PermissionDenied from '../views/PermissionDenied.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import Welcome from '../views/Welcome.vue'
import checkAuth from '../middleware/auth'
import checkValidRole from '../middleware/role'
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
import CourseDetail from '../views/Courses/CourseDetail.vue'

// lessons
import Lessons from '../views/Lessons/Lessons.vue'
import CreateLesson from '../views/Lessons/Add.vue'

// locations
import Locations from '../views/Locations/Locations.vue'
import CreateLocation from '../views/Locations/Add.vue'

// divisions
import Divisions from '../views/Division/Division.vue'
import CreateDivision from '../views/Division/Add.vue'

// classes
import Classes from '../views/Classes/Classes.vue'
import CreateClass from '../views/Classes/Add.vue'
import ClassDetail from '../views/Classes/ClassDetail.vue'

// enrollment
import Enrollment from '../views/Enrollment/Enrollment.vue'


// equipments
import Equipments from '../views/Equipments/Equipments.vue'
import CreateEquipment from '../views/Equipments/Add.vue'

// advice request
import AdviceRequest from '../views/AdviceRequest/AdviceRequest.vue'
import CreateAdviceRequest from '../views/AdviceRequest/Add.vue'

// blogs
import Blogs from '../views/Blogs/Blogs.vue'
import CreateBlog from '../views/Blogs/Add.vue'

// semester
import Semesters from '../views/Semester/Semesters.vue'
import CreateSemester from '../views/Semester/Add.vue'

// rooms
import Rooms from '../views/Rooms/Rooms.vue'
import CreateRoom from '../views/Rooms/Add.vue'

// order
import OrderList from '../views/OrderList/OrderList.vue'
import OrderDetailList from '../views/OrderList/OrderDetailList.vue'
import ViewOrder from '../views/OrderList/ViewOrder.vue'

// chat
import Chat from '../views/Chat/Chat.vue'
import AnonymousChat from '../views/Chat/AnonymousChat.vue'

// order
import Order from '../views/Order/Order.vue'
import OrderDetail from '../views/Order/OrderDetail.vue'

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
      },
      beforeEnter: checkValidRole
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
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/user-create',
      name: 'user-create',
      component: CreateUser,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
    },
    // {
    //   path: '/user-update/:id',
    //   name: 'user-update',
    //   component: UpdateUser,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager', 'Staff']
    //   }
    // },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent', 'Teacher']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/today-attendance',
      name: 'today-attendance',
      component: TodayAttendance,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/user-attendance',
      name: 'user-attendance',
      component: UserAttendance,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher', 'Parent']
      },
      beforeEnter: checkValidRole
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
    // {
    //   path: '/training-program',
    //   name: 'training-program',
    //   component: TrainingProgram,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager', 'Staff']
    //   }
    // },
    // {
    //   path: '/training-program-create',
    //   name: 'training-program-create',
    //   component: CreateTP,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin']
    //   }
    // },
    {
      path: '/courses',
      name: 'courses',
      component: Courses,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/course-create',
      name: 'course-create',
      component: CreateCourse,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/course-detail/:id',
      name: 'course-detail',
      component: CourseDetail,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
    },
    // {
    //   path: '/lessons',
    //   name: 'lessons',
    //   component: Lessons,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager', 'Staff']
    //   }
    // },
    // {
    //   path: '/lesson-create',
    //   name: 'lesson-create',
    //   component: CreateLesson,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin']

    //   }
    // },
    {
      path: '/divisions',
      name: 'divisions',
      component: Divisions,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/division-create',
      name: 'division-create',
      component: CreateDivision,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/location-create',
      name: 'location-create',
      component: CreateLocation,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/enrollment',
      name: 'enrollment',
      component: Enrollment,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Staff', 'Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/classes',
      name: 'classes',
      component: Classes,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Teacher']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/class-create',
      name: 'class-create',
      component: CreateClass,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/class-detail/:id',
      name: 'class-detail',
      component: ClassDetail,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/blog-create',
      name: 'blog-create',
      component: CreateBlog,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/advice-request',
      name: 'advice-request',
      component: AdviceRequest,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Staff']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/advice-create',
      name: 'advice-create',
      component: CreateAdviceRequest,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Staff']
      },
      beforeEnter: checkValidRole
    },
    // {
    //   path: '/semesters',
    //   name: 'semesters',
    //   component: Semesters,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager']
    //   },
    //   beforeEnter: checkValidRole
    // },
    // {
    //   path: '/semester-create',
    //   name: 'semester-create',
    //   component: CreateSemester,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager']
    //   }
    // },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/room-create',
      name: 'room-create',
      component: CreateRoom,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetail,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/order-list',
      name: 'order-list',
      component: OrderList,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/order-list/:id',
      name: 'order-detail-list',
      component: OrderDetailList,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/view-order/:id',
      name: 'view-order',
      component: ViewOrder,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff', 'Parent']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/equipments',
      name: 'equipments',
      component: Equipments,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/equipment-create',
      name: 'equipment-create',
      component: CreateEquipment,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin', 'Manager', 'Staff']
      },
      beforeEnter: checkValidRole
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
    // {
    //   path: '/anonymous-chat',
    //   name: 'anonymous-chat',
    //   component: AnonymousChat,
    //   meta: {
    //     middleware: checkAuth,
    //     requiredRole: ['Admin', 'Manager', 'Staff']

    //   }
    // },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
      meta: {
        middleware: checkAuth,
        requiredRole: ['Admin']
      },
      beforeEnter: checkValidRole
    },
    // {
    //   path: '/salary',
    //   name: 'salary',
    //   component: Salary,
    //   meta: {
    //     middleware: checkAuth,
    //   }
    // },
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
    {
      path: "/permission-denied",
      name: "permission-denied",
      component: PermissionDenied,
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
