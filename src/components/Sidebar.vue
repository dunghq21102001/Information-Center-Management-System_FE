<template>
    <div
        :class="`hidden bg-white lg:block ${systemStore.getExpandSideBar ? 'w-[20%]' : 'w-[50px]'} px-3 duration-500 h-screen fixed top-0 left-0 border-cus overflow-y-scroll hide-scrollbar`">
        <div class="w-[70%] mx-auto" v-show="systemStore.getExpandSideBar">
            <img src="../assets/images/logo.png" alt="logo" />
        </div>
        <div
            :class="`tab-item ${route.name == 'dashboard' ? 'is-active' : ''} ${systemStore.getExpandSideBar ? 'px-2 py-1 hover:pl-4 rounded-lg w-full' : 'rounded-none w-[120%]'}`">
            <div class="flex items-center cursor-pointer" @click="goToRoute('dashboard')">
                <v-icon name="md-spacedashboard-outlined" :scale="systemStore.getExpandSideBar ? 1.5 : 1.5" class="mr-5" />
                <span>
                    Dashboard
                </span>
            </div>
        </div>
        <div v-show="systemStore.getExpandSideBar" class="text-[#9e9e9e] text-[14px] mt-10">Apps</div>
        <ul class="w-full">
            <li :class="`tab-item my-2 ${systemStore.getExpandSideBar ? 'px-2 py-1 rounded-lg w-full' : 'rounded-none w-[120%]'}`"
                v-for="item in listMenu">
                <div @click="item.isShow = !item.isShow"
                    :class="`${item.isActive ? 'is-active' : ''} ${systemStore.getExpandSideBar ? 'hover:pl-3 px-2 py-1 w-full rounded-lg' : ''} relative duration-300 w-full cursor-pointer flex`">
                    <v-icon :name="item.icon" scale="1.5" class="mr-5" />
                    <span>
                        {{ item.name }}
                    </span>
                    <v-icon v-show="systemStore.getExpandSideBar" name="md-keyboardarrowright"
                        :class="`absolute top-[50%] translate-y-[-50%] right-5 duration-150 ${item.isShow ? 'rotate-90' : ''}`" />
                </div>
                <Transition name="child">
                    <ul v-show="item.isShow" class="w-full">
                        <li v-for="child in item.subTab"
                            :class="`pl-12 my-1 ${isSubRouteActive(item) == child.url ? 'is-active' : ''} cursor-pointer hover:pl-14 duration-200`"
                            @click="goToRoute(child.url)">
                            {{ child.name }}
                        </li>
                    </ul>
                </Transition>
            </li>
        </ul>
    </div>
</template>
<script>
import { useSystemStore } from '../stores/system';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const systemStore = useSystemStore()
        const route = useRoute()
        return { systemStore, route }
    },
    data() {
        return {
            currentRouteName: null,
            listMenu: [
                {
                    id: 1, name: 'Users', icon: 'hi-user-group', subTab: [
                        { name: 'Managers', url: 'managers' },
                        { name: 'Staffs', url: 'staffs' },
                        { name: 'Teachers', url: 'teachers' },
                        { name: 'Children', url: 'children' },
                    ], isShow: false, isActive: false
                },
                { id: 2, name: 'Contracts', icon: 'fa-file-contract', subTab: [], isShow: false, isActive: false },
                { id: 3, name: 'Calendar', icon: 'bi-calendar-week', subTab: [], isShow: false, isActive: false },
                { id: 4, name: 'Classrooms', icon: 'co-room', subTab: [], isShow: false, isActive: false },
                { id: 5, name: 'Salary', icon: 'la-money-check-alt-solid', subTab: [], isShow: false, isActive: false },
            ]
        }
    },
    watch: {
        'systemStore.getExpandSideBar': function (newData, oldData) {
            if (newData == false) this.resetMenuData()
        },
        '$route'(to, from) {
           this.checkToActiveParentTab(this.route.name)
        },
    },
    methods: {
        goToRoute(url) {
            this.checkToActiveParentTab(url)
            this.$router.push({ name: url })
        },
        isSubRouteActive(menuItem) {
            const a = menuItem?.subTab.find(item => (item?.url == this.route.name))
            return a?.url
        },
        resetMenuData() {
            this.listMenu.map(menu => {
                menu.isActive = false
                menu.isShow = false
            })
        },
        checkToActiveParentTab(url) {
            let foundMatch = false
            this.listMenu.forEach(item => {
                item.subTab.forEach(child => {
                    if (foundMatch) return
                    if (child.url === url) {
                        item.isActive = true
                        foundMatch = true
                    } else item.isActive = false
                })
                if (foundMatch) return
            })
        }
    },

    created() {
    }
}
</script>
<style scoped>
.border-cus {
    border-right: 1px solid #d8d8d8;
}

.tab-item {
    transition: .2s ease-in;
    font-size: 18px;
}

.is-active {
    color: #007d88;
    background-color: #d9eced;
}


.child-enter-active,
.child-leave-active {
    transition: 0.5s ease;
}

.child-enter-from {
    transform: translateY(20%);
    opacity: 1;
}

.child-leave-to {
    transform: translateY(-20%);
    opacity: 0;
}
</style>