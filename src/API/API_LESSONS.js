import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_LESSON {
    static BASE_PATH = 'Lesson'

    static getLessons() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Lessons`)
    }

    static getLessonById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static getLessonsByCourse(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/LessonByCourse/${id}`)
    }

    static postLesson(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putLesson(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteLesson(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}