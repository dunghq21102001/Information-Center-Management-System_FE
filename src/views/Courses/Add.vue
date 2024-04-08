<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block pl-6 text-gray-700">
      Tạo khoá học
    </span>
    <div class="w-[90%] mx-auto mt-4">
      <span class="block">Loại khoá học</span>
      <select
        class="select-primary mt-3 px-10 py-2"
        v-model="courseTypeSelected"
      >
        <option :value="1">Khoá học đơn</option>
        <option :value="2">Khoá học spec</option>
      </select>
    </div>
    <FormSchema
      v-if="fetchCount == 2 && courseTypeSelected == 2"
      :schema="courseSpecSchema"
      btn-name="Tạo"
      @form-submitted="handleAddCourse"
    />

    <FormSchema
      v-if="fetchCount == 2 && courseTypeSelected == 1"
      :schema="courseSingleSchema"
      btn-name="Tạo"
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
import func from "../../common/func";
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
      courseSpecSchema: null,
      courseSingleSchema: null,
      fetchCount: 0,
      courses: [],
      enum: [],
      courseTypeSelected: 1,
    };
  },
  watch: {
    fetchCount() {
      if (this.fetchCount == 2) {
        this.courseSingleSchema = schemaConfig.courseSingleSchema(
          this.courses,
          this.enum
        );
        this.courseSpecSchema = schemaConfig.courseSpecSchema(
          this.courses,
          this.enum
        );
      }
    },
  },
  created() {
    this.fetchCourse();
    this.fetchEnum();
  },
  methods: {
    async handleAddCourse(data) {
      if (data.price) data["courseType"] = 1;
      else data["courseType"] = 2;
      this.systemStore.setChangeLoading(true);
      data["parentCode"] = [];
      if (data?.prerequisite == "null") data["prerequisite"] = null;
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

        const [imageSnapshot, fileSnapshot] = await Promise.all([
          uploadBytes(storageRef, blobImage).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          ),
          uploadBytes(storageRef2, fileBlob).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          ),
        ]);

        data.image = imageSnapshot;
        data.syllabus = fileSnapshot;

        await API_COURSE.postCourseParent(data)
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
          let tmp = func.cloneArray(res.data);
          tmp.unshift({ id: "null", name: "Không có" });
          this.courses = tmp;
          this.fetchCount++;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
  },
};
</script>
