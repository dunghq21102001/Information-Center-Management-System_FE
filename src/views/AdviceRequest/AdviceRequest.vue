<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700"
      >Đăng ký học viên</span
    >

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        is-add="advice-create"
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
import { useAuthStore } from "../../stores/Auth.js";
import API_USER from "../../API/API_USER.js";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
export default {
  components: {
    NormalTable,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      header: tableConfig.adviceRequestTable(),
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
      data["isTested"] = data.isTested == "True" ? true : false;
      data["userId"] = this.authStore.getAuth?.id;
      data["statusAdviseRequest"] = 2;
      this.systemStore.setChangeLoading(true);
      API_USER.putAdviceRequest(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchAdvices();
        })
        .catch((err) => {
          swal.error(err?.response?.data)
          this.systemStore.setChangeLoading(false);
        });
    },
    reloadList() {
      this.fetchAdvices();
    },
    deleteAdvice(item) {
      swal.confirm("Bạn có chắc chắn muốn xoá không?").then((result) => {
        if (result.value) {
          this.systemStore.setChangeLoading(true);
          API_USER.deleteAdviceRequest(item?.id)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
              swal.success("Xoá thành công!");
              this.fetchAdvices();
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
