<template>
  <div class="w-full">
    <div class="w-full">
      <div class="w-full flex items-center justify-between">
        <div class="w-full flex flex-wrap items-center">
          <span
            @click="$router.push({ name: 'classes' })"
            class="text-[28px] font-bold block text-gray-700 hv-t"
          >
            Danh sách lớp
          </span>
          <v-icon scale="1.5" name="md-keyboardarrowright" />
          <span class="text-[28px] font-bold block text-gray-700 hv-t">
            Quản lý lớp
          </span>
        </div>
        <button
          v-if="authStore.getAuth?.roleName == 'Teacher'"
          class="btn-primary px-3 py-1 w-[250px]"
          @click="showCreateExam = true"
        >
          Tạo bài kiểm tra
        </button>
        <button
          v-else
          class="btn-primary px-3 py-1 w-[250px]"
          @click="showEnrollment"
        >
          Thêm trẻ vào lớp
        </button>
      </div>

      <span
        v-if="classDetail?.scheduleClassViews == null"
        class="block text-[20px] font-bold mb-5 text-gray-600 mt-4"
      >
        Lớp hiện chưa có lịch học
      </span>
      <div
        v-if="classDetail?.scheduleClassViews.length > 0"
        class="w-full mt-5"
      >
        <span class="block text-[20px] font-bold mb-5"
          >Lịch học của lớp {{ classDetail?.classCode }}</span
        >

        <div
          class="w-full flex items-center justify-between border-gray-600 border-solid border-[1px]"
        >
          <div class="w-[50%] py-2 br-r">
            <p class="text-center br-b font-bold">
              <v-icon name="bi-calendar-week" fill="#1fbc9c" size="1.5" />
              &nbsp; Ngày học thứ nhất theo tuần
            </p>
            <div class="table mt-5">
              <div class="row">
                <div class="cell font-bold">Thứ</div>
                <div class="cell">
                  {{
                    switchData(classDetail?.scheduleClassViews[0]?.dayInWeek)
                  }}
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Thời gian</div>
                <div class="cell">
                  {{ getTime(classDetail?.scheduleClassViews[0]?.startTime) }} -
                  {{ getTime(classDetail?.scheduleClassViews[0]?.endTime) }} ({{
                    classDetail?.scheduleClassViews[0]?.slot
                  }})
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Phòng học</div>
                <div class="cell">
                  {{ classDetail?.scheduleClassViews[0]?.roomName }}
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Giáo viên</div>
                <div class="cell">
                  {{ classDetail?.scheduleClassViews[0]?.teacherName }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-[50%] py-2">
            <p class="text-center br-b font-bold">
              <v-icon name="bi-calendar-week" fill="#1fbc9c" size="1.5" />
              &nbsp; Ngày học thứ hai theo tuần
            </p>
            <div class="table mt-5">
              <div class="row">
                <div class="cell font-bold">Thứ</div>
                <div class="cell">
                  {{
                    switchData(classDetail?.scheduleClassViews[1]?.dayInWeek)
                  }}
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Thời gian</div>
                <div class="cell">
                  {{ getTime(classDetail?.scheduleClassViews[1]?.startTime) }} -
                  {{ getTime(classDetail?.scheduleClassViews[1]?.endTime) }} ({{
                    classDetail?.scheduleClassViews[1]?.slot
                  }})
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Phòng học</div>
                <div class="cell">
                  {{ classDetail?.scheduleClassViews[1]?.roomName }}
                </div>
              </div>
              <div class="row">
                <div class="cell font-bold">Giáo viên</div>
                <div class="cell">
                  {{ classDetail?.scheduleClassViews[1]?.teacherName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span
        v-if="authStore.getAuth?.roleName == 'Teacher'"
        class="block text-[20px] font-bold mt-10"
        >Danh sách bài kiểm tra</span
      >
      <div
        class="w-[90%] mx-auto"
        v-if="authStore.getAuth?.roleName == 'Teacher'"
      >
        <NormalTable
          :data="examByClass"
          :header="examHeader"
          :excel-custom="true"
          :is-show-search="true"
          :is-import-data="true"
          excel="children-in-class-data"
          csv="children-in-class-data"
          :reload="true"
          @reload-action="reloadList"
          @handle-click-excel-custom="handleClickExcelCustom"
          @import-data="importScore"
        />
      </div>

      <span class="block text-[20px] font-bold mt-10">Danh sách học viên</span>
      <div class="w-[90%] mx-auto">
        <NormalTable
          :data="childrenInClass"
          :header="header"
          :excel-custom="true"
          :is-show-search="true"
          :is-import-data="true"
          excel="children-in-class-data"
          csv="children-in-class-data"
          :reload="true"
          @reload-action="reloadList"
          @handle-click-excel-custom="handleClickExcelCustom"
          @import-data="importData"
        />
      </div>

      <div
        class="fog-e"
        v-if="showCreateExam"
        @click.self="showCreateExam = false"
      >
        <div class="bg-white p-3 rounded-lg flex flex-col items-end justify-between">
          <span class="block my-2 font-bold text-[24px]">
            Tạo bài kiểm tra thực hành
          </span>
          <div class="w-full flex flex-col">
            <div class="flex flex-col mr-2">
              <label for="">Tên bài kiểm tra</label>
              <input
                type="text"
                placeholder="Tên bài kiểm tra"
                v-model="testName"
                class="px-4 py-1 i-cus"
              />
            </div>
            <div class="flex flex-col mr-2">
              <label for="">Thời gian</label>
              <input
                type="date"
                v-model="testDate"
                class="px-4 py-1 i-cus"
              />
            </div>
            <div class="flex flex-col mr-2">
              <label for="">Ngày thực hành</label>
              <input
                type="number"
                v-model="testDuration"
                class="px-4 py-1 i-cus"
              />
            </div>
          </div>
          <button class="btn-primary px-3 py-[2px] mt-5" @click="createExam">
            Tạo
          </button>
        </div>
      </div>
      <div
        v-if="isShowEnrollment"
        @click.self="isShowEnrollment = false"
        class="bg-fog-tb flex justify-end"
      >
        <div
          class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
        >
          <div
            class="absolute top-5 w-[30px] h-[30px] flex items-center justify-center right-5 text-[25px] cursor-pointer hover:bg-red-500 hover:rounded-full"
          >
            <v-icon
              @click="isShowEnrollment = false"
              name="io-close-outline"
              scale="1.5"
            />
          </div>
          <FormList
            :data-list="childrenData"
            title="Ghi danh học sinh vào lớp"
            @handle-submit-list="enrollmentChildren"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_CLASS from "../../API/API_CLASS";
import API_EXAM from "../../API/API_EXAM";
import API_USER from "../../API/API_USER.js";
import API_ENROLLMENT from "../../API/API_ENROLLMENT.js";
import { useAuthStore } from "../../stores/Auth.js";
import { useSystemStore } from "../../stores/System.js";
import tableConfig from "../../common/config/tableConfig.js";
import NormalTable from "../../components/NormalTable.vue";
import FormList from "../../components/FormList.vue";
import swal from "../../common/swal.js";
import dayjs from "dayjs";
import func from "../../common/func.js";
export default {
  components: { NormalTable, FormList },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      classDetail: null,
      showCreateExam: false,
      testName: "",
      testDate: "",
      testDuration: 0,
      childrenData: [],
      childrenInClass: [],
      header: tableConfig.childrenInClassTable(),
      isShowEnrollment: false,
      examByClass: [],
      examHeader: tableConfig.examByClassTable(),
    };
  },
  created() {
    this.fetchDetail(this.$route.params.id);
    this.getListChildrenByStaff();
    this.getChildrenByClass(this.$route.params.id);
    if (this.authStore.getAuth.roleName == "Teacher") {
      this.fetchExamByCLass();
    }
  },
  methods: {
    fetchExamByCLass() {
      API_EXAM.examByClass(this.$route.params.id)
        .then((res) => {
          this.examByClass = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchDetail(id) {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getClassById(id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.classDetail = res.data;
        })
        .catch((err) => {
          this.$router.push({ name: "not-found", params: { catchAll: "404" } });
          this.systemStore.setChangeLoading(false);
        });
    },
    getChildrenByClass(id) {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getChildrenByClassId(id)
        .then((res) => {
          this.childrenInClass = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    createExam() {
      if (this.testDuration <= 0)
        return swal.error("Thời gian làm bài không được nhỏ hơn 0");
      if (this.testName.trim() == "")
        return swal.error("Không được để trống tên bài thực hành");
      if (this.testDate == "")
        return swal.error("Không được để trống ngày làm bài thực hành");
      this.systemStore.setChangeLoading(true);
      API_EXAM.createExam({
        classId: this.$route.params.id,
        testName: this.testName,
        testCode: func.makeUnique(8),
        testDate: this.testDate,
        testDuration: this.testDuration,
        testType: 1,
      })
        .then((res) => {
          swal.success("Tạo bài kiểm tra thành công");
          this.systemStore.setChangeLoading(false);
          this.showCreateExam = false;
          this.fetchExamByCLass();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Tạo thất bại");
        });
    },
    getListChildrenByStaff() {
      if (this.authStore.getAuth?.roleName == "Staff") {
        this.systemStore.setChangeLoading(true);
        API_USER.getChildrenByStaff()
          .then((res) => {
            this.childrenData = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => this.systemStore.setChangeLoading(false));
      }
    },
    showEnrollment() {
      if (this.authStore.getAuth?.roleName != "Staff")
        return swal.info(
          "Chỉ có nhân viên tư vấn mới có thể thực hiện hành động này!",
          3000
        );
      this.isShowEnrollment = true;
    },
    enrollmentChildren(item) {
      // console.log(item);
      let tmp = [];
      item.map((i) => {
        if (i?.select == true)
          tmp.push(
            // classId: this.$route.params.id,
            i?.id
          );
      });
      this.systemStore.setChangeLoading(true);
      API_ENROLLMENT.postEnrollment({
        classId: this.$route.params.id,
        childrenProfileIds: tmp,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.getChildrenByClass(this.$route.params.id);
          swal.success("Thêm trẻ vào lớp thành công");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data, 4000);
        });
    },
    importScore(data) {
      console.log("vao day");
      this.systemStore.setChangeLoading(true);
      const formData = new FormData();
      formData.append("formFile", data.file);
      API_EXAM.importScore(formData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchExamByCLass();
          // this.fetchDetail(this.$route.params.id);
        })
        .catch((er) => {
          this.systemStore.setChangeLoading(false);
          swal.error(er.response?.data);
        });
    },
    importData(data) {
      this.systemStore.setChangeLoading(true);
      const formData = new FormData();
      formData.append("formFile", data.file);
      API_ENROLLMENT.importExcel(formData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.getChildrenByClass(this.$route.params.id);
          // this.fetchDetail(this.$route.params.id);
        })
        .catch((er) => {
          this.systemStore.setChangeLoading(false);
          swal.error(er.response?.data);
        });
    },
    switchData(data) {
      let tmpData = "";
      switch (data) {
        case "Monday":
          tmpData = "Thứ 2";
          break;
        case "Tuesday":
          tmpData = "Thứ 3";
          break;
        case "Wednesday":
          tmpData = "Thứ 4";
          break;
        case "Thursday":
          tmpData = "Thứ 5";
          break;
        case "Friday":
          tmpData = "Thứ 6";
          break;
        case "Saturday":
          tmpData = "Thứ 7";
          break;
        case "Sunday":
          tmpData = "Chủ nhật";
          break;

        default:
          break;
      }
      return tmpData;
    },
    reloadList() {
      this.getChildrenByClass(this.$route.params.id);
    },
    getTime(date) {
      return dayjs(date).format("HH:mm");
    },
    handleClickExcelCustom() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.exportExcelListChildren(this.$route.params.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          // console.log(res.data);
          // const url = window.URL.createObjectURL(new Blob([res.data]));
          // const link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", `Nhập điểm.xlsx`);
          // document.body.appendChild(link);
          // link.click();

          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `children-in-class-data.xlsx`);
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
.bg-fog-tb {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
}

.br-b {
  border-bottom: 1px solid rgb(213, 213, 213);
}

.br-r {
  border-right: 1px solid rgb(213, 213, 213);
}

.table {
  display: table;
  border-bottom: 1px solid #ebebeb;
  border-top: 1px solid #ebebeb;
  width: 100%; /* Đặt chiều rộng bằng 100% hoặc giá trị mong muốn */
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
  border: 1px solid #ebebeb;
  padding: 5px; /* Thêm padding nếu cần */
}

.fog-e {
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
