<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="users"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
      />
    </div>
  </div>
</template>
<script>
import API_USER from "../../API/API_USER";
import tableConfig from "../../common/config/tableConfig";
import NormalTable from "../../components/NormalTable.vue";
import { useSystemStore } from "../../stores/System";
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
      header: tableConfig.userTable(),
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.systemStore.setChangeLoading(true);
      API_USER.users()
        .then((res) => {
          this.users = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
