import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_DASHBOARD {
    static BASE_PATH = 'Dashboard'

    static getData(sD, eD) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}?startTime=${sD}&endTime=${eD}`)
    }

}