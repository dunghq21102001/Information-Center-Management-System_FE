<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Lớp học</span>

    <div
      class="w-[90%] mx-auto"
      v-if="authStore.getAuth?.roleName != 'Teacher'"
    >
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-multi-select="true"
        :is-change-status-classes="true"
        is-add="class-create"
        excel="class-data"
        csv="class-data"
        :reload="true"
        :enum="true"
        :enum-list="courses"
        @click-to-row="gotoDetail"
        @reload-action="reloadList"
        @update-action="updateClass"
        @delete-action="deleteClass"
        @change-status-of-classes="changeStatusOfClasses"
      />
    </div>

    <div
      class="w-[90%] mx-auto"
      v-if="authStore.getAuth?.roleName == 'Teacher'"
    >
      <NormalTable
        :data="classByTeacher"
        :header="header"
        :is-show-search="true"
        :is-update="true"
        :is-delete="true"
        :is-multi-select="true"
        :is-change-status-classes="true"
        is-add="class-create"
        excel="class-data"
        csv="class-data"
        :reload="true"
        :enum="true"
        :enum-list="courses"
        @click-to-row="gotoDetail"
        @reload-action="reloadList"
        @update-action="updateClass"
        @delete-action="deleteClass"
        @change-status-of-classes="changeStatusOfClasses"
      />
    </div>

    <div
      class="fog"
      v-if="isSelectedStatus"
      @click.self="isSelectedStatus = false"
    >
      <div
        class="w-[95%] md:w-[40%] lg:w-[30%] bg-white rounded-2xl relative p-6 max-h-[90vh] overflow-y-scroll hide-scrollbar"
      >
        <span class="font-bold text-[20px]"
          >Đổi trạng thái của các lớp học có mã lớp là:
          {{ selectedClassByName }}</span
        >
        <select
          v-model="selectedStatus"
          name=""
          id=""
          class="select-primary px-4 py-2 w-full mt-3"
        >
          <option
            v-for="(item, index) in enumClass"
            :key="index"
            :value="item.display"
          >
            {{ item.display }}
          </option>
        </select>
        <div class="w-full flex items-center mt-3 justify-end">
          <button @click="handleChangeStatus" class="btn-primary px-3 py-1">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_CLASS from "../../API/API_CLASS.js";
import API_SCHEDULE from "../../API/API_SCHEDULE.js";
import API_CERTIFICATE from "../../API/API_CERTIFICATE.js";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
import API_COURSE from "../../API/API_COURSE.js";
import { useAuthStore } from "../../stores/Auth.js";
import Certificate from "../../components/Certificate.vue";
import html2canvas from "html2canvas";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import func from "../../common/func.js";
export default {
  components: {
    NormalTable,
    Certificate,
  },
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  data() {
    return {
      header: null,
      data: [],
      classByTeacher: [],
      courses: [],
      selectedClass: [],
      selectedClassByName: [],
      isSelectedStatus: false,
      enumClass: [],
      selectedStatus: "",
      fData: [
        {
          childrenProfile: {
            id: "bcff4f9d-0891-4702-77ed-08dc5f587718",
            userId: "3695a955-a772-4c9b-c909-08dc5f58094f",
            fullName: "Ngọc",
            genderType: "Nữ",
            birthDay: "2018-04-09T10:36:00",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fimage_1713411390110?alt=media&token=41833fbf-6ddd-4d54-9e61-150ce3de9247",
            specialSkill: "Không",
          },
          course: {
            id: "fcc1831f-c521-4645-dd3d-08dc579639eb",
            courseCode: "SN212",
            price: 3000000,
            name: "Advanced robotic programming",
            description: "Không",
            durationTotal: 15,
            syllabus:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/files%2Ffile_1712558189115.pdf?alt=media&token=799c6060-4b72-48f4-b237-dcf1f39e1310",
            level: null,
            entryPoint: "9",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2Fimage_1712558189094?alt=media&token=bfd7d87f-05ea-4a3b-9386-c5a0df5f43a9",
            courseType: "Single",
          },
          class: null,
        },
        {
          childrenProfile: {
            id: "e5cac739-aa75-4581-77ee-08dc5f587718",
            userId: "3695a955-a772-4c9b-c909-08dc5f58094f",
            fullName: "Ngọc An",
            genderType: "Nam",
            birthDay: "2017-04-09T10:36:00",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fimage_1713411413679?alt=media&token=66ba6770-1146-474f-8b5a-27c89da7eee6",
            specialSkill: "Múa",
          },
          course: {
            id: "fcc1831f-c521-4645-dd3d-08dc579639eb",
            courseCode: "SN212",
            price: 3000000,
            name: "Advanced robotic programming",
            description: "Không",
            durationTotal: 15,
            syllabus:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/files%2Ffile_1712558189115.pdf?alt=media&token=799c6060-4b72-48f4-b237-dcf1f39e1310",
            level: null,
            entryPoint: "9",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2Fimage_1712558189094?alt=media&token=bfd7d87f-05ea-4a3b-9386-c5a0df5f43a9",
            courseType: "Single",
          },
          class: null,
        },
        {
          childrenProfile: null,
          course: null,
          class: {
            id: "5bc4a721-a471-435a-3dcb-08dc5b50b51d",
            userId: null,
            courseId: "fcc1831f-c521-4645-dd3d-08dc579639eb",
            courseCode: "SN212",
            classCode: "RPRO01",
            startDate: "2024-04-13T07:29:00",
            endDate: "2024-06-01T07:29:00",
            statusOfClass: "Expired",
            maxNumber: 15,
            expectedNumber: 10,
            actualNumber: 2,
            scheduleClassViews: null,
          },
        },
      ],
    };
  },
  created() {
    if (this.authStore.getAuth?.roleName == "Teacher") {
      this.fetchClassByTeacher();
      this.header = tableConfig.classByTeacherTable();
    } else {
      this.header = tableConfig.classTable();
      this.fetchClass();
    }
    this.fetchCourses();
    this.fetchEnumClass();
    const message = this.$route.query.message;
    if (message != null && message != "")
      swal.success("Giao dịch thành công! Tiến hành thêm trẻ vào lớp", 3000);
  },
  methods: {
    fetchClassByTeacher() {
      this.systemStore.setChangeLoading(true);
      API_SCHEDULE.getAutomaticalySchedule(this.authStore.getAuth?.id)
        .then((res) => {
          this.classByTeacher = res.data?.classes;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    fetchClass() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getClasses()
        .then((res) => {
          this.data = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    captureCertificate() {
      const certificateElement = document.getElementById("certificate");

      html2canvas(certificateElement).then((canvas) => {
        const imageDataUrl = canvas.toDataURL("image/png");
        const fileName = this.generateUniqueFileName("png");
        this.uploadImageToFirebase(imageDataUrl, fileName);
      });
    },
    async uploadImageToFirebase(imageDataUrl, fileName) {
      const storageRef = ref(storage, `certificates/${fileName}`);
      const metadata = { contentType: "image/png" };

      try {
        await uploadBytes(storageRef, imageDataUrl, metadata);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Download URL: ", downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    },
    generateUniqueFileName(extension) {
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      return `${timestamp}_${randomString}.${extension}`;
    },
    updateClass(data) {
      if (this.authStore.getAuth.roleName == "Staff")
        return swal.error("Nhân viên không có quyền thực hiện chức năng này!");
      this.systemStore.setChangeLoading(true);
      API_CLASS.putClass(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchClass();
        })
        .catch((err) => {
          // swal.error("Cập nhật thất bại! Vui lòng thử lại");
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    gotoDetail(item) {
      this.$router.push({ name: "class-detail", params: { id: item?.id } });
    },
    reloadList() {
      this.fetchClass();
    },
    deleteClass(item) {
      if (this.authStore.getAuth.roleName == "Staff")
        return swal.error("Nhân viên không có quyền thực hiện chức năng này!");
      swal.confirm("Bạn có chắc chắn muốn xoá không?").then((result) => {
        if (result.value) {
          this.systemStore.setChangeLoading(true);
          API_CLASS.deleteClass(item?.id)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
              swal.success("Xoá thành công");
              this.fetchClass();
            })
            .catch((err) => {
              this.systemStore.setChangeLoading(false);
              swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
            });
        }
      });
    },
    fetchCourses() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.courses = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    changeStatusOfClasses(items) {
      let fData = [];
      let fDataName = [];
      items.map((i) => {
        fData.push(i?.id);
        fDataName.push(i?.classCode);
      });
      this.selectedClass = fData;
      this.isSelectedStatus = true;
      this.selectedClassByName = fDataName.join(", ");
    },
    fetchEnumClass() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.getEnumClass()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.selectedStatus = res.data[0]?.display;
          this.enumClass = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleChangeStatus() {
      this.systemStore.setChangeLoading(true);
      API_CLASS.changeStatusClass({
        ids: this.selectedClass,
        status: this.selectedStatus,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.fetchClass();
          this.selectedClass = [];
          swal.success("Cập nhật trạng thái cho lớp học thành công");
          this.isSelectedStatus = false;
          this.createCertificate(res.data);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response.data);
        });
    },

    createCertificate(data) {
      let tmpData = [];
      if (data.length > 0) {
        if (data[0]?.childrenProfile != null) {
          data.map((item) => {
            if (item?.childrenProfile && item?.course) {
              tmpData.push({
                childrenProfileId: item?.childrenProfile?.id,
                courseId: item?.course?.id,
                code: func.makeUnique(10),
                url: "null",
              });
            }
          });

          this.systemStore.setChangeLoading(true);
          API_CERTIFICATE.postCertificate(tmpData)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
            })
            .catch((err) => {
              this.systemStore.setChangeLoading(false);
            });
        } else {
          // hong có ai passed hoặc k phải đang end class
        }
      }
    },
  },
};
</script>
<style scoped>
.fog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
