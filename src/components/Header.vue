<template>
  <Transition>
    <div
      class="relative"
      v-if="curRoute != 'welcome'"
      :class="`${
        systemStore.getExpandSideBar ? 'w-full ld:w-[80%]' : 'w-full'
      } fixed bg-white top-0 left-0 right-0 duration-500 float-right h-[65px] z-40 border-cus flex justify-between items-center px-5`"
    >
      <div class="absolute top-0 left-0 right-0 bottom-0">
        <CloudAnimation />
      </div>
      <div class="z-10">
        <div class="lg:hidden">
          <v-icon
            @click="isShowMobileMenu = !isShowMobileMenu"
            :name="isShowMobileMenu ? 'io-close-outline' : 'co-hamburger-menu'"
            class="cursor-pointer"
            scale="1.5"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="w-[30px] h-[30px] relative mr-5">
          <v-icon
            @click="isShowNoti = !isShowNoti"
            v-click-outside-element="closeNoti"
            name="io-notifications"
            class="absolute top-0 left-0 cursor-pointer"
            scale="2"
            :fill="`#${systemStore.getTheme.color}`"
          />
          <span
            class="absolute w-[20px] h-[20px] -top-2 -right-2 rounded-full bg-gray-300 text-center leading-[20px]"
          >
            {{ notiList.length }}
          </span>

          <div
            v-if="isShowNoti"
            class="absolute top-[130%] hide-scrollbar w-[200px] md:w-[350px] right-[-80px] md:right-0 bg-white rounded-sm p-2 shadow-lg max-h-[90vh] overflow-y-scroll"
          >
            <span
              class="block text-center font-bold text-gray-600"
              v-if="notiList.length == 0"
            >
              Không có thông báo
            </span>
            <div
              class="my-2 hover:bg-gray-100 px-2 py-1"
              v-for="(item, index) in notiList"
              :key="index"
            >
              <span class="block"> Nội dung: {{ item?.message }} </span>
              <span class="block text-[12px] text-gray-600">
                Nhận vào: {{ convertDate(item?.date) }}
              </span>
            </div>
          </div>
        </div>
        <span class="block z-10 mx-2 font-bold">{{
          authStore.getAuth?.userName
        }}</span>
        <div
          class="w-[50px] h-[50px] relative rounded-full flex items-center justify-center"
        >
          <img
            :src="
              authStore.getAuth?.avatar != null
                ? authStore.getAuth.avatar
                : 'https://static.vecteezy.com/system/resources/previews/004/819/327/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
            "
            @click="isShowProfile = !isShowProfile"
            v-click-outside-element="closeProfile"
            class="w-[50px] h-[50px] object-cover cursor-pointer rounded-full"
            alt="user avatar"
          />
          <div
            v-show="isShowProfile"
            class="absolute right-0 top-[100%] min-w-[100px] py-1 shadow-lg bg-[#f5f1f1]"
          >
            <ul class="w-full text-right">
              <li
                @click="goToRoute('profile')"
                class="hover:bg-blur hover:text-primary cursor-pointer py-2 px-1"
              >
                Hồ sơ
              </li>
              <li
                @click="logout"
                class="hover:bg-blur hover:text-primary cursor-pointer py-2 px-1"
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>

        <div
          v-show="isShowMobileMenu"
          class="fixed top-0 left-0 min-h-screen w-full bg-fog-cus-for-mobile z-20"
          @click.self="hiddenMobileMenu"
        >
          <Transition name="mobile">
            <MobileMenu
              v-show="isShowMobileMenu"
              :is-show-mobile="isShowMobileMenu"
              @update:isShowMobile="isShowMobileMenu = $event"
            />
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { useSystemStore } from "../stores/System";
import MobileMenu from "./MobileMenu.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/Auth";
import func from "../common/func";
import CloudAnimation from "./CloudAnimation.vue";
export default {
  components: {
    MobileMenu,
    CloudAnimation,
  },
  props: {
    notiList: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    const route = useRoute();
    return { systemStore, route, authStore };
  },
  data() {
    return {
      isShowProfile: false,
      isShowNoti: false,
      isShowMobileMenu: false,
      curRoute: "",
    };
  },
  watch: {
    $route(to, from) {
      this.curRoute = this.route.name;
    },
  },
  methods: {
    convertDate(date) {
      return func.convertDateOldVer(date);
    },
    changExpand() {
      this.systemStore.setExpandSideBar();
    },
    closeProfile() {
      this.isShowProfile = false;
    },
    closeNoti() {
      this.isShowNoti = false;
    },
    goToRoute(url) {
      this.$router.push({ name: url });
    },
    hiddenMobileMenu() {
      this.isShowMobileMenu = false;
    },
    logout() {
      if (this.authStore.getAuth?.roleName == "Parent") {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        this.authStore.setAuth(null);
        this.$router.push({ name: "welcome" });
      } else {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        this.authStore.setAuth(null);
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
<style scoped>
.border-cus {
  border-bottom: 1px solid #d8d8d8;
}

.bg-fog-cus-for-mobile {
  background-color: rgba(0, 0, 0, 0.7);
}

.mobile-enter-active,
.mobile-leave-active {
  transition: 0.5s ease;
}

.mobile-enter-from {
  transform: translateX(-100%);
}

.mobile-leave-to {
  /* transform: translateX(-80%); */
}
</style>
