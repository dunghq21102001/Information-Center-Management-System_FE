<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 1"
      :schema="schema"
      btn-name="Tạo"
      page-title="Đăng ký học viên"
      @form-submitted="handleAddAdviceRequest"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_LOCATION from "../../API/API_LOCATION";
import API_USER from "../../API/API_USER";
import { useAuthStore } from "../../stores/Auth";
export default {
  components: {
    FormSchema,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      schema: [],
      fetchCount: 0,
      locations: [],
    };
  },
  created() {
    this.fetchLocation();
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 1) {
        this.schema = schemaConfig.adviceRequest(this.locations, [
          "True",
          "False",
        ]);
      }
    },
  },
  methods: {
    handleAddAdviceRequest(data) {
      data["userId"] = this.authStore.getAuth?.id;
      data["isTested"] = data?.tested == "True" ? true : false;
      this.locations.map((item) => {
        if (item?.id == data?.location) {
          data.location = item?.name;
        }
      });
      this.systemStore.setChangeLoading(true);
      API_USER.postAdviceRequest(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "advice-request" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchLocation() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.locations = res.data;
          this.fetchCount++;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
<style scoped></style>
