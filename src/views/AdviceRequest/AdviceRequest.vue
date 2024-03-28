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
        :is-receive-advice-request="true"
        is-add="advice-create"
        excel="advice-request-data"
        csv="advice-request-data"
        :reload="true"
        :enum="true"
        :enum-list="enum"
        :locationList="locations"
        @reload-action="reloadList"
        @update-action="updateAdvice"
        @delete-action="deleteAdvice"
        @get-advice-request="getAdviceRequest"
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
import API_SLOT from "../../API/API_SLOT";
import dayjs from "dayjs";
import API_LOCATION from "../../API/API_LOCATION";

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
      locations: [],
    };
  },
  created() {
    this.fetchAdvices();
    this.fetchSlot();
    this.fetchLocations();
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
      // data["userId"] = this.authStore.getAuth?.id;
      // data["statusAdviseRequest"] = 2;
      const slotItem = this.enum.find((item) => {
        if (item?.id == data?.slotId) return item;
      });

      const formattedDate = dayjs(data?.testDate, "M/D/YYYY").format(
        "YYYY-MM-DD"
      );

      const startTime = formattedDate + "T" + slotItem?.startTime;
      const endTime = formattedDate + "T" + slotItem?.endTime;

      data["testDate"] = formattedDate;
      data["startTime"] = startTime;
      data["endTime"] = endTime;
      data["statusAdviseRequest"] =
        data?.statusAdviseRequest == "Pending" ? 1 : 2;

      this.systemStore.setChangeLoading(true);
      API_USER.putAdviceRequest(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchAdvices();
        })
        .catch((err) => {
          swal.error(err?.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    getAdviceRequest(item) {
      item["userId"] = this.authStore.getAuth?.id;
      item["statusAdviseRequest"] = 2;
      this.systemStore.setChangeLoading(true);
      API_USER.putAdviceRequest(item)
        .then((res) => {
          swal.success("Bạn đã nhận phiếu đăng ký tư vấn này thành công");
          this.systemStore.setChangeLoading(false);
          this.fetchAdvices();
        })
        .catch((err) => {
          swal.success(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchSlot() {
      this.systemStore.setChangeLoading(true);
      API_SLOT.getSlots()
        .then((res) => {
          let tmpD = [];
          res.data.map((item) => {
            if (item?.slotType == 2) tmpD.push(item);
          });
          this.enum = tmpD.sort();
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchLocations() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.locations = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
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
