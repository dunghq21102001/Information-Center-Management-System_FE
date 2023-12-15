import './assets/main.css'
import VueSweetalert2 from 'vue-sweetalert2'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vueClickOutsideElement from 'vue-click-outside-element'
import axios from 'axios'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiMenu2Line, IoNotifications, MdSpacedashboardOutlined, FaFileContract, HiUserGroup, BiCalendarWeek, CoRoom, LaMoneyCheckAltSolid, MdKeyboardarrowdown, MdKeyboardarrowright, GiReceiveMoney, GiPayMoney, GiBookCover, FaRegularEdit, MdDelete, MdTaskalt, SiCoursera } from "oh-vue-icons/icons"

const app = createApp(App)


addIcons(RiMenu2Line, IoNotifications, MdSpacedashboardOutlined, FaFileContract, HiUserGroup, BiCalendarWeek, CoRoom, LaMoneyCheckAltSolid, MdKeyboardarrowdown, MdKeyboardarrowright, GiReceiveMoney, GiPayMoney, GiBookCover, FaRegularEdit, MdDelete, MdTaskalt, SiCoursera )
window.axios = axios
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("token")}` }

// components
app.component("v-icon", OhVueIcon)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('vue-cal', VueCal);

// use
app.use(VueSweetalert2)
app.use(vueClickOutsideElement)
app.use(createPinia())
app.use(router)

app.mount('#app')
