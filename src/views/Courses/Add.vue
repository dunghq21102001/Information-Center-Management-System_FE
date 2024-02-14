<template>
  <div class="w-full">
    <FormSchema
      :schema="courseSchema"
      btn-name="Add"
      @form-submitted="handleAddCourse"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
export default {
  components: {
    FormSchema,
  },
  data() {
    return {
      courseSchema: schemaConfig.courseSchema(),
    };
  },
  created() {},
  methods: {
    handleAddCourse(data) {}
  }
};
</script>
