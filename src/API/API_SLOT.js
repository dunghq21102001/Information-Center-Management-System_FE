import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_SLOT {
    static BASE_PATH = 'Slot'

    static getSlots() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Slots`)
    }

   
}