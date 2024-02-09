import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_ROLE {
    static BASE_PATH = 'Role'
    static getRoles() {
      return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }
}