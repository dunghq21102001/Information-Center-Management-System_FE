<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 2"
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
import API_SEMESTER from "../../API/API_SEMESTER";
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
      courses: [],
      semesters: [],
      fetchCount: 0,
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 2) {
        this.schema = schemaConfig.classSchema(this.courses, this.semesters);
      }
    },
  },
  created() {
    this.fetchCourse();
    this.fetchSemester();
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
    fetchSemester() {
      this.systemStore.setChangeLoading(true);
      API_SEMESTER.getSemesters()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpData = res.data;
          tmpData = tmpData.map((item) => {
             item["name"] = item?.semesterName;
             return item
          });
          this.semesters = tmpData;
          this.fetchCount++;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courses = res.data;
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
