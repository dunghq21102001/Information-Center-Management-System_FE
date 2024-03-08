<template>
  <div class="w-full mt-5 py-5">
    <span class="text-[24px] font-bold text-gray-700">{{ title }}</span>
    <div class="w-full overflow-y-scroll max-h-[75vh] hide-scrollbar">
      <div
        v-for="i in dataProp"
        class="flex items-center justify-between px-3 py-2 brb-cus"
      >
        <label :for="i?.name" class="block">{{ i?.name }}</label>
        <input
          :id="i?.name"
          type="checkbox"
          class="cb-cus"
          v-model="i.select"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-end">
      <button @click="submit" class="btn-primary mt-5 px-3 py-1 rounded-md">
        Save
      </button>
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../stores/System.js";
export default {
  props: {
    title: String,
    data: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      isConvertToSelect: false,
      dataProp: this.data,
    };
  },
  created() {
    this.convertToSelect();
  },
  methods: {
    convertToSelect() {
      let tmpArr = [];
      tmpArr = this.dataProp.map((item) => {
        item["select"] = false;
        return item;
      });
      this.dataProp = tmpArr;
    },
    submit() {
      this.$emit("handleSubmitList", this.dataProp);
    },
  },
};
</script>
<style scoped>
.brb-cus {
  border-bottom: 1px solid #f5f5f5;
}

input.cb-cus {
  transform: scale(1.4);
}
</style>
