<template>
  <div class="w-full">
    <FormSchema
      v-if="isFetchEnum"
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
import API_ROOM from "../../API/API_ROOM";
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
      schema: [],
      isFetchEnum: false,
    };
  },
  created() {
    this.getEnum();
  },
  methods: {
    handleAddLocation(data) {
      this.systemStore.setChangeLoading(true);
      API_ROOM.postRoom(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "rooms" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    getEnum() {
      this.systemStore.setChangeLoading(true);
      API_ROOM.getEnum()
        .then((res) => {
          this.isFetchEnum = true;
          this.schema = schemaConfig.roomSchema(res.data);
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
<style scoped></style>
