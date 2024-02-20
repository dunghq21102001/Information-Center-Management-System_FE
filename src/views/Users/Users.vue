<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Users</span>
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="users"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-reset-pass="true"
        is-add="user-create"
        excel="user-data"
        csv="user-data"
        :reload="true"
        @reload-action="reloadList"
        @update-action="updateUser"
      />
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/System";
import { useAuthStore } from "../../stores/Auth";
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
      header: tableConfig.userTable(),
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.systemStore.setChangeLoading(true);
      if (this.authStore.getAuth?.roleName == "Staff") {
        API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a54")
          .then((res) => {
            this.users = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      } else {
        API_USER.users()
          .then((res) => {
            this.users = res.data;
            this.systemStore.setChangeLoading(false);
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      }
    },
    updateUser(data) {
      console.log(data);
    },
    reloadList(param) {
      this.fetchUsers();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
