<template>
  <div
    class="bg-c"
    :class="`hidden z-[60] bg-white lg:block ${
      systemStore.getExpandSideBar ? 'w-[20%]' : 'w-[50px]'
    } px-3 duration-500 h-screen fixed top-0 left-0 border-cus overflow-y-scroll hide-scrollbar`"
  >
    <div class="w-[70%] mx-auto" v-show="systemStore.getExpandSideBar">
      <img src="../assets/images/logo-nobg.png" alt="logo" />
    </div>
    <div
      v-if="
        authStore.getAuth?.roleName == 'Admin' ||
        authStore.getAuth?.roleName == 'Manager'
      "
      :class="`tab-item ${route.name == 'dashboard' ? 'tab-active' : ''} ${
        systemStore.getExpandSideBar
          ? 'px-2 py-1 hover:pl-4 rounded-lg w-full'
          : 'rounded-none w-[120%]'
      }`"
    >
      <div
        class="flex items-center cursor-pointer"
        @click="goToRoute('dashboard')"
      >
        <v-icon
          name="md-spacedashboard-outlined"
          :scale="systemStore.getExpandSideBar ? 1.5 : 1.5"
          class="mr-5"
        />
        <span> Dashboard </span>
      </div>
    </div>
    <div class="scroll-box mt-5">
      <ul class="w-full">
        <li
          v-for="item in listMenu"
          class="tab-item my-2 px-2 py-1 rounded-lg w-full "
          :class="item.isHidden ? 'hidden' : 'block'"
        >
          <div
            v-if="item.isHidden == false"
            @click="item.isShow = !item.isShow"
            :class="`${item.isActive ? 'tab-active' : ''} ${
              systemStore.getExpandSideBar
                ? 'hover:pl-3 px-2 py-1 w-full rounded-lg'
                : ''
            } relative duration-300 w-full cursor-pointer flex`"
          >
            <v-icon :name="item.icon" scale="1.5" class="mr-5" />
            <span class="text-[14px] lg:text-[16px]">
              {{ item.name }}
            </span>
            <v-icon
              v-show="systemStore.getExpandSideBar"
              name="md-keyboardarrowright"
              :class="`absolute top-[50%] translate-y-[-50%] right-5 duration-150 ${
                item.isShow ? 'rotate-90' : ''
              }`"
            />
          </div>
          <Transition name="child">
            <ul v-show="item.isShow" class="w-full">
              <li
                v-for="child in item.subTab"
                :class="`pl-12 my-1 text-[16px] ${
                  isSubRouteActive(item) == child.url ? 'tab-active' : ''
                } cursor-pointer hover:pl-14 duration-200`"
                @click="goToRoute(child.url)"
              >
                {{ child.name }}
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import menu from "../common/menu";
import { useSystemStore } from "../stores/System";
import { useAuthStore } from "../stores/Auth";
import { useRoute } from "vue-router";

export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    const route = useRoute();
    return { systemStore, route, authStore };
  },
  data() {
    return {
      currentRouteName: null,
      listMenu: null,
    };
  },
  watch: {
    "systemStore.getExpandSideBar": function (newData, oldData) {
      if (newData == false) this.resetMenuData();
    },
    "authStore.getAuth": function (newData, oldData) {
      this.listMenu = menu.sidebarMenu(this.authStore.getAuth?.roleName);
    },
    $route(to, from) {
      this.checkToActiveParentTab(this.route.name);
    },
  },
  mounted() {
    this.listMenu = menu.sidebarMenu(this.authStore.getAuth?.roleName);
  },
  methods: {
    goToRoute(url) {
      this.checkToActiveParentTab(url);
      this.$router.push({ name: url });
    },
    isSubRouteActive(menuItem) {
      const a = menuItem?.subTab.find((item) => item?.url == this.route.name);
      return a?.url;
    },
    resetMenuData() {
      this.listMenu.map((menu) => {
        menu.isActive = false;
        menu.isShow = false;
      });
    },
    checkToActiveParentTab(url) {
      let foundMatch = false;
      let selectedItem = "";
      this.listMenu.forEach((item) => {
        item.subTab.forEach((child) => {
          if (foundMatch) return;
          if (child.url === url) {
            item.isActive = true;
            selectedItem = item.name;
            foundMatch = true;
          } else item.isActive = false;
        });
        if (foundMatch) return;
      });

      this.listMenu.map((item) => {
        if (item.name != selectedItem) item.isActive = false;
      });
    },
  },

  created() {},
};
</script>
<style scoped lang="css">
.border-cus {
  border-right: 1px solid #d8d8d8;
}

.tab-item {
  transition: 0.2s ease-in;
  font-size: 18px;
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

.sd-b {
  box-shadow: 1px 1px 1px 1px black;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #cbcbcb;
}

::-webkit-scrollbar-button:start {
  display: none;
}

::-webkit-scrollbar-button:end {
  display: none;
}

.scroll-box {
  overflow: auto;
  width: 100%;
  max-height: 400px;
  background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(
      50% 0 at 50% 0,
      farthest-side,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
        50% 100% at 50% 100%,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  /* background-color: white; */
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;
}

.bg-c {
  /* background-image: url("https://i.pinimg.com/736x/c6/31/e1/c631e10a45dd593a2c6dda143f577d38.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  background: rgb(148, 187, 233, 1);
  background: linear-gradient(
    250deg,
    rgba(148, 187, 233, 1) 0%,
    rgba(238, 174, 202, 1) 100%
  );
}
</style>
