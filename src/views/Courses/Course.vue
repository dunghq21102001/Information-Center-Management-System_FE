<template>
  <div class="w-full">
    <span class="text-[28px] font-bold block text-gray-700">Khoá học</span>

    <div class="w-[90%] mx-auto">
      <NormalTable
        :data="data"
        :header="header"
        :is-show-search="true"
        :is-add-child-course="true"
        :is-update="true"
        :is-delete="true"
        :is-multi-select="true"
        :is-buy="true"
        is-add="course-create"
        excel="course-data"
        csv="course-data"
        :reload="true"
        :enum="true"
        :enum-list="enum"
        :course-list="courses"
        @reload-action="reloadList"
        @update-action="updateCourse"
        @add-new-schema="handleAddChildCourse"
        @delete-action="deleteCourse"
        @click-to-row="handleClickToRow"
        @show-form="goToOrder"
      />
    </div>

    <div
      v-if="isShowParentList"
      class="bg-l"
      @click.self="isShowParentList = false"
    >
      <div class="w-[90%] md:w-[60%] lg:w-[40%] bg-white min-h-screen px-3">
        <FormList
          :data-list="listParent"
          title="Danh sách phụ huynh"
          @handle-submit-list="submitOrder"
        />
      </div>
    </div>
  </div>
</template>
<script>
import tableConfig from "../../common/config/tableConfig";
import { useSystemStore } from "../../stores/System";
import API_COURSE from "../../API/API_COURSE.js";
import API_ORDER from "../../API/API_ORDER";
import NormalTable from "../../components/NormalTable.vue";
import swal from "../../common/swal";
import API_USER from "../../API/API_USER";
import FormList from "../../components/FormList.vue";
import func from "../../common/func";
import { storage } from "../../common/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    NormalTable,
    FormList,
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      header: tableConfig.courseTable(),
      data: [],
      enum: [],
      isShowParentList: false,
      listParent: [],
      coursesSelected: [],
      courses: [],
    };
  },
  created() {
    this.fetchCourses();
    this.fetchEnum();
    this.getParentList();
  },
  methods: {
    fetchCourses() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourses()
        .then((res) => {
          this.data = res.data;
          let tmp = func.cloneArray(res.data);
          tmp.unshift({ id: 'null', name: "Không có" });
          this.courses = tmp;

          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    updateCourse(data) {
      this.systemStore.setChangeLoading(true);
      API_ROOM.putRoom(data)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.fetchCourses();
        })
        .catch((err) => {
          swal.error("Cập nhật thất bại!");
          this.systemStore.setChangeLoading(false);
        });
    },
    async handleAddChildCourse(data) {
      this.systemStore.setChangeLoading(true);
      // data["parentCode"] = [];
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
    submitOrder(item) {
      let selectedList = [];
      item.map((i) => {
        if (i?.select == true) selectedList.push(i?.id);
        return i;
      });

      if (selectedList.length == 0)
        return swal.error("Phải chọn phụ huynh để tiến hành tạo đơn hàng");
      if (selectedList.length > 1)
        return swal.error("Chỉ có thể chọn tối đa 1 phụ huynh");

      this.systemStore.setChangeLoading(true);
      API_ORDER.postOrder({
        parentId: selectedList[0],
        listCourseId: this.coursesSelected,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("Tạo đơn hàng thành công!");
          this.$router.push({ name: "order-list", params: {} });
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchEnum() {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getEnum()
        .then((res) => {
          this.enum = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    handleClickToRow(item) {
      this.$router.push({ name: "course-detail", params: { id: item?.id } });
    },
    reloadList() {
      this.fetchCourses();
    },
    goToOrder(item) {
      this.isShowParentList = true;
      let finalData = [];
      item.map((i) => {
        finalData.push(i?.id);
        return i;
      });
      this.coursesSelected = finalData;
    },
    getParentList() {
      this.systemStore.setChangeLoading(true);
      API_USER.userByRole("d5fa55c7-315d-4634-9c73-08dbbc3f3a54")
        .then((res) => {
          this.listParent = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    deleteCourse(item) {
      swal.confirm("Bạn có chắc chắn muốn xoá không?").then((result) => {
        if (result.value) {
          this.systemStore.setChangeLoading(true);
          API_COURSE.deleteCourse(item?.id)
            .then((res) => {
              this.systemStore.setChangeLoading(false);
              swal.success("Xoá thành công!");
              this.fetchCourses();
            })
            .catch((err) => {
              this.systemStore.setChangeLoading(false);
              swal.error("Xoá thất bại! Vui lòng thử lại", 2500);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.bg-l {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 60;
}
</style>
