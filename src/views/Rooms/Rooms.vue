<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Rooms</span>

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
        :enum-list="enum"
        @reload-action="reloadList"
        @update-action="updateRoom"
        @delete-action="deleteRoom"
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
      header: tableConfig.roomTable(),
      data: [],
      enum: [],
    };
  },
  created() {
    this.fetchRooms();
    this.fetchEnum();
  },
  methods: {
    fetchRooms() {
      this.systemStore.setChangeLoading(true);
      API_ROOM.getRooms()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateRoom(data) {
      this.systemStore.setChangeLoading(true);
      API_ROOM.putRoom(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchRooms();
        })
        .catch((err) => {
          swal.error("Cập nhật thất bại!");
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_ROOM.getEnum()
        .then((res) => {
          this.enum = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    reloadList() {
      this.fetchRooms();
    },
    deleteRoom(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_ROOM.deleteRoom(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success("Xoá thành công!");
                this.fetchRooms();
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
