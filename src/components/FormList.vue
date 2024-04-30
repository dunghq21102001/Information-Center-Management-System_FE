<template>
  <div class="w-full mt-5 py-5">
    <span class="text-[24px] font-bold text-gray-700 block">{{ title }}</span>
    <input
      type="text"
      placeholder="Tìm kiếm..."
      class="i-cus"
      v-model="searchValue"
      @input="handleSearch"
    />
    <div class="w-full overflow-y-scroll max-h-[65vh] hide-scrollbar">
      <div
        v-for="i in dataProp"
        class="flex items-center justify-between px-3 py-2 brb-cus"
      >
        <label :for="i?.name || i?.fullName" class="block">{{
          i?.name || i?.fullName
        }}</label>
        <input
          :id="i?.name || i?.fullName"
          type="checkbox"
          class="cb-cus"
          v-model="i.select"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-end">
      <button @click="submit" class="btn-primary mt-5 px-3 py-1 rounded-md">
        Lưu
      </button>
    </div>
  </div>
</template>
<script>
import { useSystemStore } from "../stores/System.js";
import { ref, watch } from "vue";
export default {
  props: {
    title: String,
    dataList: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    // Tạo biến reactive cho dataProp
    const dataProp = ref(props.dataList);

    // Watch sự thay đổi của prop 'data' và cập nhật dataProp
    watch(
      () => props.dataList,
      (newValue) => {
        dataProp.value = newValue;
      }
    );

    const systemStore = useSystemStore();

    return {
      dataProp,
      systemStore,
    };
  },
  data() {
    return {
      isConvertToSelect: false,
      // dataProp: this.dataList,
      dataBackup: [],
      searchValue: "",
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
      this.dataBackup = tmpArr;
    },
    submit() {
      this.$emit("handleSubmitList", this.dataProp);
    },
    handleSearch() {
      if (this.searchValue.trim() !== "") {
        this.dataProp = this.dataBackup.filter((item) => {
          if (item?.name) {
            return item.name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
          }
          if (item?.fullName) {
            return item.fullName
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
          }
        });
      } else {
        this.dataProp = [...this.dataBackup];
      }
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
