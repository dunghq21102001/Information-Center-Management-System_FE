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
        :is-create-account="true"
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
        @create-account="createAccount"
      />
    </div>

    <div class="fog" v-if="isShowSelectedStaff" @click.self="cancelAll">
      <div class="bg-white rounded-md p-4">
        <select name="" class="select-primary px-4 py-1" v-model="selectedStaff" id="">
          <option
            v-for="(item, index) in staffs"
            :key="index"
            :value="item?.id"
          >
            {{ item?.userName }}
          </option>
        </select>

        <div class="w-full mt-4 flex items-center justify-end">
          <button @click="assignStaff" class="btn-primary px-3 py-1">
            Chỉ định
          </button>
        </div>
      </div>
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
      staffs: [],
      isShowSelectedStaff: false,
      selectedStaff: null,
      selectedAR: null,
    };
  },
  created() {
    this.fetchAdvices();
    this.fetchSlot();
    this.fetchLocations();
    this.fetchStaff();
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
    cancelAll() {
      this.selectedStaff = null;
      this.isShowSelectedStaff = false;
      this.selectedAR = null;
    },
    fetchStaff() {
      API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a52")
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.staffs = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    getAdviceRequest(item) {
      this.selectedAR = item;
      this.isShowSelectedStaff = true;
      this.selectedStaff = this.staffs[0]?.id;
    },
    assignStaff() {
      let item = this.selectedAR;
      item["userId"] = this.selectedStaff;
      item["statusAdviseRequest"] = 2;
      this.systemStore.setChangeLoading(true);
      API_USER.putAdviceRequest(item)
        .then((res) => {
          swal.success("Bạn đã chỉ định nhân viên thành công!");
          this.systemStore.setChangeLoading(false);
          this.fetchAdvices();
          this.cancelAll();
        })
        .catch((err) => {
          swal.success(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    removeEmail(email) {
      return email.replace(/@gmail\.com$/, "");
    },
    createAccount(item) {
      console.log(item);
      this.systemStore.setChangeLoading(true);
      API_USER.postUser({
        userName: this.removeEmail(item?.email),
        passwordHash: "User@123",
        fullName: item?.fullName,
        genderType: "Nam",
        email: item?.email,
        phone: item?.phone,
        address: item?.address,
        dateOfBirth: "1999-01-01T00:00:00.827Z",
        avatar:
          "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        roleId: "d5fa55c7-315d-4634-9c73-08dbbc3f3a54",
        createContractViewModel: null,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("Tạo tài khoản cho người dùng này thành công");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
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
<style scoped>
.fog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
