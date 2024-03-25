import { useAuthStore } from '../stores/Auth'
import swal from '../common/swal'
export default function role(to, from, next, router) {
    // const user = JSON.parse(localStorage.getItem('userData'))

    const authStore = useAuthStore()
    // authStore.setAuth(user)

    const requiredRole = to.meta.requiredRole;
    const userRole = authStore.getAuth?.roleName

    if (!requiredRole.includes(userRole)) {
        // swal.error('Bạn không có quyền truy cập trang này!')
        next('/profile')
    } else {
        next()
    }
}
