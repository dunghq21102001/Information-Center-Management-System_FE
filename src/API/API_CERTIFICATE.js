import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_CERTIFICATE {
    static BASE_PATH = 'Certificate'

    static getCertificates() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Certificates`)
    }

    static getCertificateById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postCertificate(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putCertificate(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteCertificate(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}