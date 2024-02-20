import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_ROOM {
    static BASE_PATH = 'Room'

    static getRooms() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Rooms`)
    }

    static getRoomById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postRoom(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putRoom(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteRoom(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static getEnum() {
        return axios.get(`${API_BASE.BASE_URL}/Enum/StatusOfRoom`)
    }
}