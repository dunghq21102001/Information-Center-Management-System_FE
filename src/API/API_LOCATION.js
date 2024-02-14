import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_LOCATION {
    static BASE_PATH = 'Location'

    static getLocations() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Locations`)
    }

    static getLocationById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postLocation(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putLocation(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteLocation(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}