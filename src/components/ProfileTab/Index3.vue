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
            <div class="w-full flex items-center justify-between">
              <span class="text-[20px]">Danh sách lớp</span>
              <button
                v-if="classesData.length > 0"
                class="btn-primary px-3 py-1"
                @click="handleShowWeeklyTimetable"
              >
                Thời khoá biểu
              </button>
            </div>
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
            <TableWithPagin
              v-else
              :pageSize="5"
              :is-show-action="true"
              :data="testOfChildrenData"
              :view-exam="true"
              @view-exam="viewExam"
            />
          </div>
        </div>

        <!-- list certificate -->
        <div class="w-full mt-10">
          <div class="flex w-full items-center justify-between flex-wrap">
            <span class="text-[20px]">Danh sách chứng chỉ</span>
          </div>
          <div class="w-full mt-10">
            <TableWithPagin
              :pageSize="5"
              :data="certificatesData"
              :is-show-action="true"
              :view-certificate="true"
              @view-certificate="handleViewCertificate"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="fog-q" v-if="isShowTest">
      <div
        class="w-[95%] md:w-[90%] lg:w-[90%] bg-white rounded-2xl relative p-6 max-h-[95vh] overflow-y-scroll hide-scrollbar"
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
                <!-- <span
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
                > -->
              </span>
            </div>
            <button @click="submitExam" class="btn-primary px-3 py-1 mt-3">
              Nộp bài
            </button>
          </div>
          <div class="w-[80%] flex flex-col items-start">
            <div
              class="w-full pr-2 flex items-start justify-between mb-5 flex-wrap flex-col lg:flex-row"
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
                class="br-cus w-full lg:w-[79%] lg:mt-0 mt-1 px-2 flex items-start flex-col"
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
        <ChildrenAttendance
          :data="attendanceData"
          :children-data="childrenDetail"
        />
      </div>
    </div>

    <div
      class="fog-attendance"
      v-if="isShowWeeklyTimetable"
      @click.self="cancelAll"
    >
      <div
        class="w-[95%] md:w-[90%] lg:w-[80%] bg-white overflow-y-scroll hide-scrollbar max-h-[90vh] p-10 rounded-xl"
      >
        <span class="block w-full text-[26px] font-bold">
          Lịch học của {{ childrenDetail?.fullName }}
        </span>

        <div class="w-full mt-10">
          <div class="w-full flex items-start justify-between br-f p-2">
            <div class="w-[30%] flex flex-col items-start br-r">
              <div class="w-full">
                <select
                  class="select-primary px-3 py-1"
                  name=""
                  v-model="selectedYear"
                  id=""
                >
                  <option
                    :value="item"
                    v-for="(item, index) in years"
                    :key="index"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="w-full mt-2">
                <select
                  class="select-primary px-3 py-1"
                  name=""
                  v-model="selectedWeek"
                  id=""
                >
                  <option
                    :value="item"
                    v-for="(item, index) in listWeeks"
                    :key="index"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-[70%] flex items-center justify-between h-[75px]">
              <div
                v-for="(item, index) in listDateInWeek"
                :key="index"
                class="w-[14%] br-r text-center h-full"
              >
                {{ getDay(item) }} <br />
                {{ item }}
              </div>
            </div>
          </div>

          <!-- hien thi lich o day -->
          <div class="w-full">
            <!-- <div v-if="scheduleData[date]?.[slot]">
              {{ scheduleData[date][slot].courseName }} <br />
              {{ scheduleData[date][slot].roomName }}
            </div>
            <div v-else>-</div> -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="fog-attendance"
      v-if="isShowViewExam"
      @click.self="isShowViewExam = false"
    >
      <div
        class="w-[95%] md:w-[90%] lg:w-[80%] bg-white overflow-y-scroll hide-scrollbar max-h-[90vh] p-10 rounded-xl"
      >
        <QuestionReview
          :lesson="null"
          :data="listQuestionsReview"
          :pageSize="5"
          :is-edit="false"
          :is-delete="false"
          :total-score="totalScore"
        />
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
import {
  startOfWeek,
  endOfWeek,
  addDays,
  eachWeekOfInterval,
  eachDayOfInterval,
  format,
  parse,
} from "date-fns";
import { useSystemStore } from "../../stores/system";
import { useAuthStore } from "../../stores/Auth";
import TableWithPagin from "../../components/TableWithPagin.vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import viLocale from "date-fns/locale/vi";
import swal from "../../common/swal";
import QuestionReview from "../QuestionReview.vue";
import func from "../../common/func";
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
    QuestionReview,
  },
  data() {
    return {
      scheduleData: {},
      childrenData: [],
      isShowUniqueData: false,
      isShowWeeklyTimetable: false,
      toDateTimeWeeklyTimetable: "",
      fromDateTimeWeeklyTimetable: "",
      listWeeks: [],
      selectedWeek: null,
      years: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        "2032",
        "2033",
        "2034",
        "2035",
        "2036",
        "2037",
        "2038",
        "2039",
        "2040",
        "2041",
        "2042",
        "2043",
        "2044",
        "2045",
        "2046",
        "2047",
        "2048",
        "2049",
        "2050",
      ],
      listDateInWeek: [],
      selectedYear: "",
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
      certificatesData: [],
      testOfChildrenData: [],
      isShowViewSchedule: false,
      attendanceData: [],
      isShowViewExam: false,
      listQuestionsReview: [],
      totalScore: 0,
      backupChildId: "",
    };
  },
  created() {
    this.fetchChildren();
  },
  mounted() {
    this.selectedYear = new Date().getFullYear();
    // Ngày đầu tiên của năm
    const startDate = new Date(this.selectedYear, 0, 1);
    // Ngày cuối cùng của năm
    const endDate = new Date(this.selectedYear, 11, 31);
    // mảng các tuần trong khoảng thời gian
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today);
    const endOfCurrentWeek = endOfWeek(today);
    this.selectedWeek = `${format(startOfCurrentWeek, "dd/MM")} đến ${format(
      endOfCurrentWeek,
      "dd/MM"
    )}`;

    this.listWeeks = weeks.map((week) => {
      const start = startOfWeek(week);
      const end = endOfWeek(week);
      const formattedWeek = `${format(start, "dd/MM")} đến ${format(
        end,
        "dd/MM"
      )}`;
      return formattedWeek;
    });
  },
  watch: {
    selectedWeek(newValue, oldValue) {
      this.updateListDateInWeek();
    },
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
      this.backupChildId = child;
      API_USER.getChildrenById(child?.id)
        .then((res) => {
          this.childrenDetail = res.data;
          this.systemStore.setChangeLoading(false);
          this.convertDataCourse();
          this.convertDataClass();
          this.convertDataCertificate();
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
    updateListDateInWeek() {
      dayjs.extend(customParseFormat);
      const [startStr, endStr] = this.selectedWeek.split(" đến ");
      const year = new Date().getFullYear();
      const startDate = startStr + "/" + year;
      const endDate = endStr + "/" + year;
      const startD = dayjs(startDate, "DD/MM/YYYY").format("DD/MM/YYYY");
      const endD = dayjs(endDate, "DD/MM/YYYY").format("DD/MM/YYYY");
      const daysInWeek = [];
      let currentDate = startD;
      while (currentDate <= endD) {
        daysInWeek.push(dayjs(currentDate, "DD/MM/YYYY").format("DD/MM"));
        currentDate = dayjs(currentDate, "DD/MM/YYYY")
          .add(1, "day")
          .format("DD/MM/YYYY");
      }
      this.listDateInWeek = daysInWeek;
    },
    viewExam(item) {
      this.systemStore.setChangeLoading(true);
      API_CHILDRENANSWER.childrenAnswerByChildrenAndExam(
        this.childrenDetail?.id,
        item.examId
      )
        .then((res) => {
          this.listQuestionsReview = res.data;
          this.systemStore.setChangeLoading(false);
          let score = 0;

          res.data.map((item) => {
            score = score + item?.scorePerQuestion;
          });
          this.isShowViewExam = true;
          this.totalScore = score;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    handleCreateTest() {
      this.systemStore.setChangeLoading(true);
      API_EXAM.postExam({
        courseId: null,
        testName: "Bài đầu vào",
        testDate: new Date().toISOString(),
        testDuration: 30,
        testType: 1,
        testCode: func.makeUnique(10),
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
    convertDataCertificate() {
      let fData = [];
      this.childrenDetail?.certificates.map((item) => {
        fData.push({
          // courseId: item.courseId,
          code: item.code,
        });
      });
      this.certificatesData = fData;
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
          examId: item.examId,
          examName: item.examName,
        });
      });
      this.testOfChildrenData = fData;
    },
    submitExam() {
      let isChooseAll = true;
      this.questionList.map((item) => {
        if (item?.childrenAnswer == null) isChooseAll = false;
        return;
      });

      if (isChooseAll == false)
        return swal.error("Bạn phải làm tất cả các câu hỏi trước khi nộp bài!");
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
              ? Number.parseFloat((10 / this.questionList.length).toFixed(1))
              : 0,
        });
      });

      this.systemStore.setChangeLoading(true);
      API_CHILDRENANSWER.postChildrenAnswer(fData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("Bạn đã nộp bài thành công");
          this.handleGetDetail(this.backupChildId);
        })
        .catch((err) => {
          swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    handleViewCertificate(item) {
      const currentUrl = func.getClientURL();
      window.open(
        `${currentUrl}/certificate?childrenId=${this.childrenDetail?.id}&code=${item?.code}`
      );
    },
    handleShowWeeklyTimetable() {
      this.isShowWeeklyTimetable = true;

      this.getAllSchedule();
    },
    getAllSchedule() {
      const [startStr, endStr] = this.selectedWeek.split(" đến ");
      let sD = dayjs(
        `${startStr.replaceAll("/", "-")}-${this.selectedYear}`,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");
      let eD = dayjs(
        `${endStr.replaceAll("/", "-")}-${this.selectedYear}`,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");
      this.systemStore.setChangeLoading(true);
      API_ATTENDANCE.attendanceByChildrenId(this.childrenDetail?.id, sD, eD)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.scheduleData = {};
          
          console.log(this.scheduleData);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          swal.error(err.response?.data);
        });
    },
    cancelAll() {
      this.isShowWeeklyTimetable = false;
      this.isShowTest = false;
      this.questionList = [];
      this.allAnswerByChildren = [];
      this.rightAnswerByChildren = [];
      this.second = 60;
      this.initTime = 30;
      this.isShowResult = false;
      if (this.intervalId) clearInterval(this.intervalId);
      this.handleGetDetail(this.backupChildId);
    },

    getQuestions() {
      API_QUESTION.createTestEntry({
        totalQuestion: 20,
        childrenId: this.childrenDetail?.id,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          // this.questionList = res.data[0]?.questions;
          this.questionList = res.data;
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
    getDay(item) {
      const currentDate = parse(item, "dd/MM", new Date());

      const finalDate = format(currentDate, "EEEE", { locale: viLocale });

      return finalDate;
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
  border: 1px solid #ebebeb;
  width: 100%;
}

.row {
  display: table-row;
}

.cell {
  display: table-cell;
  border: 1px solid #ebebeb;
  padding: 5px;
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

.br-f {
  border: 1px solid rgb(209, 209, 209);
}
.br-r {
  border-right: 1px solid rgb(209, 209, 209);
}
</style>
