<template>
    <div class="w-full">
      <span class="text-[28px] font-bold block text-gray-700">Rooms</span>
  
      <div class="w-[90%] mx-auto">
        <NormalTable
          :data="data"
          :header="header"
          :is-show-search="true"
          :is-update="true"
          :is-delete="true"
          is-add="division-create"
          excel="division-data"
          csv="division-data"
          :reload="true"
          @reload-action="reloadList"
          @update-action="updateDivision"
          @delete-action="deleteDivision"
        />
      </div>
    </div>
  </template>
  <script>
  import tableConfig from "../../common/config/tableConfig";
  import { useSystemStore } from "../../stores/System";
  import API_ROOM from "../../API/API_ROOM.js";
  import NormalTable from "../../components/NormalTable.vue";
  import swal from "../../common/swal";
import API_DIVISION from "../../API/API_DIVISION";
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
        header: tableConfig.divisionTable(),
        data: [],
      };
    },
    created() {
      this.fetchDivisions();
    },
    methods: {
      fetchDivisions() {
        this.systemStore.setChangeLoading(true);
        API_DIVISION.getDivisions()
          .then((res) => {
            this.data = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      },
      updateDivision(data) {
        this.systemStore.setChangeLoading(true);
        API_DIVISION.putDivision(data)
          .then((res) => {
            swal.success(res.data);
            this.systemStore.setChangeLoading(false);
            this.fetchDivisions();
          })
          .catch((err) => {
            swal.error("Update room failed!");
            this.systemStore.setChangeLoading(false);
          });
      },
      reloadList() {
        this.fetchDivisions();
      },
      deleteDivision(item) {
        swal
          .confirm("Bạn có chắc chắn muốn xoá không?")
          .then((result) => {
            if (result.value) {
              this.systemStore.setChangeLoading(true);
              API_DIVISION.deleteDivision(item?.id)
                .then((res) => {
                  this.systemStore.setChangeLoading(false);
                  swal.success("Xoá thành công!");
                  this.fetchDivisions();
                })
                .catch((err) => {
                  this.systemStore.setChangeLoading(false);
                  swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
                });
            }
          });
      },
    },
  };
  </script>
  