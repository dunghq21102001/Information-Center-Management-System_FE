<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto py-3">
      <div class="w-full">
        <div class="w-full py-2 flex items-center justify-between">
          <span class="text-primary text-[24px]">Theme Color</span>
          <button class="btn-primary px-3 py-1 rounded-lg">
            Add new theme
          </button>
        </div>
        <div class="w-full grid grid-cols-12 gap-4">
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            v-for="item in themeList"
          >
            <SkeletonLoading :color="item" />
            <button
              class="btn-primary px-3 py-1 rounded-md"
              @click="changeTheme(item)"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoading from "../components/SkeletonLoading.vue";
import { useSystemStore } from "../stores/system";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: { SkeletonLoading },
  data() {
    return {
      currentTheme: "",
      themeList: [
        { color: "007d88", blur: "d9eced" },
        { color: "4486f4", blur: "e2eaf7" },
        { color: "d9535a", blur: "f1ddde" },
        { color: "f4dc70", blur: "fdfbf0" },
      ],
    };
  },
  created() {
    this.currentTheme = this.systemStore.getTheme.color;
  },
  methods: {
    changeTheme(themeColor) {
      this.currentTheme = themeColor;
      this.systemStore.setChangeTheme(themeColor);
      localStorage.removeItem("theme");
      localStorage.setItem("theme", JSON.stringify(themeColor));
      document.body.style.setProperty(
        "--primary-color",
        `#${themeColor.color}`
      );
      document.body.style.setProperty("--blur-color", `#${themeColor.blur}`);
    },
  },
};
</script>
