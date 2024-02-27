import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_NOTI {
    static BASE_PATH = 'Notification'

    static getAllNoti() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Notifications`)
    }

    static getNotiByUser(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Notifications/${id}`)
    }

    static postNoti(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

}