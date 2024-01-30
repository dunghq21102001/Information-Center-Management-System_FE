import { useAuthStore } from '../stores/Auth'
export default function auth({ next, router }) {
    const token = localStorage.getItem('token');
    if (token) {
        window.axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return next()
    }
    else window.location.href = "/welcome"

}
