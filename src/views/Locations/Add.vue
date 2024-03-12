<template>
  <div class="w-full">
    <FormSchema
      :schema="schema"
      btn-name="Tạo"
      page-title="Tạo khu vực"
      @form-submitted="handleAddLocation"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import API_LOCATION from "../../API/API_LOCATION";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
export default {
    components: {
        FormSchema
    },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      schema: schemaConfig.locationSchema(),
    };
  },
  methods: {
    handleAddLocation(data) {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.postLocation(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "locations" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
<style scoped></style>
