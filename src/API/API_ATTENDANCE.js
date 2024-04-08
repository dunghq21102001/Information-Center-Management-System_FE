import axios from "axios"
import API_BASE from "./API_BASE"
export default class API_ATTENDANCE {
    static BASE_PATH = 'Attendance'

    static getAttendance() {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}`)
    }

    // static getAttendanceById(id) {
    //     return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/${id}`)
    // }

    static postAttendance(data) {
        return axios.post(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static putAttendance(data) {
        return axios.put(`${API_BASE.BASE_URL}/${this.BASE_PATH}`, data)
    }

    static deleteAttendance(id) {
        return axios.delete(`${API_BASE.BASE_URL}/${this.BASE_PATH}?id=${id}`)
    }

    static listAttendanceByClassIdAndDate(classId, date, scheduleId) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/ListAttendanceByClassIdAndDateAndScheduleId/${classId}/${date}/${scheduleId}`)
    }

    static attendanceDetail(courseId, childrenId) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/Details/${courseId}/${childrenId}`)
    }

    static attendanceByScheduleId(id) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/AttendanceByScheduleId/${id}`)
    }

    static attendanceByChildrenId(childrenId, startDate, endDate) {
        return axios.get(`${API_BASE.BASE_URL}/${this.BASE_PATH}/AttendanceByChildrenId/${childrenId}/${startDate}/${endDate}`)
    }
}