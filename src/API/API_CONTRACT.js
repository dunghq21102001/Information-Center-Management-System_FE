import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_CONTRACT {
    static BASE_PATH = 'Contract'

    static getContracts() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Contracts`)
    }

    static getContractById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postContract(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putContract(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteContract(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static getConfigType() {
        return axios.get(`${API_BASE.BASE_URL}/ConfigJobType/ConfigJobTypes`)
    }
}