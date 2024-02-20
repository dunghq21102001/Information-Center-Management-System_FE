import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_BLOG {
    static BASE_PATH = 'Blog'

    static getBlogs() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Blogs`)
    }

    static getBlogById(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    }

    static postBlog(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putBlog(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteBlog(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static assignToBlog(data) {
        return axios.post(`${API_BASE.BASE_URL}/BlogTag`, data)
    }
}