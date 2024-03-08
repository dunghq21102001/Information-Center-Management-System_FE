import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_SEMESTER {
    static BASE_PATH = 'Semester'

    static getSemesters() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Semesters`)
    }

    static getSemesterById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postSemester(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putSemester(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteSemester(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static getSemesterCourse() {
        return axios.get(`${API_BASE.BASE_URL}/SemesterCourse`)
    }

    static postSemesterCourse(data) {
        return axios.post(`${API_BASE.BASE_URL}/SemesterCourse`, data)
    }
}