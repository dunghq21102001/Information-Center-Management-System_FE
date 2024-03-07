import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_CLASS {
    static BASE_PATH = 'Class'

    static getClasses() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Classes`)
    }

    static getClassById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postClass(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putClass(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteClass(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?ClassId=${id}`)
    }

    static getEnum() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/StatusOfRoom`)
    }
}