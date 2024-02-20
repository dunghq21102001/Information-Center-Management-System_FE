<template>
  <div class="w-full">
    <FormSchema
      :schema="schema"
      btn-name="Add"
      @form-submitted="handleAddSemester"
      page-title="Add Semester"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import API_SEMESTER from "../../API/API_SEMESTER";
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
      schema: schemaConfig.semesterSchema(),
    };
  },
  methods: {
    handleAddSemester(data) {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.postSemester(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "semesters" });
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
