import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_TRANSACTION {
    static BASE_PATH = 'Transaction'

    static getTransaction() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }

    static getTransactionById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/GetTransactionDetailByTransactionId/${id}`)
    }
}