import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_RESOURCE {
    static BASE_PATH = 'Resource'

    static getResources() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Resources`)
    }

    static getResourceById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static getResourceByCourseId(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ResourceByCourseId/${id}`)
    }

    static postResource(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putResource(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteResource(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}