<template>
  <div class="w-full">
    <Header v-show="curRoute != 'login'"/>
    <Transition name="sidebar">
      <Sidebar v-show="curRoute != 'login'"/>
    </Transition>
    <div class="w-full lg:w-[80%] float-right" >
      <RouterView />
    </div>
    <Loading v-show="systemStore.getLoading" />
  </div>
</template>

<script>
import { useSystemStore } from "./stores/system";
import Loading from "./components/Loading.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Loading,
    Header,
    Sidebar,
  },
  setup() {
    const systemStore = useSystemStore();
    const route = useRoute();
    return { systemStore, route };
  },
  data() {
    return {
      curRoute: "",
    };
  },
  watch: {
    $route(to, from) {
      this.curRoute = this.route.name;
    },
  },
  methods: {
    changeTheme(themeColor) {
      document.body.style.setProperty("--primary-color", `#${this.systemStore.themeColor.color}`);
      document.body.style.setProperty("--blur-color", `#${this.systemStore.themeColor.blur}`);
    },
  },
  created() {
    this.changeTheme()
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
</style>
