import { useAuthStore } from '../stores/Auth'
export default function role(to, from, next, router) {
    const user = JSON.parse(sessionStorage.getItem('auth'))

    const authStore = useAuthStore()
    authStore.setAuth(user)

    const requiredRoles = to.meta.requiredRole;
    const userRole = authStore.getAuth

    if (userRole?.listRoles?.[0] !== requiredRole) {
        next('/permission-denied')
    } else {
        next()
    }

}
