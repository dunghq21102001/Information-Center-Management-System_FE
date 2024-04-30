<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between">
      <p class="page-sub-title">
        Danh sách yêu cầu đã gửi
        {{
          authStore.getAuth?.roleName == "Admin" ||
          authStore.getAuth?.roleName == "Manager"
            ? "của người dùng"
            : null
        }}
      </p>
      <button
        v-if="
          authStore.getAuth?.roleName != 'Admin' &&
          authStore.getAuth?.roleName != 'Manager'
        "
        class="btn-primary px-3 py-1"
        @click="isCreate = true"
      >
        Tạo yêu cầu
      </button>
    </div>
    <div
      v-if="
        authStore.getAuth?.roleName != 'Admin' &&
        authStore.getAuth?.roleName != 'Manager'
      "
      class="w-[90%] mx-auto"
    >
      <NormalTable
        :data="requestsOfUsers"
        :header="header"
        :is-show-search="true"
        :is-delete="true"
        excel="request-data"
        csv="request-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateRequest"
        @delete-action="deleteRequest"
      />
    </div>
    <div class="w-[90%] mx-auto" v-else>
      <NormalTable
        :data="requests"
        :header="header"
        :is-show-search="true"
        :is-delete="true"
        excel="request-data"
        csv="request-data"
        :reload="true"
        :isApprove="true"
        @reload-action="reloadList"
        @update-action="updateRequest"
        @delete-action="deleteRequest"
        @approve-action="handleApprove"
      />
    </div>

    <p
      v-if="
        authStore.getAuth?.roleName != 'Admin' &&
        authStore.getAuth?.roleName != 'Parent' &&
        authStore.getAuth?.roleName != 'Manager'
      "
      class="block page-sub-title mt-f"
    >
      Danh sách yêu cầu đã nhận
    </p>
    <div
      class="w-[90%] mx-auto"
      v-if="
        authStore.getAuth?.roleName != 'Admin' &&
        authStore.getAuth?.roleName != 'Parent' &&
        authStore.getAuth?.roleName != 'Manager'
      "
    >
      <NormalTable
        :data="requestByUserReceiver"
        :header="header"
        :is-show-search="true"
        :is-delete="true"
        excel="request-data"
        csv="request-data"
        :reload="true"
        :isApprove="true"
        @reload-action="reloadList"
        @update-action="updateRequest"
        @delete-action="deleteRequest"
        @approve-action="handleApproveReceiver"
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
          <p class="font-bold text-[20px] mb-2">Yêu cầu chuyển cơ sở</p>
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
          <p class="font-bold text-[20px] mb-2">Yêu cầu chuyển lớp</p>
          <div class="w-full flex items-center justify-between">
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Từ lớp</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="selectedClassByTeacher"
                id=""
              >
                <option :value="item.id" v-for="item in classTeachByTeacher">
                  {{ item.classCode }}
                </option>
              </select>
            </div>
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Sang lớp</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="selectedClassPending"
                id=""
              >
                <option :value="item" v-for="item in classPending">
                  {{ item.classCode }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Schedule'">
          <p class="font-bold text-[20px] mb-2">Yêu cầu dạy thay</p>
          <div class="w-full flex items-center justify-between">
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Lớp</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                @change="handleChangeClass"
                id=""
              >
                <option :value="item.id" v-for="item in classOfScheduleData">
                  {{ item.classCode }}
                </option>
              </select>
            </div>
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Người dạy</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                @change="teacherSelected"
                id=""
              >
                <option :value="item.id" v-for="item in teachersData">
                  {{ item.fullName }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Lịch</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="scheduleSelected"
                id=""
              >
                <option :value="item?.id" v-for="item in scheduleData">
                  {{ item.dayInWeek }}
                </option>
              </select>
            </div>
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Ngày</span>
              <input
                type="date"
                v-model="teachingDate"
                class="w-full px-3 py-1"
              />
            </div>
          </div>
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'ChildrenClass'">
          <p class="font-bold text-[20px] mb-2">Yêu cầu đổi lớp</p>
          <div class="w-full flex items-center justify-between">
            <div class="w-full flex items-start flex-col">
              <span class="text-[18px] block mb-1">Trẻ</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                @change="handleChangeChildren"
                id=""
              >
                <option :value="item.id" v-for="item in childrenData">
                  {{ item.fullName }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Từ lớp</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="selectedClassOfChildren"
                id=""
              >
                <option
                  :value="item?.classId"
                  v-for="item in classOfChildrenData"
                >
                  {{ item.classCode }}
                </option>
              </select>
            </div>
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Sang lớp</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="selectedClassPending"
                id=""
              >
                <option :value="item" v-for="item in classPending">
                  {{ item.classCode }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Refund'">
          <p class="font-bold text-[20px] mb-2">Yêu cầu hoàn tiền khoá học</p>
          <div class="w-full flex items-center justify-between">
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Trẻ</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                @change="handleChangeChildren"
                id=""
              >
                <option :value="item.id" v-for="item in childrenData">
                  {{ item.fullName }}
                </option>
              </select>
            </div>
            <div class="w-[45%] flex items-start flex-col">
              <span class="text-[18px] block mb-1">Khoá học</span>
              <select
                name=""
                class="select-primary px-5 py-2 w-full"
                v-model="selectedCourse"
                id=""
              >
                <option :value="item?.courseCode" v-for="item in coursesData">
                  {{ item.courseCode }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'ChildrenReserve'">
          <p class="font-bold text-[20px] mb-2">Yêu cầu bảo lưu</p>
          ChildrenReserve
        </div>
        <div class="w-full mt-5" v-show="selectedRequest === 'Leave'">
          <p class="font-bold text-[20px] mb-2">Yêu cầu xin nghỉ việc</p>
          <div class="w-full flex items-center justify-between">
            <input
              type="date"
              v-model="selectedLeaveDate"
              class="i-c w-[35%]"
            />
            <input
              type="text"
              placeholder="Mô tả"
              v-model="descriptionText"
              class="i-c w-[60%]"
            />
          </div>
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
import eventBus from "../../common/EventBus.js";
import API_REQUEST from "../../API/API_REQUEST.js";
import API_LOCATION from "../../API/API_LOCATION.js";
import API_CLASS from "../../API/API_CLASS.js";
import tableConfig from "../../common/config/tableConfig.js";
import { useAuthStore } from "../../stores/Auth.js";
import { useSystemStore } from "../../stores/System.js";
import NormalTable from "../NormalTable.vue";
import API_USER from "../../API/API_USER.js";
import swal from "../../common/swal.js";
import API_COURSE from "../../API/API_COURSE.js";
import API_SCHEDULE from "../../API/API_SCHEDULE.js";
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
      requestsOfUsers: [],
      requestByUserReceiver: [],
      locations: [],
      managersId: [],
      classTeachByTeacher: [],
      classPending: [],
      requestTypes: [],
      childrenData: [],
      coursesData: [],
      classOfChildrenData: [],
      scheduleData: [],
      classOfScheduleData: [],
      teachersData: [],
      isCreate: false,
      descriptionText: "",
      selectedRequest: "Class",
      selectedLocation: "",
      selectedLeaveDate: "",
      selectedClassByTeacher: "",
      selectedClassPending: "",
      selectedChildren: "",
      selectedCourse: "",
      selectedClassOfChildren: "",
      scheduleSelected: "",
      classOfScheduleSelected: "",
      teachingDate: "",
      teacherSelected: "",
    };
  },
  created() {
    this.fetchRole();
    this.fetchRequestOfUsers();
    this.fetchRequestReceiver();

    if (this.authStore.getAuth?.roleName == "Staff") {
      this.fetchLocation();
      this.selectedRequest = "Location";
      this.requestTypes = [
        { value: "Location", display: "Đổi cơ sở" },
        { value: "Leave", display: "Xin nghỉ" },
      ];
    } else if (
      this.authStore.getAuth?.roleName == "Manager" ||
      this.authStore.getAuth?.roleName == "Admin"
    ) {
      this.fetchRequest();
    } else if (this.authStore.getAuth?.roleName == "Parent") {
      this.fetchChildren();
      this.fetchClassPending();
      this.selectedRequest = "Refund";
      this.requestTypes = [
        { value: "Refund", display: "Hoàn tiền" },
        { value: "ChildrenClass", display: "Chuyển lớp" },
        { value: "ChildrenReserve", display: "Bảo lưu" },
      ];
    } else if (this.authStore.getAuth?.roleName == "Teacher") {
      this.fetchClassTeachByTeacherId();
      this.fetchClassPending();
      this.fetchLocation();
      this.fetchScheduleByTeacherId();
      this.fetchTeachers();
      this.selectedRequest = "Class";
      this.requestTypes = [
        { value: "Class", display: "Đổi lớp" },
        { value: "Location", display: "Đổi cơ sở" },
        { value: "Schedule", display: "Dạy thay" },
        { value: "Leave", display: "Xin nghỉ" },
      ];
    }
  },
  methods: {
    fetchTeachers() {
      this.systemStore.setChangeLoading(true);
      API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a53")
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.teachersData = res.data;
          this.teacherSelected = res.data[0]?.id;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchRequestOfUsers() {
      this.systemStore.setChangeLoading(true);
      API_REQUEST.getRequestByUserId(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.requestsOfUsers = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchRequest() {
      this.systemStore.setChangeLoading(true);
      API_REQUEST.getRequests()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.requests = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    updateRequest(item) {},
    deleteRequest(item) {
      swal.confirm("Bạn có chắc chắn muốn xoá không?").then((result) => {
        if (result.value) {
          this.systemStore.setChangeLoading(true);
          API_REQUEST.deleteRequest(item?.id)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
              swal.success("Xoá thành công!");
              this.reloadList();
            })
            .catch((err) => {
              this.systemStore.setChangeLoading(false);
              swal.error(err.response?.data, 2500);
            });
        }
      });
    },
    fetchChildren() {
      this.systemStore.setChangeLoading(true);
      API_USER.getChildrenByParent(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.childrenData = res.data;
          this.selectedChildren = res.data[0]?.childrenCode;
          this.selectedCourse = res.data[0]?.courses[0]?.courseCode;
          this.coursesData = res.data[0]?.courses;
          this.selectedClassOfChildren = res.data[0]?.classes[0]?.classId;
          this.classOfChildrenData = res.data[0]?.classes;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.coursesData = res.data;
          this.selectedCourse = res.data[0]?.courseCode;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    reloadList() {
      this.fetchRequest();
      this.fetchRequestOfUsers();
      this.fetchRequestReceiver();
    },
    fetchRequestReceiver() {
      this.systemStore.setChangeLoading(true);
      API_REQUEST.getRequestByReceiver(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.requestByUserReceiver = res.data;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
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
    fetchClassPending() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getListClassStatusPending()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.selectedClassPending = res.data[0];
          this.classPending = res.data;
        })
        .catch((er) => {
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
    fetchClassTeachByTeacherId() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getListClassTeachingByTeacher(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.selectedClassByTeacher = res.data[0]?.id;
          this.classTeachByTeacher = res.data;
        })
        .catch((er) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.descriptionText = "";
      this.isCreate = false;
    },
    handleChangeChildren(e) {
      let finalData = this.childrenData.find(
        (item) => item?.id === e.target.value
      );

      this.selectedChildren = finalData.childrenCode;
      this.selectedCourse = finalData.courses[0]?.courseCode;
      this.coursesData = finalData.courses;
      this.selectedClassOfChildren = finalData[0]?.classes[0]?.classId;
      this.classOfChildrenData = finalData[0]?.classes;
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
        childrenCode: null,
        courseCode: null,
      };

      let param = {
        userIds: [],
        message: "",
      };
      switch (this.selectedRequest) {
        case "Location":
          param.message = "Bạn nhận được 1 yêu cầu chuyển khu vực";
          param.userIds = this.managersId;
          data.userIds = this.managersId;
          data.locationId = this.selectedLocation;
          break;
        case "Class":
          param.message = "Bạn nhận được 1 yêu cầu chuyển lớp";
          data.fromClassId = this.selectedClassByTeacher;
          data.toClassId = this.selectedClassPending?.id;
          data.requestDescription = "Chuyển sang lớp khác";
          param.userIds = [
            this.selectedClassPending?.scheduleClassViews[0]?.teacherId,
          ];
          data.userIds = [
            this.selectedClassPending?.scheduleClassViews[0]?.teacherId,
          ];
          break;
        case "Schedule":
          param.message = "Bạn nhận được 1 yêu cầu đổi lịch";
          data.teachingDate = this.teachingDate;
          param.userIds = [this.teacherSelected];
          data.userIds = [this.teacherSelected];
          data.requestDescription = "Dạy thay 1 ngày";
          data.scheduleId = this.scheduleSelected;
          break;
        case "Refund":
          param.message = "Bạn nhận được 1 yêu cầu hoàn tiền";
          param.userIds = this.managersId;
          data.userIds = this.managersId;
          data.childrenCode = this.selectedChildren;
          data.courseCode = this.selectedCourse;
          data.requestDescription = "Yêu cầu hoàn tiền";
          break;
        case "Leave":
          param.message = "Bạn nhận được 1 yêu cầu xin nghỉ làm";
          data.leaveDate = this.selectedLeaveDate;
          param.userIds = this.managersId;
          data.userIds = this.managersId;
          break;
        case "ChildrenClass":
          param.message = "Bạn nhận được 1 yêu cầu chuyển lớp cho trẻ";
          param.userIds = this.managersId;
          data.userIds = this.managersId;
          data.fromClassId = this.selectedClassOfChildren;
          data.toClassId = this.selectedClassPending?.id;
          data.requestDescription = "Chuyển lớp cho trẻ";
          break;
      }

      this.systemStore.setChangeLoading(true);
      API_REQUEST.postRequest(data)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.fetchRequestOfUsers();
          this.fetchRequestReceiver();
          this.cancelAll();

          this.triggerNoti(param);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
        });
    },
    triggerNoti(param) {
      eventBus.$emit("triggerNoti", param);
    },
    handleApprove(item) {
      this.systemStore.setChangeLoading(true);
      item["requestIds"] = [item?.id];
      item["status"] = "Approved";
      API_REQUEST.approveRequest(item)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchRequestOfUsers();
          swal.success(res.data);
          this.fetchRequest();
        })
        .catch((er) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchScheduleByTeacherId() {
      API_SCHEDULE.getAutomaticalySchedule(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.classOfScheduleData = res.data?.classes;
          this.classOfScheduleSelected = res.data?.classes[0]?.id;
          this.scheduleData = res.data?.classes[0]?.schedules;
          this.scheduleSelected = res.data?.classes[0]?.schedules[0]?.id;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleChangeClass(e) {
      console.log(e.target.value);
    },
    handleApproveReceiver(item) {
      item["status"] = "Approved";
      this.systemStore.setChangeLoading(true);
      item["requestIds"] = [item?.id];
      API_REQUEST.approveRequest(item)
        .then((res) => {
          this.systemStore.setChangeLoading("Đã chấp thuận yêu cầu thành công");
          this.systemStore.setChangeLoading(false);
          this.fetchRequestReceiver();
        })
        .catch((er) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    convertToVietNamText(data) {
      let d = "";
      switch (data) {
        case "Monday":
          d = "Thứ 2";
          break;
        case "Tuesday":
          d = "Thứ 3";
          break;
        case "Wednesday":
          d = "Thứ 4";
          break;
        case "Thursday":
          d = "Thứ 5";
          break;
        case "Friday":
          d = "Thứ 6";
          break;
        case "Saturday":
          d = "Thứ 7";
          break;
        case "Sunday":
          d = "Chủ Nhật";
          break;
        default:
          break;
      }

      return d;
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

.mt-f {
  margin-top: 80px !important;
}
</style>
