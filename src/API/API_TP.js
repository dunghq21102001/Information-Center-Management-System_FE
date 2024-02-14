import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_TP {
    static BASE_PATH = 'TrainingProgram'
    static BASE_CATE = 'TrainingProgramCategory'

    static getTrainingPrograms() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/TrainingPrograms`)
    }

    static getTrainingProgramById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postTrainingProgram(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putTrainingProgram(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteTrainingProgram(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }


    static getTrainingProgramCategories() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_CATE}/TrainingProgramCategories`)
    }

    static getTrainingProgramCategoryById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_CATE}/${id}`)
    }

    static postTrainingProgramCategory(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_CATE}`, data)
    }

    static putTrainingProgramCategory(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_CATE}`, data)
    }

    static deleteTrainingProgramCategory(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_CATE}?id=${id}`)
    }
}