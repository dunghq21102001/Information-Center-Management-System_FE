<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Lớp học</span>

    <div class="w-[90%] mx-auto">
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

    <!-- <div class="w-full" id="certificate">
      <Certificate
        :children-name="'Hoang Quoc Dung'"
        :course-name="'Robotic cơ bản'"
        :code="'AK91VQ2'"
      />
      <button @click="captureCertificate">Tải xuống certificate</button>
    </div> -->
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_CLASS from "../../API/API_CLASS.js";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
import API_COURSE from "../../API/API_COURSE.js";
import { useAuthStore } from "../../stores/Auth.js";
import Certificate from "../../components/Certificate.vue";
import html2canvas from "html2canvas";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
      header: tableConfig.classTable(),
      data: [],
      courses: [],
      selectedClass: [],
      selectedClassByName: [],
      isSelectedStatus: false,
      enumClass: [],
      selectedStatus: "",
      fData: [
        {
          childrenProfile: {
            id: "f2e7be78-fe6a-478f-1f93-08dc4a7d7be1",
            userId: "354143f6-4727-42a0-a4c9-08dc4a7a0964",
            fullName: "Nguyễn Minh Tài",
            genderType: "Nam",
            birthDay: "2018-03-22T14:34:41.081",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fminhtai.jpg?alt=media&token=c28c9e3e-e7d4-4004-8b3d-456df93583b1",
            specialSkill: "lap rap",
          },
          course: {
            id: "19d19980-9ac1-4272-a6c2-08dc48dfba36",
            courseCode: "PRN211",
            price: 200000,
            name: "Basic Cross-Platform Application Programming With .NET",
            description: "string",
            durationTotal: 8,
            syllabus: "string",
            level: "1",
            entryPoint: "7",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2FPRN211.jpg?alt=media&token=c514297b-ac0f-4e30-988b-e4e06fbaaa49",
            courseType: "Single",
          },
          class: null,
        },
        {
          childrenProfile: {
            id: "f4960142-6397-4dc8-1f94-08dc4a7d7be1",
            userId: "f9c25b98-5cc4-4bfe-a4ca-08dc4a7a0964",
            fullName: "Nguyễn Gia Huy",
            genderType: "Nam",
            birthDay: "2017-03-22T14:34:41.081",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fgiahuy.jpg?alt=media&token=e39e9d07-685b-4b24-b68b-d8882e47bb7b",
            specialSkill: "lap rap",
          },
          course: {
            id: "19d19980-9ac1-4272-a6c2-08dc48dfba36",
            courseCode: "PRN211",
            price: 200000,
            name: "Basic Cross-Platform Application Programming With .NET",
            description: "string",
            durationTotal: 8,
            syllabus: "string",
            level: "1",
            entryPoint: "7",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2FPRN211.jpg?alt=media&token=c514297b-ac0f-4e30-988b-e4e06fbaaa49",
            courseType: "Single",
          },
          class: null,
        },
        {
          childrenProfile: {
            id: "bb4bbe20-6caa-4ae2-1f95-08dc4a7d7be1",
            userId: "dde02b15-492b-40ff-a4cb-08dc4a7a0964",
            fullName: "Trần Quang Khải",
            genderType: "Nam",
            birthDay: "2017-03-02T14:34:41.081",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fquangkhai.jpg?alt=media&token=9a2cbb4a-eaf9-4816-b642-99c50ad08484",
            specialSkill: "lap rap",
          },
          course: {
            id: "19d19980-9ac1-4272-a6c2-08dc48dfba36",
            courseCode: "PRN211",
            price: 200000,
            name: "Basic Cross-Platform Application Programming With .NET",
            description: "string",
            durationTotal: 8,
            syllabus: "string",
            level: "1",
            entryPoint: "7",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2FPRN211.jpg?alt=media&token=c514297b-ac0f-4e30-988b-e4e06fbaaa49",
            courseType: "Single",
          },
          class: null,
        },
        {
          childrenProfile: {
            id: "e102ad3a-1438-406f-1f96-08dc4a7d7be1",
            userId: "30028715-1ac0-4097-a4cc-08dc4a7a0964",
            fullName: "Phạm Hùng Cường",
            genderType: "Nam",
            birthDay: "2017-03-02T14:34:41.081",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/avatars%2Fhungcuong.jpg?alt=media&token=1b41bb29-671a-433e-bba9-c60ff09ae07b",
            specialSkill: "lap rap",
          },
          course: {
            id: "19d19980-9ac1-4272-a6c2-08dc48dfba36",
            courseCode: "PRN211",
            price: 200000,
            name: "Basic Cross-Platform Application Programming With .NET",
            description: "string",
            durationTotal: 8,
            syllabus: "string",
            level: "1",
            entryPoint: "7",
            prerequisite: null,
            image:
              "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/coursesImage%2FPRN211.jpg?alt=media&token=c514297b-ac0f-4e30-988b-e4e06fbaaa49",
            courseType: "Single",
          },
          class: null,
        },
      ],
    };
  },
  created() {
    this.fetchClass();
    this.fetchCourses();
    this.fetchEnumClass();
    const message = this.$route.query.message;
    if (message != null && message != "")
      swal.success("Giao dịch thành công! Tiến hành thêm trẻ vào lớp", 3000);
  },
  methods: {
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
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response.data);
        });
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
