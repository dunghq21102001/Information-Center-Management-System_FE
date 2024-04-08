<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between">
      <p class="page-sub-title">Danh sách yêu cầu</p>
      <button class="btn-primary px-3 py-1" @click="isCreate = true">
        Tạo yêu cầu
      </button>
    </div>
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="requests"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        excel="request-data"
        csv="request-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateRequest"
        @delete-action="deleteRequest"
      />
    </div>

    <div class="fog-c" v-if="isCreate" @click.self="cancelAll">
      <div
        class="w-[90%] md:w-[70%] lg:w-[50%] bg-white rounded-xl hide-scrollbar overflow-y-scroll p-4"
      >
        <span class="text-[24px] font-bold">Tạo yêu cầu</span><br />
        <select
          name=""
          class="select-primary px-5 py-2 mt-5"
          v-model="selectedRequest"
          id=""
        >
          <option :value="item.value" v-for="item in requestTypes">
            {{ item.display }}
          </option>
        </select>

        <div class="w-full mt-5" v-show="selectedRequest === 'Location'">
          <p class="font-bold text-[20px]">Yêu cầu chuyển cơ sở</p>
          <div class="w-full flex items-center justify-between">
            <select
              name=""
              class="select-primary px-5 py-2 w-[35%]"
              v-model="selectedLocation"
              id=""
            >
              <option :value="item.id" v-for="item in locations">
                {{ item.name }}
              </option>
            </select>
            <input
              type="text"
              placeholder="Mô tả"
              v-model="descriptionText"
              class="i-c w-[60%]"
            />
          </div>
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Class'">
          <p class="font-bold text-[20px]">Yêu cầu chuyển lớp</p>
          class
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Schedule'">
          <p class="font-bold text-[20px]">Yêu cầu nhờ dạy giúp 1 ngày</p>
          schedule
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Equipment'">
          <p class="font-bold text-[20px]">Yêu cầu mượn trang thiết bị</p>
          Equipment
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Refund'">
          <p class="font-bold text-[20px]">Yêu cầu hoàn tiền khoá học</p>
          Refund
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Leave'">
          <p class="font-bold text-[20px]">Yêu cầu xin nghỉ việc</p>
          Leave
        </div>

        <div class="w-full flex items-center justify-end mt-3">
          <button class="btn-primary px-3 py-1" @click="handleCreateRequest">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_REQUEST from "../../API/API_REQUEST.js";
import API_LOCATION from "../../API/API_LOCATION.js";
import tableConfig from "../../common/config/tableConfig.js";
import { useAuthStore } from "../../stores/Auth.js";
import { useSystemStore } from "../../stores/System.js";
import NormalTable from "../NormalTable.vue";
import API_USER from "../../API/API_USER.js";
import swal from "../../common/swal.js";
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
      header: tableConfig.requestTable(),
      requests: [],
      locations: [],
      managersId: [],
      requestTypes: [
        { value: "Class", display: "Đổi lớp" },
        { value: "Location", display: "Đổi cơ sở" },
        { value: "Equipment", display: "Mượn trang thiết bị" },
        { value: "Schedule", display: "Dạy thay" },
        { value: "Refund", display: "Hoàn tiền" },
        { value: "Leave", display: "Xin nghỉ" },
      ],
      isCreate: false,
      descriptionText: "",
      selectedRequest: "Class",
      selectedLocation: "",
    };
  },
  created() {
    this.fetchRequest();
    this.fetchLocation();
    this.fetchRole();
  },
  methods: {
    fetchRequest() {
      this.systemStore.setChangeLoading(true);
      API_REQUEST.getRequestByUserId(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.requests = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    updateRequest(item) {},
    deleteRequest(item) {},
    reloadList() {
      this.fetchRequest();
    },
    fetchLocation() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.locations = res.data;
          this.selectedLocation = res.data[0]?.id;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchRole() {
      this.systemStore.setChangeLoading(true);
      API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a51")
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpData = [];
          res.data.map((item) => {
            tmpData.push(item.id);
          });
          this.managersId = tmpData;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.descriptionText = "";
      this.isCreate = false;
    },
    handleCreateRequest() {
      let data = {
        userIds: null,
        requestDescription: this.descriptionText,
        requestType: this.selectedRequest,
        leaveDate: null,
        teachingDate: null,
        equimentType: null,
        locationId: null,
        fromClassId: null,
        toClassId: null,
        scheduleId: null,
        receiverRefundId: null,
      };
      switch (this.selectedRequest) {
        case "Location":
          data.userIds = this.managersId;
          data.locationId = this.selectedLocation;
          break;
        case "Class":
          break;
        case "Equipment":
          break;
        case "Schedule":
          break;
        case "Refund":
          break;
        case "Leave":
          break;
      }

      this.systemStore.setChangeLoading(true);
      API_REQUEST.postRequest(data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.fetchRequest();
          this.cancelAll();
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
.fog-c {
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

.i-c {
  border: 1px solid rgb(225, 225, 225);
  border-radius: 10px;
  padding: 10px 20px;
}

.i-c:focus {
  outline: none;
}
</style>
