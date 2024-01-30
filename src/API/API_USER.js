import axios from "axios";
import API_BASE from "./API_BASE";

export default class API_USER {
    static BASE_PATH = 'User'
    static login(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Login`, data)
    }
}