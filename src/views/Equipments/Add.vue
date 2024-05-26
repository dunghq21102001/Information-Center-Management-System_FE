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
      btn-name="Tạo"
      page-title="Tạo danh mục thiết bị"
      @form-submitted="handleAddCateEquipment"
    />
    <FormSchema
      v-else-if="currentTab == 'Equipment' && fetchCount == 3"
      :schema="schemaEquipment"
      btn-name="Tạo"
      page-title="Tạo thiết bị"
      @form-submitted="handleAddEquipment"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import { useSystemStore } from "../../stores/system";
import API_EQUIPMENT from "../../API/API_EQUIPMENT";
import API_ROOM from "../../API/API_ROOM";
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
      schemaEquipment: [],
      enum: [],
      rooms: [],
      category: [],
      fetchCount: 0,
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 3) {
        this.schemaEquipment = schemaConfig.equipmentSchema(
          this.category,
          this.rooms,
          this.enum
        );
      }
    },
  },
  created() {
    this.fetchCate();
    this.fetchRoom();
    this.fetchEnum();
  },
  methods: {
    handleAddCateEquipment(data) {
      // if (data.quantity == 0 || data.quantity < 0)
      //   return swal.error("Số lượng phải lớn hơn 0");
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.postCategoryEquipment(data)
        .then((res) => {
          swal.success("Thêm thành công");
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "equipments" });
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err?.response?.data);
        });
    },
    handleAddEquipment(data) {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.postEquipments(data)
        .then((res) => {
          swal.success("Thêm thành công");
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "equipments" });
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err?.response?.data);
        });
    },
    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.getEnum()
        .then((res) => {
          this.enum = res.data;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchRoom() {
      this.systemStore.setChangeLoading(true);
      API_ROOM.getRooms()
        .then((res) => {
          this.rooms = res.data;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchCate() {
      this.systemStore.setChangeLoading(true);
      API_EQUIPMENT.categoryEquipments()
        .then((res) => {
          this.category = res.data;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
  },
};
</script>
