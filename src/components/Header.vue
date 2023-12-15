<template>
    <Transition>
        <div
            :class="`${systemStore.getExpandSideBar ? 'w-full ld:w-[80%]' : 'w-full'} sticky top-0 left-0 right-0 duration-500 float-right h-[65px] z-30 border-cus flex justify-between items-center px-5`">
            <div></div>
            <!-- <v-icon @click="changExpand" name="ri-menu-2-line"
                :class="`cursor-pointer ${systemStore.getExpandSideBar ? '' : 'ml-[50px]'}`" /> -->
            <div class="flex items-center justify-between">
                <div class="w-[30px] h-[30px] relative mr-5">
                    <v-icon name="io-notifications" class="absolute top-0 left-0 cursor-pointer" scale="2" fill="#007d88" />
                    <span
                        class="absolute w-[20px] h-[20px] -top-2 -right-2 rounded-full bg-gray-300 text-center leading-[20px]">0</span>
                </div>
                <div class="w-[50px] h-[50px] relative rounded-full">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/819/327/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                        @click="isShowProfile = !isShowProfile" v-click-outside-element="closeProfile"
                        class="absolute top-0 left-0 object-fill cursor-pointer rounded-full" alt="" />
                    <div v-show="isShowProfile"
                        class="absolute right-0 top-[100%] min-w-[100px] py-1 shadow-lg bg-[#f5f1f1]">
                        <ul class="w-full text-right">
                            <li @click="goToRoute('profile')"
                                class="hover:bg-[#d9eced] hover:text-[#007d88] cursor-pointer py-2 px-1">
                                Profile
                            </li>
                            <li class="hover:bg-[#d9eced] hover:text-[#007d88] cursor-pointer py-2 px-1">Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script>
import { useSystemStore } from '../stores/system'

export default {
    setup() {
        const systemStore = useSystemStore()
        return { systemStore }
    },
    data() {
        return {
            isShowProfile: false
        }
    },
    methods: {
        changExpand() {
            this.systemStore.setExpandSideBar()
        },
        closeProfile() {
            this.isShowProfile = false
        },
        goToRoute(url) {
            this.$router.push({ name: url })
        }
    }
}
</script>
<style scoped>
.border-cus {
    border-bottom: 1px solid #d8d8d8;
}
</style>