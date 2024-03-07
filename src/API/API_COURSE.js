import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_COURSE {
    static BASE_PATH = 'Course'

    static getCourses() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Courses`)
    }

    static getCourseById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postCourse(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putCourse(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteCourse(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?courseId=${id}`)
    }

    static getEnum() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/CourseType`)
    }
}