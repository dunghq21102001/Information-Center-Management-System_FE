<template>
  <div class="w-[250px] md:w-[420px] h-screen bg-white overflow-y-scroll">
    <ul class="w-full mt-5">
      <li
        :class="`tab-item my-2 px-2 py-1 rounded-lg w-full`"
        v-for="item in listMenu"
      >
        <div
        v-if="item.isHidden == false"
          @click="item.isShow = !item.isShow"
          :class="`${
            item.isActive ? 'tab-active' : ''
          } relative duration-300 w-full cursor-pointer flex`"
        >
          <v-icon :name="item.icon" scale="1.5" class="mr-5" />
          <span>
            {{ item.name }}
          </span>
          <v-icon
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
              :class="`pl-12 my-1 ${
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
</template>
<script>
import menu from "../common/menu";
import { useRoute } from "vue-router";
import {useAuthStore} from '../stores/Auth'
export default {
  setup() {
    const route = useRoute();
    const authStore = useAuthStore()
    return { route, authStore };
  },
  components: {},
  data() {
    return {
      listMenu: null,
      currentRouteName: null,
    };
  },
  watch: {
    "systemStore.getExpandSideBar": function (newData, oldData) {
      if (newData == false) this.resetMenuData();
    },
    $route(to, from) {
      this.checkToActiveParentTab(this.route.name);
    },
  },
  methods: {
    goToRoute(url) {
      this.checkToActiveParentTab(url);
      this.$router.push({ name: url });
      this.$emit("update:isShowMobile", false);
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
  created() {
    this.listMenu = menu.sidebarMenu(this.authStore.getAuth?.roleName)
  },
};
</script>
<style scoped>
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
</style>
