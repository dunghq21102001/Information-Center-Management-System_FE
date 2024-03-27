import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_CHILDRENANSWER {
    static BASE_PATH = 'ChildrenAnswer'

    static getChildrenAnswers() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }

    static getChildrenAnswerById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postChildrenAnswer(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putChildrenAnswer(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteChildrenAnswer(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}