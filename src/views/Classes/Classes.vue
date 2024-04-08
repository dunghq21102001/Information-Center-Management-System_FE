<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Lớp học</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-import-data="true"
        :is-multi-select="true"
        :is-change-status-classes="true"
        is-add="class-create"
        excel="class-data"
        csv="class-data"
        :reload="true"
        :enum="true"
        :enum-list="courses"
        @click-to-row="gotoDetail"
        @reload-action="reloadList"
        @update-action="updateClass"
        @delete-action="deleteClass"
        @change-status-of-classes="changeStatusOfClasses"
      />
    </div>

    <div
      class="fog"
      v-if="isSelectedStatus"
      @click.self="isSelectedStatus = false"
    >
      <div
        class="w-[95%] md:w-[40%] lg:w-[30%] bg-white rounded-2xl relative p-6 max-h-[90vh] overflow-y-scroll hide-scrollbar"
      >
        <span class="font-bold text-[20px]"
          >Đổi trạng thái của các lớp học có mã lớp là:
          {{ selectedClassByName }}</span
        >
        <select
          v-model="selectedStatus"
          name=""
          id=""
          class="select-primary px-4 py-2 w-full mt-3"
        >
          <option
            v-for="(item, index) in enumClass"
            :key="index"
            :value="item.display"
          >
            {{ item.display }}
          </option>
        </select>
        <div class="w-full flex items-center mt-3 justify-end">
          <button @click="handleChangeStatus" class="btn-primary px-3 py-1">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_CLASS from "../../API/API_CLASS.js";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
import API_COURSE from "../../API/API_COURSE.js";
import { useAuthStore } from "../../stores/Auth.js";
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
      header: tableConfig.classTable(),
      data: [],
      courses: [],
      selectedClass: [],
      selectedClassByName: [],
      isSelectedStatus: false,
      enumClass: [],
      selectedStatus: "",
    };
  },
  created() {
    this.fetchClass();
    this.fetchCourses();
    this.fetchEnumClass();
    const message = this.$route.query.message;
    if (message != null && message != "")
      swal.success("Giao dịch thành công! Tiến hành thêm trẻ vào lớp", 3000);
  },
  methods: {
    fetchClass() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getClasses()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateClass(data) {
      if (this.authStore.getAuth.roleName == "Staff")
        return swal.error("Nhân viên không có quyền thực hiện chức năng này!");
      this.systemStore.setChangeLoading(true);
      API_CLASS.putClass(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchClass();
        })
        .catch((err) => {
          // swal.error("Cập nhật thất bại! Vui lòng thử lại");
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    gotoDetail(item) {
      this.$router.push({ name: "class-detail", params: { id: item?.id } });
    },
    reloadList() {
      this.fetchClass();
    },
    deleteClass(item) {
      if (this.authStore.getAuth.roleName == "Staff")
        return swal.error("Nhân viên không có quyền thực hiện chức năng này!");
      swal.confirm("Bạn có chắc chắn muốn xoá không?").then((result) => {
        if (result.value) {
          this.systemStore.setChangeLoading(true);
          API_CLASS.deleteClass(item?.id)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
              swal.success("Xoá thành công");
              this.fetchClass();
            })
            .catch((err) => {
              this.systemStore.setChangeLoading(false);
              swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
            });
        }
      });
    },
    fetchCourses() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courses = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    changeStatusOfClasses(items) {
      let fData = [];
      let fDataName = [];
      items.map((i) => {
        fData.push(i?.id);
        fDataName.push(i?.classCode);
      });
      this.selectedClass = fData;
      this.isSelectedStatus = true;
      this.selectedClassByName = fDataName.join(", ");
    },
    fetchEnumClass() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getEnumClass()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.selectedStatus = res.data[0]?.display;
          this.enumClass = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleChangeStatus() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.changeStatusClass({
        ids: this.selectedClass,
        status: this.selectedStatus,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchClass();
          swal.success("Cập nhật trạng thái cho lớp học thành công");
          this.isSelectedStatus = false;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response.data);
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
