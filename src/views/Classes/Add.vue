<template>
  <div class="w-full">
    <FormSchema
      v-if="isFetch == true"
      :schema="schema"
      btn-name="Add"
      page-title="Add Room"
      @form-submitted="handleAddLocation"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_CLASS from "../../API/API_CLASS";
import API_COURSE from "../../API/API_COURSE";
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
      schema: schemaConfig.classSchema(),
      isFetch: false,
    };
  },
  created() {
    this.fetchCourse();
  },
  methods: {
    handleAddLocation(data) {
      this.systemStore.setChangeLoading(true);
      API_CLASS.postClass(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "classes" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.schema = schemaConfig.classSchema(res.data);
          this.isFetch = true;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
<style scoped></style>
