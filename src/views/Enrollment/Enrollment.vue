<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Enrollment</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        excel="enrollment-data"
        csv="enrollment-data"
        :reload="true"
        @reload-action="reloadList"
      />
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_ROOM from "../../API/API_ROOM.js";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
import API_ENROLLMENT from "../../API/API_ENROLLMENT.js";
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
      header: tableConfig.enrollmentTable(),
      data: [],
    };
  },
  created() {
    this.fetchEnrollment();
  },
  methods: {
    fetchEnrollment() {
      this.systemStore.setChangeLoading(true);
      API_ENROLLMENT.getEnrollments()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    reloadList() {
      this.fetchEnrollment();
    },
  },
};
</script>
