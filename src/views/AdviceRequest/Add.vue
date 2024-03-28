<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 2"
      :schema="schema"
      btn-name="Tạo"
      page-title="Tạo yêu cầu tư vấn"
      @form-submitted="handleAddAdviceRequest"
    />
  </div>
</template>
<script>
import { useSystemStore } from "../../stores/System";
import schemaConfig from "../../common/config/schemaConfig";
import swal from "../../common/swal";
import FormSchema from "../../components/FormSchema.vue";
import API_LOCATION from "../../API/API_LOCATION";
import API_USER from "../../API/API_USER";
import API_SLOT from "../../API/API_SLOT";
import { useAuthStore } from "../../stores/Auth";
import dayjs from "dayjs";

export default {
  components: {
    FormSchema,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      schema: [],
      fetchCount: 0,
      locations: [],
      slots: [],
    };
  },
  created() {
    this.fetchLocation();
    this.fetchSlot();
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 2) {
        this.schema = schemaConfig.adviceRequest(
          this.locations,
          ["True", "False"],
          this.slots
        );
      }
    },
  },
  methods: {
    handleAddAdviceRequest(data) {
      data["userId"] = this.authStore.getAuth?.id;
      data["isTested"] = data?.tested == "True" ? true : false;

      const slotItem = this.slots.find((item) => {
        if (item?.id == data?.slotId) return item;
      });

      const formattedDate = dayjs(data?.testDate, "M/D/YYYY").format(
        "YYYY-MM-DD"
      );

      const startTime = formattedDate + "T" + slotItem?.startTime;
      const endTime = formattedDate + "T" + slotItem?.endTime;

      data["testDate"] = formattedDate;
      data["startTime"] = startTime;
      data["endTime"] = endTime;

      this.systemStore.setChangeLoading(true);
      API_USER.postAdviceRequest(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "advice-request" });
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchLocation() {
      this.systemStore.setChangeLoading(true);
      API_LOCATION.getLocations()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.locations = res.data;
          this.fetchCount++;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchSlot() {
      this.systemStore.setChangeLoading(true);
      API_SLOT.getSlots()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpD = [];
          res.data.map((item) => {
            if (item?.slotType == 2) tmpD.push(item);
          });
          this.slots = tmpD.sort();
          this.fetchCount++;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
<style scoped></style>
