<template>
  <div class="w-full sd-cus sticky top-0 left-0 right-0 bg-white">
    <div class="w-[98%] md:w-[90%] mx-auto">
      <div
        class="w-full flex items-center justify-center md:justify-between min-h-[100px]"
      >
        <div class="w-[400px]">
          <img :src="getImgUrl" class="w-full cursor-pointer" alt="" @click="goToTab(0)" />
        </div>
        <ul class="hidden items-center justify-between lg:flex">
          <li
            v-for="item in menu"
            @click="goToTab(item.index)"
            class="ml-3 text-[24px] text-primary cursor-pointer hover:bg-blur px-4 py-2 rounded-lg duration-100"
          >
            {{ item.name }}
          </li>
          <button
            @click="goTo('login')"
            class="btn-primary px-4 py-2 rounded-lg ml-3"
          >
            <span class="text-[24px]"> Login </span>
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import menu from "../common/menu";
import { useSystemStore } from "../stores/system";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: {},
  data() {
    return {
      menu: menu.welcomeMenu(),
      imageUrl: "",
    };
  },
  methods: {
    goTo(nameUrl) {
      this.$router.push({ name: nameUrl });
    },
    goToTab(i) {
      this.$emit("changeTab", i);
    },
  },
  computed: {
    getImgUrl() {
      return `../src/assets/images/logo-welcome-${this.systemStore.getTheme.color}.png`;
    },
  },
};
</script>
<style scoped>
.sd-cus {
  box-shadow: 0px 2px 3px 0px #b1b1b1;
}
</style>
