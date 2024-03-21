import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_EXAM {
    static BASE_PATH = 'Exam'

    static getExams() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Exams`)
    }

    static getExamById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postExam(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putExam(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteExam(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}