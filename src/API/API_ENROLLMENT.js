import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_ENROLLMENT {
    static BASE_PATH = 'Enrollment'

    static getEnrollments() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Enrollments`)
    }

    static getEnrollmentById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postEnrollment(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putEnrollment(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteEnrollment(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static importExcel(file) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ImportExcelFile`, file)
    }
}