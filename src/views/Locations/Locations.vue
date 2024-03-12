<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Locations</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        is-add="location-create"
        excel="location-data"
        csv="location-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateLocation"
        @delete-action="deleteLocation"
      />
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/System";
import API_LOCATION from "../../API/API_LOCATION";
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
      header: tableConfig.locationTable(),
    };
  },
  created() {
    this.fetchLocations();
  },
  methods: {
    fetchLocations() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateLocation(data) {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.putLocation(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchLocations()
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Cập nhật thất bại! Vui lòng thử lại");
        });
    },
    reloadList() {
      this.fetchLocations();
    },
    deleteLocation(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_LOCATION.deleteLocation(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchLocations();
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
