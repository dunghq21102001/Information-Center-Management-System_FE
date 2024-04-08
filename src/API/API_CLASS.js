import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_CLASS {
    static BASE_PATH = 'Class'

    static getClasses() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Classes`)
    }

    static getClassById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postClass(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putClass(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteClass(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?ClassId=${id}`)
    }

    static getChildrenByClassId(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/GetChildrenByClassId/${id}`)
    }

    static getEnum() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/StatusOfRoom`)
    }

    static getEnumClass() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/StatusOfClass`)
    }

    static changeStatusClass(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ChangeStatusClass`, data)
    }

    static changeTeacherForClass(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ChangeTeacherForClass`, data)
    }

    static exportExcelListChildren(classId) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ExportExcelFile/${classId}`)
    }
}