import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_DIVISION {
    static BASE_PATH = 'Division'

    static getDivisions() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Divisions`)
    }

    static getDivisionById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postDivision(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putDivision(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteDivision(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}