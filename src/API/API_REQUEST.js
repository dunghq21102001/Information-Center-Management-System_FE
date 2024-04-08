import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_REQUEST {
    static BASE_PATH = 'Request'

    static getRequests() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Requests`)
    }

    static getRequestById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static getRequestByUserId(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/GetRequestByUser/${id}`)
    }

    static getRequestByReceiver(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/GetRequestByReciever/${id}`)
    }

    static postRequest(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putRequest(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteRequest(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}