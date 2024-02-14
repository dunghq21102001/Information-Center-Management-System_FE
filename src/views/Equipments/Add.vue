<template>
  <div class="w-full">
    <div class="w-[95%] mx-auto mt-5">
      <select v-model="currentTab" class="px-3 py-1 w-[200px] select-primary">
        <option v-for="t in tabs" :value="t">
          {{ t }}
        </option>
      </select>
    </div>
    <FormSchema
      v-if="currentTab == 'Category'"
      :schema="schema"
      btn-name="Add"
      @form-submitted="handleAddCateEquipment"
    />
    <FormSchema
      v-else
      :schema="schemaEquipment"
      btn-name="Add"
      @form-submitted="handleAddEquipment"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import { useSystemStore } from "../../stores/system";
import API_EQUIPMENT from "../../API/API_EQUIPMENT";
import swal from "../../common/swal";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: {
    FormSchema,
  },
  data() {
    return {
      tabs: ["Equipment", "Category"],
      currentTab: "Equipment",
      schema: schemaConfig.categoryEquipmentSchema(),
      schemaEquipment: schemaConfig.equipmentSchema(),
    };
  },
  created() {},
  methods: {
    handleAddCateEquipment(data) {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.postCategoryEquipment(data)
        .then((res) => {
          swal.success("Added successfully");
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleAddEquipment(data) {},
  },
};
</script>
