import { useAuthStore } from '../stores/Auth'
export default function role(to, from, next, router) {
    // const user = JSON.parse(localStorage.getItem('userData'))

    const authStore = useAuthStore()
    // authStore.setAuth(user)

    const requiredRole = to.meta.requiredRole;
    const userRole = authStore.getAuth?.roleName

    if (!requiredRole.includes(userRole)) {
        next('/permission-denied')
    } else {
        next()
    }
}
