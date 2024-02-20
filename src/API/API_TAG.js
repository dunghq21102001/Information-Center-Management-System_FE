import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_TAG {
    static BASE_PATH = 'Tag'

    static getTags() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Tags`)
    }

    static getTagById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postTag(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putTag(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteTag(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?tagId=${id}`)
    }
}