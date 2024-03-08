<template>
    <div class="w-full">
      <span class="text-[28px] font-bold block text-gray-700">Advice Request</span>
  
      <div class="w-[90%] mx-auto">
        <NormalTable
          :data="data"
          :header="header"
          :is-show-search="true"
          :is-update="true"
          :is-delete="true"
          is-add="advice-request-create"
          excel="advice-request-data"
          csv="advice-request-data"
          :reload="true"
          @reload-action="reloadList"
          @update-action="updateAdvice"
          @delete-action="deleteAdvice"
        />
      </div>
    </div>
  </template>
  <script>
  import tableConfig from "../../common/config/tableConfig";
  import { useSystemStore } from "../../stores/System";
  import API_USER from "../../API/API_USER.js";
  import NormalTable from "../../components/NormalTable.vue";
  import swal from "../../common/swal";
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
        header: tableConfig.roomTable(),
        data: [],
        enum: [],
      };
    },
    created() {
      this.fetchAdvices();
    },
    methods: {
      fetchAdvices() {
        this.systemStore.setChangeLoading(true);
        API_USER.getAdviceRequest()
          .then((res) => {
            this.data = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      },
      updateAdvice(data) {
        this.systemStore.setChangeLoading(true);
        API_USER.putAdviceRequest(data)
          .then((res) => {
            swal.success(res.data);
            this.systemStore.setChangeLoading(false);
            this.fetchAdvices();
          })
          .catch((err) => {
            swal.error("Update room failed!");
            this.systemStore.setChangeLoading(false);
          });
      },
      reloadList() {
        this.fetchAdvices();
      },
      deleteAdvice(item) {
        swal
          .confirm("Are you sure you want to delete this advice request?")
          .then((result) => {
            if (result.value) {
              this.systemStore.setChangeLoading(true);
              API_USER.deleteAdviceRequest(item?.id)
                .then((res) => {
                  this.systemStore.setChangeLoading(false);
                  swal.success("Deleted successfully!");
                  this.fetchAdvices();
                })
                .catch((err) => {
                  this.systemStore.setChangeLoading(false);
                  swal.error("Delete failed! Please try again", 2500);
                });
            }
          });
      },
    },
  };
  </script>
  