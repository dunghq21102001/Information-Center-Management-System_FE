<template>
  <div class="w-full">
    <Header
      :noti-list="notiList"
      v-show="
        curRoute != 'login' &&
        curRoute != 'certificate' &&
        curRoute != 'payment-result'
      "
    />
    <Transition name="sidebar">
      <Sidebar
        v-show="
          curRoute != 'login' &&
          curRoute != 'welcome' &&
          curRoute != 'certificate' &&
          curRoute != 'payment-result'
        "
      />
    </Transition>
    <div
      :class="
        curRoute == 'welcome' ||
        curRoute == 'login' ||
        curRoute == 'certificate' ||
        curRoute == 'payment-result'
          ? 'w-full'
          : 'w-full lg:w-[80%] float-right pt-8 main-bg'
      "
    >
      <div
        :class="
          curRoute == 'welcome' ||
          curRoute == 'login' ||
          curRoute == 'certificate' ||
          curRoute == 'payment-result'
            ? 'w-full'
            : 'p-5 w-[90%] mx-auto bg-white rounded-lg'
        "
      >
        <RouterView />
      </div>
    </div>
    <Loading v-show="systemStore.getLoading" />
    <div
      ref="settingBarOpen"
      v-show="
        curRoute != 'login' &&
        curRoute != 'welcome' &&
        curRoute != 'certificate' &&
        curRoute != 'payment-result'
      "
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
import eventBus from './common/EventBus.js'
import { useSystemStore } from "./stores/System";
import Loading from "./components/Loading.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import SettingsBar from "./components/SettingsBar.vue";
import { useRoute } from "vue-router";
import * as signalR from "@aspnet/signalr";
import API_NOTI from "./API/API_NOTI";
import { useAuthStore } from "./stores/Auth";
export default {
  components: {
    Loading,
    Header,
    Sidebar,
    SettingsBar,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    const route = useRoute();
    return { systemStore, route, authStore };
  },
  data() {
    return {
      curRoute: "",
      isShowSettingBar: false,
      notiList: [],
      connection: null,
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
    fetchNoti() {
      if (
        this.authStore.getAuth?.id != null &&
        this.authStore.getAuth?.id != ""
      ) {
        API_NOTI.getNotiByUser(this.authStore.getAuth?.id)
          .then((res) => {
            this.notiList = res.data;
          })
          .catch((err) => {});
      }
    },
    sendNoti(param) {
      // const userId = "434d275c-ff7d-48fa-84e3-bed5ecadca84";
      // this.connection
      //   .invoke("SendMessage", [userId], "mess 134567890")
      //   .catch(function (err) {
      //     console.error("Error while sending notification:", err);
      //   });

      this.connection
        .invoke("SendMessage", param?.userIds, param?.message)
        .catch(function (err) {
          console.error("Error while sending notification:", err);
        });
    },
    triggerNoti(param) {
      console.log('go here');
      console.log(param);
      this.sendNoti(param);
    },
  },
  mounted() {
    eventBus.on("triggerNoti", this.triggerTest);
    const thisVue = this;
    thisVue.connection.on("ReceiveMessage", function (u, message) {
      thisVue.fetchNoti();
    });
  },
  created() {
    this.fetchNoti();
    this.changeTheme();

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://kidproeduservicesv2.azurewebsites.net/notificationHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.connection.start().catch(function (err) {
      return console.error(err.toString());
    });
  },
  beforeDestroy() {
    eventBus.off("triggerNoti", this.triggerNoti);
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

.main-bg {
  background-image: url("./assets/images/main-bg.png");
  background-repeat: repeat;
  background-size: contain;
  min-height: 90vh;
}
</style>
