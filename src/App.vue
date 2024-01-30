<template>
  <div class="w-full">
    <Header v-show="curRoute != 'login'" />
    <Transition name="sidebar">
      <Sidebar v-show="curRoute != 'login' && curRoute != 'welcome'" />
    </Transition>
    <div
      :class="
        curRoute == 'welcome' ? 'w-full' : 'w-full lg:w-[80%] float-right'
      "
    >
      <RouterView />
    </div>
    <Loading v-show="systemStore.getLoading" />
    <div
      ref="settingBarOpen"
      v-show="curRoute != 'login' && curRoute != 'welcome'"
      @click="isShowSettingBar = !isShowSettingBar"
      class="hidden lg:flex fixed bottom-[50%] translate-y-[-50%] bg-blur p-3 cursor-pointer rotate items-center justify-center"
      :class="isShowSettingBar ? 'right-[300px]' : 'right-0'"
    >
      <v-icon
        name="io-settings-sharp"
        :fill="`#${systemStore.getTheme.color}`"
        scale="1.2"
      />
    </div>
    <Transition name="settingbar">
      <SettingsBar ref="settingsBar" v-show="isShowSettingBar" />
    </Transition>
  </div>
</template>

<script>
import { useSystemStore } from "./stores/System";
import Loading from "./components/Loading.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import SettingsBar from "./components/SettingsBar.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Loading,
    Header,
    Sidebar,
    SettingsBar,
  },
  setup() {
    const systemStore = useSystemStore();
    const route = useRoute();
    return { systemStore, route };
  },
  data() {
    return {
      curRoute: "",
      isShowSettingBar: false,
    };
  },
  watch: {
    $route(to, from) {
      this.curRoute = this.route.name;
    },
  },
  methods: {
    changeTheme() {
      document.body.style.setProperty(
        "--primary-color",
        `#${this.systemStore.themeColor.color}`
      );
      document.body.style.setProperty(
        "--blur-color",
        `#${this.systemStore.themeColor.blur}`
      );
    },
    closeSetting() {
      this.isShowSettingBar = false;
    },
  },
  created() {
    this.changeTheme();
  },
};
</script>
<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: 0.5s ease;
}

.sidebar-enter-from {
  transform: translateX(-100%);
}

.sidebar-leave-to {
  transform: translateX(-80%);
}

.rotate {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: 0.3s ease-in;
}

.settingbar-enter-active,
.settingbar-leave-active {
  transition: 0.3s ease-in;
}

.settingbar-enter-from {
  right: -300px;
}

.settingbar-leave-to {
  right: -300px;
}
</style>
