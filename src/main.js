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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CanvasJSChart from '@canvasjs/vue-charts';
import { OhVueIcon, addIcons } from "oh-vue-icons";

import {
    // Directives
    vTooltip,
    vClosePopper,
    // Components
    Dropdown,
    Tooltip,
    Menu
  } from 'floating-vue'
  import 'floating-vue/dist/style.css'

import JsonExcel from "vue-json-excel3";
import { RiMenu2Line, IoNotifications, MdSpacedashboardOutlined, FaFileContract, HiUserGroup, BiCalendarWeek, CoRoom, LaMoneyCheckAltSolid, MdKeyboardarrowdown, MdKeyboardarrowright, GiReceiveMoney, GiPayMoney, GiBookCover, FaRegularEdit, MdDelete, MdTaskalt, SiCoursera, MdHighlightoffRound, BiCheckCircle, BiCircleHalf, FaUserAlt, FaKey, CoGmail, BiEyeFill, BiEyeSlashFill, CoHamburgerMenu, IoCloseOutline, IoLocationSharp, HiSolidDocumentReport, HiDownload, IoSettingsSharp, HiNewspaper, BiChatDotsFill, BiEmojiSmileFill, BiCartPlusFill, GiBookshelf, MdPlaylessonRound, PxDevices, ViFileTypeExcel, LaFileCsvSolid, CoReload, MdLockresetOutlined, BiDiagram3Fill, MdChildcare, MdImageaspectratioSharp, BiQuestionCircleFill, HiDocumentText, SiGoogleclassroom, ViFileTypeKey, FaTasks, BiPlusCircle, GiArchiveRegister } from "oh-vue-icons/icons"

const app = createApp(App)


addIcons(RiMenu2Line, IoNotifications, MdSpacedashboardOutlined, FaFileContract, HiUserGroup, BiCalendarWeek, CoRoom, LaMoneyCheckAltSolid, MdKeyboardarrowdown, MdKeyboardarrowright, GiReceiveMoney, GiPayMoney, GiBookCover, FaRegularEdit, MdDelete, MdTaskalt, SiCoursera, MdHighlightoffRound, BiCheckCircle, BiCircleHalf, FaUserAlt, FaKey, CoGmail, BiEyeFill, BiEyeSlashFill, CoHamburgerMenu, IoCloseOutline, IoLocationSharp, HiSolidDocumentReport, HiDownload, IoSettingsSharp, HiNewspaper, BiChatDotsFill, BiEmojiSmileFill, BiCartPlusFill, GiBookshelf, MdPlaylessonRound, PxDevices, ViFileTypeExcel, LaFileCsvSolid, CoReload, MdLockresetOutlined, BiDiagram3Fill, MdChildcare, MdImageaspectratioSharp, BiQuestionCircleFill, HiDocumentText, SiGoogleclassroom, ViFileTypeKey, FaTasks, BiPlusCircle, GiArchiveRegister )
window.axios = axios
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem("token")}` }

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

// components
app.component("v-icon", OhVueIcon)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('vue-cal', VueCal);
app.component('VueDatePicker', VueDatePicker);
app.component("downloadExcel", JsonExcel);

app.directive('tooltip', vTooltip)
app.directive('close-popper', vClosePopper)

app.component('VDropdown', Dropdown)
app.component('VTooltip', Tooltip)
app.component('VMenu', Menu)

// use
app.use(VueSweetalert2)
app.use(vueClickOutsideElement)
app.use(createPinia())
app.use(router)
app.use(CanvasJSChart)
app.use(PrimeVue);

app.mount('#app')
