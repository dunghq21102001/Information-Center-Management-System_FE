import axios from "axios";
import API_BASE from "./API_BASE";

export default class API_EQUIPMENT {
    static BASE_EQUIPMENT = 'Equipment'
    static BASE_CATE = 'CategoryEquipment'



    static equipments() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_EQUIPMENT}/Equipments`)
    }

    static equipmentsById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_EQUIPMENT}/Equipments/${id}`)
    }

    static postEquipments(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_EQUIPMENT}`, data)
    }

    static putEquipments(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_EQUIPMENT}`, data)
    }

    static deleteEquipment(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_EQUIPMENT}?id=${id}`)
    }

    static categoryEquipments() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_CATE}/CategoryEquipments`)
    }

    static categoryEquipmentById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_CATE}/${id}`)
    }

    static postCategoryEquipment(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_CATE}`, data)
    }

    static putCategoryEquipment(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_CATE}`, data)
    }

    static deleteCategoryEquipment(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_CATE}?id=${id}`)
    }


}