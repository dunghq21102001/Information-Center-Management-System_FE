import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
    state: () => ({
        expandSideBar: true,
        loading: false,
        themeColor: JSON.parse(localStorage.getItem('theme')) || {
            color: '007d88',
            blur: 'd9eced'
        },
        courseData: []
    }),
    getters: {
        getExpandSideBar: state => {
            return state.expandSideBar
        },
        getLoading: state => {
            return state.loading
        },
        getTheme: state => {
            return state.themeColor
        },
        getCourseData: state => {
            return state.courseData
        }
    },
    actions: {
        setExpandSideBar() {
            this.expandSideBar = !this.expandSideBar
        },
        setChangeLoading(data) {
            this.loading = data
        },
        setChangeTheme(item) {
            this.themeColor = item
        },
        setCourseData(item) {
            this.courseData = item
        }

    },
})