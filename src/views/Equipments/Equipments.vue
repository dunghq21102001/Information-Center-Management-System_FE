<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <span class="text-[28px] font-bold block text-gray-700">Equipments</span>

      <div
        class="w-full flex items-center mt-5 mx-auto justify-start text-[20px]"
      >
        <span
          @click="changeTab(t)"
          class="block px-3 py-1 rounded-lg cursor-pointer mr-3"
          v-for="t in tabs"
          :class="currentTab == t ? 'bg-gray-100' : ''"
        >
          {{ t }}
        </span>
      </div>

      <NormalTable
        v-if="currentTab == 'Equipments'"
        :data="equipmentData"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
        is-add="equipment-create"
        :reload="true"
        @reload-action="reloadData"
        csv="equipment-data"
        excel="equipment-data"
        @delete-action="deleteEquipment"
        @update-action="updateEquipment"
      />
      <NormalTable
        v-else
        :data="categoryData"
        :header="cateHeader"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-expand="true"
        is-add="equipment-create"
        :reload="true"
        csv="category-equipment-data"
        excel="category-equipment-data"
        @reload-action="reloadData"
        @delete-action="deleteCategory"
        @update-action="updateCategory"
      />
    </div>
  </div>
</template>
<script>
import API_EQUIPMENT from "../../API/API_EQUIPMENT";
import { useSystemStore } from "../../stores/System";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
export default {
  components: { NormalTable },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      tabs: ["Equipments", "Categories"],
      currentTab: "Equipments",
      categoryData: [],
      equipmentData: [],
      header: tableConfig.equipmentTable(),
      cateHeader: tableConfig.categoryEquipmentTable()
    };
  },
  created() {
    this.fetchCategoryEquipment();
    this.fetchEquipment()
  },
  methods: {
    changeTab(t) {
      this.currentTab = t;
    },
    fetchCategoryEquipment() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.categoryEquipments()
        .then((res) => {
          this.categoryData = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchEquipment() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.equipments()
        .then((res) => {
          this.equipmentData = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateCategory(data) {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.putCategoryEquipment(data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchCategoryEquipment();
          swal.success("Cập nhật thành công");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false)
          swal.error(err.response?.data)
        });
    },
    updateEquipment(data) {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.putEquipments(data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchEquipment();
          swal.success("Cập nhật thành công");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false)
          swal.error(err.response?.data)
        });
    },
    deleteEquipment(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_EQUIPMENT.deleteEquipment(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchEquipment();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
              });
          }
        });
    },
    deleteCategory(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_EQUIPMENT.deleteCategoryEquipment(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchCategoryEquipment();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
              });
          }
        });
    },
    reloadData(pa) {
      this.fetchCategoryEquipment();
    },
  },
};
</script>
<style scoped></style>
