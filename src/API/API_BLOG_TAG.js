import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_BLOG_TAG {
    static BASE_PATH = 'BlogTag'

    static getBlogTags() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/BlogTags`)
    }

    static getBlogTagById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postBlogTag(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putBlogTag(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteBlogTag(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }
}