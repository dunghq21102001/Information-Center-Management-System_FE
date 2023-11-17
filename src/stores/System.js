import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
    state: () => ({
        expandSideBar: true,
        loading: false
    }),
    getters: {
        getExpandSideBar: state => {
            return state.expandSideBar
        },
        getLoading: state => {
            return state.loading
        }
    },
    actions: {
        setExpandSideBar() {
            this.expandSideBar = !this.expandSideBar
        },
        setChangeLoading(data) {
            this.loading = data
        }

    },
})