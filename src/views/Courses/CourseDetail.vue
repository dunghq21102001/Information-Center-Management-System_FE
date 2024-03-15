<template>
  <div class="w-full">
    <div class="mx-auto">
      <span class="text-[28px] font-bold block text-gray-700">
        Chi tiết khoá học
      </span>

      <div
        class="flex items-start justify-between flex-col-reverse md:flex-row"
      >
        <div class="w-full md:w-[70%]">
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Mã khoá học:</span>
            {{ courseDetail?.courseCode }}</span
          ><br />
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Tên khoá học:</span>
            {{ courseDetail?.name }}</span
          ><br />
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Mô tả:</span>
            {{ courseDetail?.description }}</span
          ><br />
          <span class="my-2 text-[18px] font-bold mt-10 mb-4 block"
            >Bài học:
            <span class="text-red-500" v-if="courseDetail?.lessons.length == 0"
              >Chưa có bài học</span
            >
            <v-icon
              v-tooltip="'Tạo bài học mới'"
              name="bi-plus-circle"
              :scale="1.5"
              fill="#0871ba"
              class="cursor-pointer"
            />
          </span>
          <div
            v-if="courseDetail?.lessons.length > 0"
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="bg-white rounded-md p-2 relative flex col-span-12 md:col-span-12 lg:col-span-6 items-center justify-between"
              v-for="child in courseDetail.lessons"
            >
              <span @click="getQuestions(child)" class="cursor-pointer block">
                {{ child?.name }}</span
              >
              <div class="flex items-center justify-between">
                <v-icon
                  v-tooltip="'Tạo câu hỏi cho bài học này'"
                  name="bi-plus-circle"
                  :scale="1.5"
                  fill="#0871ba"
                  class="cursor-pointer"
                />
                <v-icon
                  v-tooltip="'Xoá bài học này'"
                  name="io-close-circle-sharp"
                  class="cursor-pointer"
                  fill="#ef4444"
                  scale="1.5"
                  @click="deleteLesson(child)"
                />
              </div>
            </div>
          </div>
          <span class="my-2 text-[18px] font-bold mt-10 mb-4 block"
            >Lớp học:
            <span class="text-red-500" v-if="courseDetail?.classes.length == 0"
              >Chưa có lớp
            </span>
            <v-icon
              v-tooltip="'Tạo lớp mới'"
              name="bi-plus-circle"
              :scale="1.5"
              fill="#0871ba"
              class="cursor-pointer"
            />
          </span>
          <div
            v-if="courseDetail?.classes.length > 0"
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="flex col-span-12 md:col-span-6 lg:col-span-6 flex-col items-start"
              v-for="child in courseDetail?.classes"
            >
              <span>
                <span class="font-bold">Tên: </span>
                {{ child.classCode }}
              </span>
              <span>
                <span class="font-bold">Tổng học sinh:</span>
                {{ child?.actualNumber }} / {{ child?.maxNumber }}
              </span>
              <span>
                <span class="font-bold">Học khoá:</span> chưa lấy được</span
              >
            </div>
          </div>
        </div>
        <div class="w-full md:w-[30%] flex md:block flex-col">
          <div
            class="overflow-hidden flex items-center justify-center w-full h-[400px] md:w-[200px] lg:w-[250px] md:h-[250px]"
          >
            <img :src="courseDetail?.image" class="object-cover" alt="" />
          </div>
          <span class="block w-full mt-1">
            <span class="font-bold"> Price: </span>
            {{ convertVND(courseDetail?.price) }}</span
          >
        </div>
      </div>
      <div class="w-full mt-5" v-if="questionsByLesson.length > 0">
        <TableWithPagin :data="questionsByLesson" :pageSize="4" />
      </div>
    </div>
  </div>
</template>
<script>
import API_COURSE from "../../API/API_COURSE";
import API_QUESTION from "../../API/API_QUESTION";
import API_LESSONS from "../../API/API_LESSONS";
import { useSystemStore } from "../../stores/System";
import func from "../../common/func";
import swal from "../../common/swal";
import TableWithPagin from "../../components/TableWithPagin.vue";
import schemaConfig from '../../common/config/schemaConfig'
export default {
  components: {
    TableWithPagin,
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      courseDetail: null,
      questions: [],
      resources: [],
      questionsByLesson: [],
      currentLessonSelected: "",
      isShowCreateLesson: false,
      isShowCreateQuestion: false,
      isShowCreateClass: false
    };
  },
  created() {
    this.getCourseDetail(this.$route.params.id);
  },
  methods: {
    convertVND(price) {
      return func.convertVND(price);
    },
    getCourseDetail(id) {
      this.systemStore.setChangeLoading(true);
      API_COURSE.getCourseById(id)
        .then((res) => {
          this.courseDetail = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.$router.push({ name: "not-found", params: { catchAll: "404" } });
          this.systemStore.setChangeLoading(false);
        });
    },
    getQuestions(item) {
      this.currentLessonSelected = item?.id;
      this.systemStore.setChangeLoading(true);
      API_QUESTION.getQuestionsByLesson(item?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          if (res.data.length > 0) {
            this.questionsByLesson = res.data;
          } else {
            swal.info("Bài học này chưa lưu câu hỏi nào");
          }
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    deleteLesson(item) {
      swal
        .confirm(`Bạn có chắc chắn muốn xoá ${item?.name} này không?`)
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_LESSONS.deleteLesson(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                swal.success(res.data);
                this.getCourseDetail(this.$route.params.id);
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
