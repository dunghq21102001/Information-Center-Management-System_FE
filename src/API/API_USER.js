import axios from "axios";
import API_BASE from "./API_BASE";

export default class API_USER {
    static BASE_PATH = 'User'
    static login(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Login`, data)
    }

    static users() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }

    static postUser(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Register`, data)
    }

    static putUser(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteUser(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static userById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static userByRole(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/UserByRoleId/${id}`)
    }

    static resetPassword(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ChangePassword`, data)
    }

    static changeStatus(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ChangeStatus`, data)
    }

    static getChildrenByStaff() {
        return axios.get(`${API_BASE.BASE_URL}/Children/GetChildrensByStaffId`)
    }

    static getChildrenByParent(id) {
        return axios.get(`${API_BASE.BASE_URL}/Children/GetChildrenByParentId/${id}`)
    }

    static postChildren(data) {
        return axios.post(`${API_BASE.BASE_URL}/Children`, data)
    }

    static putChildren(data) {
        return axios.put(`${API_BASE.BASE_URL}/Children`, data)
    }

    static postAdviceRequest(data) {
        return axios.post(`${API_BASE.BASE_URL}/AdviseRequest`, data)
    }

    static getAdviceRequest() {
        return axios.get(`${API_BASE.BASE_URL}/AdviseRequest/AdviseRequests`)
    }

    static putAdviceRequest(data) {
        return axios.put(`${API_BASE.BASE_URL}/AdviseRequest`, data)
    }

    static getListTestDate(date) {
        return axios.get(`${API_BASE.BASE_URL}/AdviseRequest/GetTestDate/${date}`)
    }

    static deleteAdviceRequest(id) {
        return axios.delete(`${API_BASE.BASE_URL}/AdviseRequest?id=${id}`)
    }

    static enumAdviceRequest() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/StatusAdviseRequest`)
    }

    static getClassesByChildrenId(id) {
        return
    }

}