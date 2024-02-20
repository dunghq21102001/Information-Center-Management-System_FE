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
      v-if="currentTab == 'Training Programs'"
      :schema="tpSchema"
      btn-name="Add"
      page-title="Add Training Programs"
      @form-submitted="handleAddTP"
    />
    <FormSchema
      v-else
      :schema="cateSchema"
      btn-name="Add"
      page-title="Add Training Program Category"
      @form-submitted="handleAddCate"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import { useSystemStore } from "../../stores/System";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import API_TP from "../../API/API_TP.js";
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
      tabs: ["Training Programs", "Categories"],
      currentTab: "Training Programs",
      tpSchema: [],
      cateSchema: schemaConfig.TrainingProgramCategorySchema(),
    };
  },
  created() {
    this.fetchTpCate();
  },
  methods: {
    async handleAddTP(data) {
      this.systemStore.setChangeLoading(true);
      try {
        const currentTime = new Date();
        const uniqueFileName = "image_" + currentTime.getTime();
        const storageRef = ref(storage, "tp/" + uniqueFileName);

        const response = await fetch(data.image);
        const blob = await response.blob();

        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            data.image = downloadURL;
            API_TP.postTrainingProgram(data)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success(res.data);
                this.$router.push({ name: "training-program" });
              })
              .catch((err) => {
                swal.error('Something went wrong! Please try again')
                this.systemStore.setChangeLoading(false);
              });
          })
          .catch((error) => {
            console.log("Lỗi khi tải ảnh lên:", error);
          });
      } catch (e) {
        this.systemStore.setChangeLoading(false);
        console.error("Error uploading avatar:", e);
      }
    },
    handleAddCate(data) {
      this.systemStore.setChangeLoading(true);
      API_TP.postTrainingProgramCategory(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$router.push({ name: "training-program" });
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error("Created fail! Please try again");
        });
    },
    fetchTpCate() {
      this.systemStore.setChangeLoading(true);
      API_TP.getTrainingProgramCategories()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.tpSchema = schemaConfig.TrainingProgramSchema(res.data);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
