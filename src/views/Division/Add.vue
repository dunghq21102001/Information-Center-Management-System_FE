<template>
  <div class="w-full">
    <FormSchema
      :schema="schema"
      btn-name="Add"
      page-title="Add Division"
      @form-submitted="handleAdd"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_DIVISION from "../../API/API_DIVISION";
export default {
  components: {
    FormSchema,
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      schema: schemaConfig.divisionSchema(),
    };
  },
  created() {},
  methods: {
    handleAdd(data) {
      this.systemStore.setChangeLoading(true);
      API_DIVISION.postDivision(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "divisions" });
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
