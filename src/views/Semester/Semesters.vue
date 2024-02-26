<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Semesters</span>
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-add-semester="true"
        excel="semester-data"
        csv="semester-data"
        :reload="true"
        @reload-action="reloadList"
        @add-semester="addSemester"
      />
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/System";
import API_SEMESTER from "../../API/API_SEMESTER";
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
      data: [],
      header: tableConfig.semesterTable(),
    };
  },
  created() {
    this.fetchSemester();
  },
  methods: {
    fetchSemester() {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.getSemesters()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateSemester(data) {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.putSemester(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchSemester();
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Update semester failed! Please try again");
        });
    },
    reloadList() {
      this.fetchSemester();
    },
    addSemester(emit) {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.postSemester()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.fetchSemester()
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.info(err.response?.data);
        });
    },
    deleteSemester(item) {
      swal
        .confirm("Are you sure you want to delete this semester?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_SEMESTER.deleteSemester(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Deleted successfully!");
                this.fetchSemester();
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
