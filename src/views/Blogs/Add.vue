<template>
    <div class="w-full">
      <FormSchema
        :schema="schema"
        btn-name="Add"
        @form-submitted="handleAddEquipment"
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
        schema: schemaConfig.categoryEquipmentSchema(),
      };
    },
    created() {},
    methods: {
      handleAddEquipment(data) {}
    }
  };
  </script>
  