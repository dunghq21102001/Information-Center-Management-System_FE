<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <span class="text-[28px] font-bold block text-gray-700">
        Chuẩn bị trang thiết bị
      </span>
      <div class="flex flex-col mt-5">
        <label class="text-[20px]" for="date">
          Chọn ngày chuẩn bị trang thiết bị
        </label>
        <input
          type="date"
          id="date"
          v-model="currentDate"
          class="w-[200px] border-[1px] border-solid border-black mt-2 px-3 py-1"
          @change="reCallAPI"
        />
      </div>
      <div class="mt-5">
        <NormalTable
          :data="equipments"
          :header="header"
          :excel-custom="true"
          :is-show-search="true"
          :reload="true"
          @reload-action="reloadData"
          csv="equipment-data"
          excel="equipment-data"
          @click-to-row="handleClickToRow"
          @handle-click-excel-custom="handleClickExcelCustom"
        />
      </div>
    </div>

    <!-- prepare list -->
    <div
      class="fog-l"
      v-if="isShowEquipmentsPrepare"
      @click.self="isShowEquipmentsPrepare = false"
    >
      <div
        class="w-[90%] md:w-[50%] lg:w-[30%] bg-white relative p-6 h-[100vh] overflow-y-scroll hide-scrollbar"
      >
        <span class="font-bold text-gray-600 text-[24px]">
          Danh sách thiết bị cần chuẩn bị cho lớp {{ selectedClass }}
        </span>
        <span
          v-if="listEquipmentsPrepare.length == 0"
          class="text-[20px] block text-center mt-10"
        >
          Không có dữ liệu
        </span>
        <div class="w-full flex flex-col items-start mt-4">
          <div
            v-for="(item, index) in listEquipmentsPrepare"
            :key="index"
            class="w-full flex items-center justify-between bb pb-3"
          >
            <div class="w-[50%]">
              <span class="block text-[18px]">
                {{ index + 1 }}. {{ item?.name }}
              </span>
            </div>
            <div class="w-[40%] flex justify-end">
              <span>Số lượng: {{ item?.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_EQUIPMENT from "../../API/API_EQUIPMENT";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/system";

export default {
  components: {
    NormalTable,
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      equipments: [],
      header: tableConfig.prepareTable(),
      currentDate: null,
      listEquipmentsPrepare: [],
      isShowEquipmentsPrepare: false,
      selectedClass: "",
    };
  },
  created() {
    this.getCurrentDate();
    this.getListEquipments();
  },
  methods: {
    getListEquipments() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.getEquipmentByDate(this.currentDate)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.equipments = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleClickToRow(item) {
      this.selectedClass = item?.classCode;
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.getPrepareList(item.classId, item.progress)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.listEquipmentsPrepare = res.data;
          this.isShowEquipmentsPrepare = true;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = today.getDate();
      day = day < 10 ? "0" + day : day;
      this.currentDate = `${year}-${month}-${day}`;
    },
    reCallAPI() {
      this.getListEquipments();
    },
    reloadData() {
      this.getListEquipments();
    },
    handleClickExcelCustom() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.exportExcel(this.currentDate)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `repare-equipment-data-${this.currentDate}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
        });
    },
  },
};
</script>
<style scoped>
.fog-l {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
</style>
