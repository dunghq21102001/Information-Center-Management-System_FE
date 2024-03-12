<template>
  <div class="w-full">
    <FormSchema
      v-if="fetchCount == 2"
      :schema="courseSchema"
      btn-name="Tạo"
      page-title="Tạo khoá học"
      @form-submitted="handleAddCourse"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import { useSystemStore } from "../../stores/System";
import API_COURSE from "../../API/API_COURSE";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import swal from "../../common/swal";
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
      courseSchema: null,
      fetchCount: 0,
      courses: [],
      enum: [],
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 2) {
        this.courseSchema = schemaConfig.courseSchema(this.courses, this.enum);
      }
    },
  },
  created() {
    this.fetchCourse();
    this.fetchEnum();
  },
  methods: {
    async handleAddCourse(data) {
      this.systemStore.setChangeLoading(true);
      data["parentCode"] = [];
      try {
        // for image
        const currentTime = new Date();
        const uniqueFileName = "image_" + currentTime.getTime();
        const storageRef = ref(storage, "coursesImage/" + uniqueFileName);
        const responseImage = await fetch(data.image);
        const blobImage = await responseImage.blob();

        // for file syllabus
        const currentTime2 = new Date();
        const uniqueFileName2 = "file_" + currentTime2.getTime();
        const storageRef2 = ref(storage, "files/" + uniqueFileName2 + ".pdf");
        const responseSyllabus = await fetch(data.syllabus);
        const arrayBuffer = await responseSyllabus.arrayBuffer();
        const fileBlob = new Blob([arrayBuffer], { type: "application/pdf" });

        // Upload both image and file asynchronously
        const [imageSnapshot, fileSnapshot] = await Promise.all([
          uploadBytes(storageRef, blobImage).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          ),
          uploadBytes(storageRef2, fileBlob).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          ),
        ]);

        // Update data with the uploaded URLs
        data.image = imageSnapshot;
        data.syllabus = fileSnapshot;

        // Call API after both uploads are successful
        await API_COURSE.postCourse(data)
          .then((res) => {
            this.systemStore.setChangeLoading(false);
            swal.success(res.data);
            this.$router.push({ name: "courses" });
          })
          .catch((err) => {
            swal.error(err?.response?.data);
            this.systemStore.setChangeLoading(false);
          });
      } catch (error) {
        this.systemStore.setChangeLoading(false);
        console.error("Error uploading files:", error);
      }
    },

    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getEnum()
        .then((res) => {
          this.enum = res.data;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchCourse() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.courses = res.data;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
