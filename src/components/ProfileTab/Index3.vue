<template>
  <div class="w-full">
    <p class="page-sub-title">Danh sách trẻ</p>
    <!-- <div class="grid grid-cols-12 gap-4">
            <div v-for="item in listCourse" class="col-span-12 md:col-span-4">
                <CourseCard :item="item" />
            </div>
        </div>
        <div class="w-full mx-auto mt-5 md:w-[60%]">
            <Pagination />
        </div> -->

    <div class="w-full">
      <div class="grid gap-4 grid-cols-12 mt-5">
        <div
          v-for="child in childrenData"
          class="col-span-12 md:col-span-6 lg:col-span-4 rounded-lg overflow-hidden hover:shadow-2xl cursor-pointer"
        >
          <ChildrenCard
            :child="child"
            @handle-edit="handleEdit"
            @handle-get-detail="handleGetDetail"
          />
        </div>
      </div>
      <div class="line" v-show="isShowUniqueData"></div>
      <div class="w-full mt-5" v-show="isShowUniqueData">
        <span class="text-[24px]">Chi tiết về trẻ</span>
        <div class="table mt-5">
          <div class="row">
            <div class="cell font-bold">Họ và tên</div>
            <div class="cell">{{ childrenDetail?.fullName }}</div>
          </div>
          <div class="row">
            <div class="cell font-bold">Giới tính</div>
            <div class="cell">{{ childrenDetail?.genderType }}</div>
          </div>
          <div class="row">
            <div class="cell font-bold">Tuổi</div>
            <div class="cell">{{ getAge(childrenDetail?.birthDay) }}</div>
          </div>
          <div class="row">
            <div class="cell font-bold">Sinh nhật</div>
            <div class="cell">
              {{ convertDateTmp(childrenDetail?.birthDay) }}
            </div>
          </div>
        </div>

        <!-- list course -->
        <div class="w-full mt-10">
          <div class="flex w-full items-center justify-between flex-wrap">
            <span class="text-[20px]">Danh sách khoá học</span>
            <!-- <button @click="handleCreateTest" class="btn-primary px-2 py-1">
              Thực hiện bài kiểm tra đầu vào
            </button> -->
          </div>
          <div class="w-full mt-10">
            <TableWithPagin
              :pageSize="5"
              :data="coursesData"
              :is-show-action="true"
              :view-schedule="true"
              @view-schedule="viewSchedule"
            />
          </div>
        </div>

        <!-- list class -->
        <div class="w-full mt-10">
          <div class="flex w-full items-center justify-between flex-wrap">
            <span class="text-[20px]">Danh sách lớp</span>
            <!-- <button @click="handleCreateTest" class="btn-primary px-2 py-1">
              Thực hiện bài kiểm tra đầu vào
            </button> -->
          </div>
          <div class="w-full mt-10">
            <TableWithPagin :pageSize="5" :data="classesData" />
          </div>
        </div>

        <!-- list quiz -->
        <div class="w-full mt-10">
          <div class="flex w-full items-center justify-between flex-wrap">
            <span class="text-[20px]">Các bài kiểm tra đã làm</span>
            <button @click="handleCreateTest" class="btn-primary px-2 py-1">
              Thực hiện bài kiểm tra đầu vào
            </button>
          </div>
          <div class="w-full mt-10">
            <p
              v-if="testOfChildrenData.length == 0"
              class="w-full text-center font-bold text-gray-600"
            >
              Chưa thực hiện bài kiểm tra nào
            </p>
            <TableWithPagin v-else :pageSize="5" :data="testOfChildrenData" />
          </div>
        </div>
      </div>
    </div>

    <div class="fog-q" v-if="isShowTest">
      <div
        class="w-[95%] md:w-[90%] lg:w-[80%] bg-white rounded-2xl relative p-6 max-h-[90vh] overflow-y-scroll hide-scrollbar"
      >
        <v-icon
          class="sticky top-0 left-[98%] cursor-pointer"
          @click="cancelAll"
          name="io-close-outline"
          scale="1.5"
        />
        <div class="flex items-start flex-row-reverse mt-10">
          <div class="w-[20%] sticky top-10 left-[90%]">
            <div class="gap-2 grid grid-cols-12">
              <div
                class="col-span-3 lg:col-span-2 br-c h-[50px] flex flex-col overflow-hidden"
                v-for="(ic, index) in questionList"
                :class="[
                  ic?.childrenAnswer == null ? 'border-init' : 'border-select',
                ]"
              >
                <span class="text-center py-[2px] block bg-gray-300">{{
                  index + 1
                }}</span>
                <div class="bg-white"></div>
              </div>
            </div>
            <span class="mt-5 block"
              >Thời gian: {{ initTime - 1 }} phút {{ second }} giây</span
            >
            <div class="w-full" v-if="isShowResult">
              <span class="block">
                Số câu đúng:
                {{ rightAnswerByChildren.length }} /
                {{ allAnswerByChildren.length }}
              </span>
              <span class="block">
                Điểm của bạn:
                {{
                  (
                    (rightAnswerByChildren.length * 10) /
                    allAnswerByChildren.length
                  ).toFixed(0)
                }}
                / 10
                <br />
                <span
                  class="font-bold"
                  :class="
                    (rightAnswerByChildren.length * 10) /
                      allAnswerByChildren.length >=
                    5
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  >{{
                    (rightAnswerByChildren.length * 10) /
                      allAnswerByChildren.length >=
                    5
                      ? "Passed"
                      : "Not passed"
                  }}</span
                >
              </span>
            </div>
            <button @click="submitExam" class="btn-primary px-3 py-1 mt-3">
              Nộp bài
            </button>
          </div>
          <div class="w-[80%] flex flex-col items-start">
            <div
              class="w-full pr-2 flex items-start justify-between mb-2 flex-wrap flex-col lg:flex-row"
              v-for="(item, i) in questionList"
              :key="i"
            >
              <div class="br-cus w-full lg:w-[20%] px-2">
                <span class="block text-[18px] font-bold"
                  >Câu hỏi {{ i + 1 }}</span
                >
                <!-- <span class="block">Độ khó: {{ item?.level }}</span> -->
              </div>
              <div
                class="br-cus w-full lg:w-[79%] lg:mt-0 mt-5 px-2 flex items-start flex-col"
              >
                <p class="mb-3">{{ item?.title }}</p>
                <p>
                  <input
                    :disabled="isShowResult"
                    v-model="item.childrenAnswer"
                    type="radio"
                    :id="item?.answer1"
                    :value="item?.answer1"
                  />
                  <label
                    :class="
                      item?.answer1 == item?.rightAnswer &&
                      item?.answer1 == item?.childrenAnswer &&
                      isShowResult
                        ? 'font-bold text-green-500'
                        : ''
                    "
                    :for="item?.answer1"
                  >
                    A. {{ item?.answer1 }}</label
                  >
                </p>
                <p>
                  <input
                    :disabled="isShowResult"
                    v-model="item.childrenAnswer"
                    type="radio"
                    :id="item?.answer2"
                    :value="item?.answer2"
                  />
                  <label
                    :class="
                      item?.answer2 == item?.rightAnswer &&
                      item?.answer2 == item?.childrenAnswer &&
                      isShowResult
                        ? 'font-bold text-green-500'
                        : ''
                    "
                    :for="item?.answer2"
                  >
                    B. {{ item?.answer2 }}</label
                  >
                </p>
                <p>
                  <input
                    :disabled="isShowResult"
                    v-model="item.childrenAnswer"
                    type="radio"
                    :id="item?.answer3"
                    :value="item?.answer3"
                  />
                  <label
                    :class="
                      item?.answer3 == item?.rightAnswer &&
                      item?.answer3 == item?.childrenAnswer &&
                      isShowResult
                        ? 'font-bold text-green-500'
                        : ''
                    "
                    :for="item?.answer3"
                  >
                    C. {{ item?.answer3 }}</label
                  >
                </p>
                <p>
                  <input
                    :disabled="isShowResult"
                    v-model="item.childrenAnswer"
                    type="radio"
                    :id="item?.answer4"
                    :value="item?.answer4"
                  />
                  <label
                    :class="
                      item?.answer4 == item?.rightAnswer &&
                      item?.answer4 == item?.childrenAnswer &&
                      isShowResult
                        ? 'font-bold text-green-500'
                        : ''
                    "
                    :for="item?.answer4"
                  >
                    D. {{ item?.answer4 }}</label
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- submit btn -->
        <!-- <div class="w-[90%] mx-auto flex items-center justify-end">
          <button @click="submitExam" class="btn-primary px-3 py-1">
            Nộp bài
          </button>
        </div> -->
      </div>
    </div>

    <div
      class="fog-attendance"
      v-if="isShowViewSchedule"
      @click.self="isShowViewSchedule = false"
    >
      <div
        class="w-[95%] md:w-[90%] lg:w-[80%] bg-white overflow-y-scroll hide-scrollbar max-h-[90vh] p-10 rounded-xl"
      >
        <ChildrenAttendance :data="attendanceData" :children-data="childrenDetail"/>
      </div>
    </div>
  </div>
</template>
<script>
import CourseCard from "../CourseCard.vue";
import Pagination from "../Pagination.vue";
import ChildrenAttendance from "../ChildrenAttendance.vue";
import ChildrenCard from "../../components/ChildrenCard.vue";
import API_USER from "../../API/API_USER";
import API_EXAM from "../../API/API_EXAM";
import API_ATTENDANCE from "../../API/API_ATTENDANCE";
import API_QUESTION from "../../API/API_QUESTION";
import API_CHILDRENANSWER from "../../API/API_CHILDRENANSWER";
import { useSystemStore } from "../../stores/system";
import { useAuthStore } from "../../stores/Auth";
import TableWithPagin from "../../components/TableWithPagin.vue";
import dayjs from "dayjs";
import swal from "../../common/swal";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  props: {},
  components: {
    CourseCard,
    Pagination,
    ChildrenCard,
    TableWithPagin,
    ChildrenAttendance,
  },
  data() {
    return {
      childrenData: [],
      isShowUniqueData: false,
      childrenDetail: null,
      examData: null,
      fData: [
        { name: "Bài kiểm tra 15p", date: "20/3/2024", score: "9" },
        { name: "Bài kiểm tra 45p", date: "26/3/2024", score: "5" },
      ],
      isShowTest: false,
      isShowResult: false,
      rightAnswerByChildren: [],
      allAnswerByChildren: [],
      questionList: [],
      initTime: 30,
      second: 60,
      intervalId: null,
      coursesData: [],
      classesData: [],
      testOfChildrenData: [],
      isShowViewSchedule: false,
      attendanceData: [],
    };
  },
  created() {
    this.fetchChildren();
  },
  methods: {
    fetchChildren() {
      this.systemStore.setChangeLoading(true);
      API_USER.getChildrenByParent(this.authStore.getAuth?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.childrenData = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    getAge(date) {
      const curYear = new Date().getFullYear();
      const d = new Date(date).getFullYear();
      return curYear - d;
    },
    convertDateTmp(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
    handleEdit(child) {
      console.log(child);
    },
    handleGetDetail(child) {
      this.isShowUniqueData = true;
      this.systemStore.setChangeLoading(true);
      API_USER.getChildrenById(child?.id)
        .then((res) => {
          this.childrenDetail = res.data;
          this.systemStore.setChangeLoading(false);
          this.convertDataCourse();
          this.convertDataClass();
          this.convertDataExam();
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
      this.$nextTick(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    handleCreateTest() {
      this.systemStore.setChangeLoading(true);
      API_EXAM.postExam({
        courseId: null,
        testName: "Bài đầu vào",
        testDate: new Date().toISOString(),
        testDuration: 30,
        testType: 1,
      })
        .then((res) => {
          this.examData = res.data;
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
      this.getQuestions();
      this.isShowTest = true;
      this.second = 60;

      this.intervalId = setInterval(() => {
        if (this.second > 0) {
          this.second--;
        } else {
          if (this.initTime > 0) {
            this.initTime--;
            this.second = 60;
          } else {
            this.submitExam();
            clearInterval(this.intervalId);
            return;
          }
        }
      }, 1000);
    },
    convertDataCourse() {
      let fData = [];
      this.childrenDetail?.courses.map((item) => {
        fData.push({
          courseId: item.courseId,
          courseCode: item.courseCode,
        });
      });
      this.coursesData = fData;
    },
    convertDataClass() {
      let fData = [];
      this.childrenDetail?.classes.map((item) => {
        fData.push({
          classCode: item.classCode,
        });
      });
      this.classesData = fData;
    },
    convertDataExam() {
      let fData = [];
      this.childrenDetail?.exams.map((item) => {
        fData.push({
          examName: item.examName,
        });
      });
      this.testOfChildrenData = fData;
    },
    submitExam() {
      if (this.isShowResult == true) {
        if (this.intervalId) clearInterval(this.intervalId);
        return swal.error("Bạn đã nộp bài rồi!");
      }
      let tmpArr = [];
      let fData = [];
      this.questionList.map((item) => {
        if (item?.childrenAnswer == item?.rightAnswer) {
          tmpArr.push(item);
        }
        return item;
      });

      this.rightAnswerByChildren = tmpArr;
      this.allAnswerByChildren = this.questionList;
      this.isShowResult = true;
      if (this.intervalId) clearInterval(this.intervalId);

      this.questionList.map((i) => {
        fData.push({
          childrenProfileId: this.childrenDetail?.id,
          examId: this.examData?.id,
          questionId: i?.id,
          answer: i?.childrenAnswer,
          scorePerQuestion:
            i?.childrenAnswer == i?.rightAnswer
              ? Number.parseFloat((10 / this.questionList.length).toFixed(0))
              : 0,
        });
      });

      this.systemStore.setChangeLoading(true);
      API_CHILDRENANSWER.postChildrenAnswer(fData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("Bạn đã nộp bài thành công");
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.isShowTest = false;
      this.questionList = [];
      this.allAnswerByChildren = [];
      this.rightAnswerByChildren = [];
      this.second = 60;
      this.initTime = 30;
      this.isShowResult = false;
      if (this.intervalId) clearInterval(this.intervalId);
    },

    getQuestions() {
      API_QUESTION.getQuestionsOrCreateQuiz([
        {
          lessonId: null,
          totalQuestion: null,
          type: 2,
        },
      ])
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.questionList = res.data[0]?.questions;
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    viewSchedule(item) {
      this.systemStore.setChangeLoading(true);
      API_ATTENDANCE.attendanceDetail(item?.courseId, this.childrenDetail?.id)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.isShowViewSchedule = true;
          this.attendanceData = res.data;
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
        });
    },
  },
};
</script>
<style scoped>
.br-cus {
  border: 1px solid rgb(213, 213, 213);
}

.table {
  display: table;
  border: 1px solid #ebebeb; /* Thêm viền cho các ô */
  width: 100%; /* Đặt chiều rộng bằng 100% hoặc giá trị mong muốn */
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
  border: 1px solid #ebebeb; /* Thêm viền cho các ô */
  padding: 5px; /* Thêm padding nếu cần */
}

.line {
  margin: 50px 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed rgb(182, 182, 182);
}

.fog-q {
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

.i-cus {
  outline: none;
  border-bottom: 2px solid rgb(212, 212, 212);
  padding: 10px 8px;
  width: 100%;
}

.i-cus2 {
  outline: none;
  border-bottom: 2px solid rgb(212, 212, 212);
  padding: 10px 8px;
  width: 100%;
}

.br-c {
  border-radius: 5px;
}

.border-init {
  border: 2px solid rgb(209, 213, 219);
}

.border-select {
  border: 2px solid rgb(40, 101, 194);
}

.fog-attendance {
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
