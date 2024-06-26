import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_QUESTION {
    static BASE_PATH = 'Question'

    static getQuestions() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Questions`)
    }

    static getQuestionById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static getQuestionByType(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/QuestionsByType?type=${id}`)
    }

    static getQuestionsOrCreateQuiz(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/CreateTest`, data)
    }

    static createTestEntry(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/CreateTestEntry`, data)
    }

    static postQuestion(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putQuestion(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteQuestion(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?QuestionId=${id}`)
    }
}