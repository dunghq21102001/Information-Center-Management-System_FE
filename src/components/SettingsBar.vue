<template>
  <div class="w-[300px] h-screen fixed top-0 right-0 z-50 bg-cus p-4">
    <span class="text-primary text-[24px]">Theme Colors</span>
    <div class="w-full grid grid-cols-12 gap-3 mt-5">
      <div
        v-for="item in themeList"
        @click="changeTheme(item)"
        class="col-span-6 sharp-cus my-5 cursor-pointer"
      >
        <div
          class="br-cus w-full h-full"
          :style="{ backgroundColor: `#${item.color}` }"
        ></div>
        <div
          class="choose mt-3 mx-auto cursor-pointer"
          @click="changeTheme(item)"
        >
          <div
            v-show="systemStore.getTheme.color == item.color"
            class="is-active"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../stores/system";

export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      themeList: [
        { color: "007d88", blur: "d9eced" },
        { color: "4486f4", blur: "e2eaf7" },
        { color: "d9535a", blur: "f1ddde" },
        { color: "f4dc70", blur: "fdfbf0" },
      ],
    };
  },
  methods: {
    changeTheme(themeColor) {
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
<style scoped>
.bg-cus {
  background-color: white;
  border-left: 1px solid #c7c7c7;
}

.sharp-cus {
  border: 1px solid rgb(210, 210, 210);
  height: 70px;
  padding: 5px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}

.br-cus {
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}

.choose {
  width: 15px;
  height: 15px;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.is-active {
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
}
</style>
