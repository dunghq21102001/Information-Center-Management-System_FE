<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Hợp đồng</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        is-add="contract-create"
        excel="contract-data"
        csv="contract-data"
        :reload="true"
        :enum="true"
        :enum-list="enum"
        @reload-action="reloadList"
        @update-action="updateContract"
        @delete-action="deleteContract"
      />
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_CONTRACT from "../../API/API_CONTRACT.js";
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
      header: tableConfig.contractTable(),
      data: [],
      enum: [],
    };
  },
  created() {
    this.fetchContracts();
    // this.fetchEnum();
  },
  methods: {
    fetchContracts() {
      this.systemStore.setChangeLoading(true);
      API_CONTRACT.getContracts()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateContract(data) {
      this.systemStore.setChangeLoading(true);
      API_CONTRACT.putContract(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchContracts();
        })
        .catch((err) => {
          swal.error("Cập nhật thất bại!");
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_CONTRACT.getEnum()
        .then((res) => {
          this.enum = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    reloadList() {
      this.fetchContracts();
    },
    deleteContract(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_CONTRACT.deleteContract(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchContracts();
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
