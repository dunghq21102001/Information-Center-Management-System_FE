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

    static createExam(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/PostExamFinalPractice`, data)
    }

    static examByClass(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ExamByClass/${id}`)
    }

    static putExam(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static importScore(data) {
        return axios.post(`${API_BASE.BASE_URL}/Class/ImportScoreExcelFile`, data)
    }

    static deleteExam(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static getEnumTestType() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/TestType`)
    }
}