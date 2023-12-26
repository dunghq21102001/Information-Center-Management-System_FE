<template>
  <div class="w-full pb-10">
    <FormSchema
      :schema="courseSchema"
      btn-name="Add"
      @form-submitted="handleAddUser"
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
  created() {},
  data() {
    return {
      courseSchema: schemaConfig.courseSchema(),
    };
  },
};
</script>
