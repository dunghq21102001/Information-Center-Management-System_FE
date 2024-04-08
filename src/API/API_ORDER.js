import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_ORDER {
    static BASE_PATH = 'Order'

    static getOrders() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Orders`)
    }

    static getOrderById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postOrder(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/CreateOrder`, data)
    }
    static postPayment(orderId) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}/CreatePayment?orderId=${orderId}`)
    }

    static putOrder(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteOrder(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static getOrderDetailByOrderId(id) {
        return axios.get(`${API_BASE.BASE_URL}/OrderDetail/GetOrderDetailByOrderId/${id}`)
    }

    static getOrderDetailByOrderIdAftterUpdate(id) {
        return axios.get(`${API_BASE.BASE_URL}/OrderDetail/GetOrderDetailByOrderIdAfterUpdate/${id}`)
    }

    static putOrderDetail(data) {
        return axios.put(`${API_BASE.BASE_URL}/OrderDetail`, data)
    }

    static enumOrderType() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/PayType`)
    }
}