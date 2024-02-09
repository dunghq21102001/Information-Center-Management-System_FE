import axios from "axios";
import API_BASE from "./API_BASE";

export default class API_USER {
    static BASE_PATH = 'User'
    static login(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Login`, data)
    }

    static users() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }

    static postUser(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Register`, data)
    }

    static userById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }
}