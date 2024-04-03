import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_SCHEDULE {
    static BASE_PATH = 'Schedule'

    static getSchedules() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Schedules`)
    }

    static getScheduleById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postSchedule(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static getAutomaticalySchedule(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/GetAutomaticalySchedule/${id}`)
    }

    static createAutomaticalySchedule() {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/CreateAutomaticalySchedule`)
    }

    static putSchedule(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteSchedule(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}