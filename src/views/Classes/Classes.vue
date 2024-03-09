<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Classes</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        is-add="room-create"
        excel="room-data"
        csv="room-data"
        :reload="true"
        :enum="true"
        :enum-list="courses"
        @click-to-row="gotoDetail"
        @reload-action="reloadList"
        @update-action="updateClass"
        @delete-action="deleteClass"
      />
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
    };
  },
  created() {
    this.fetchClass();
    this.fetchCourses();
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
      this.systemStore.setChangeLoading(true);
      API_CLASS.putClass(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchClass();
        })
        .catch((err) => {
          swal.error("Update room failed!");
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
      swal
        .confirm("Are you sure you want to delete this class?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_CLASS.deleteClass(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Deleted successfully!");
                this.fetchClass();
              })
              .catch((err) => {
                this.systemStore.setChangeLoading(false);
                swal.error("Delete failed! Please try again", 2500);
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
  },
};
</script>
