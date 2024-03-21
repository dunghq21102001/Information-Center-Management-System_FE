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
            ><span class="font-bold">Giá:</span>
            {{ convertVND(courseDetail?.price) }}</span
          ><br />
          <span class="my-2 text-[18px]"
            ><span class="font-bold">Mô tả:</span>
            {{ courseDetail?.description }}</span
          ><br />
          <button class="btn-primary mt-2 px-1 py-1" @click="handleCreateTest">
            Tạo bài kiểm tra
          </button>

          <span
            class="my-2 text-[18px] font-bold mt-10 mb-4 block"
            v-if="courseDetail?.courses.length > 0"
          >
            Khoá học con:
          </span>
          <div
            class="w-full gap-3 grid grid-cols-12"
            v-if="courseDetail?.courses.length > 0"
          >
            <div
              class="col-span-12 md:col-span-6 flex items-center flex-col"
              v-for="i in courseDetail?.courses"
            >
              <div class="w-[80%] overflow-hidden h-[150px]">
                <img
                  src="https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0="
                  alt="course image"
                />
              </div>
              <span class="block mt-2">{{ i?.courseCode }}</span>
              <span class="block text-center">{{ i?.name }}</span>
              <span class="block">{{ convertVND(i?.price) }}</span>
            </div>
          </div>
          <span class="my-2 text-[18px] font-bold mt-10 mb-4 block">
            Bài học:
            <span class="text-red-500" v-if="courseDetail?.lessons.length == 0"
              >Chưa có bài học</span
            >
            <v-icon
              v-tooltip="'Tạo bài học mới'"
              name="bi-plus-circle"
              :scale="1.5"
              fill="#0871ba"
              class="cursor-pointer ml-2"
              @click="handleCreateNewLesson"
            />
          </span>
          <div
            v-if="courseDetail?.lessons.length > 0"
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="bg-white rounded-md p-2 relative flex col-span-12 md:col-span-12 lg:col-span-12 items-center justify-between"
              v-for="child in courseDetail.lessons"
            >
              <span @click="getQuestions(child)" class="cursor-pointer block">
                {{ child?.name }}</span
              >
              <div class="flex items-center justify-between">
                <v-icon
                  @click="handleCreateNewQuestions(child)"
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
            <!-- <v-icon
              v-tooltip="'Tạo lớp mới'"
              name="bi-plus-circle"
              :scale="1.5"
              fill="#0871ba"
              class="cursor-pointer"
            /> -->
          </span>
          <div
            v-if="courseDetail?.classes.length > 0"
            class="w-full md:w-[90%] grid grid-cols-12 gap-3 p-2 bg-[#f1f1f1]"
          >
            <div
              class="flex col-span-12 lg:col-span-6 flex-col items-start bg-white rounded-lg p-3"
              v-for="child in courseDetail?.classes"
            >
              <span>
                <span class="font-bold">Mã lớp: </span>
                {{ child.classCode }}
              </span>
              <span>
                <span class="font-bold">Tổng học sinh:</span>
                {{ child?.actualNumber }} / {{ child?.maxNumber }} học sinh
              </span>
              <span>
                <span class="font-bold">Bắt đầu: </span>
                {{ convertDate(child?.startDate) }}
              </span>
              <span>
                <span class="font-bold">Kết thúc: </span>
                {{ convertDate(child?.endDate) }}
              </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[30%] flex md:block flex-col">
          <div
            class="overflow-hidden flex items-start justify-center w-full h-[400px] md:w-[200px] lg:w-[250px] md:h-[200px]"
          >
            <img
              :src="
                courseDetail?.image == '' ||
                courseDetail?.image == 'string' ||
                courseDetail?.image == null
                  ? 'https://lms.cicsum.edu.mm/moodle/pluginfile.php/35501/course/overviewfiles/training.jpg'
                  : courseDetail?.image
              "
              class="object-cover"
              alt="course image"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-5" v-if="questionsByLesson.length > 0">
        <QuestionReview
          :lesson="currentLessonSelected"
          :data="questionsByLesson"
          :pageSize="5"
          :is-edit="true"
          :is-delete="true"
          @reload="reload"
        />
      </div>
    </div>

    <!-- create question list -->
    <div class="fog-c" v-show="isShowCreateQuestion" @click.self="cancelAll">
      <div
        class="w-[95%] md:w-[70%] lg:w-[50%] bg-white rounded-2xl p-6 max-h-[90vh] overflow-hidden"
      >
        <div class="overflow-y-scroll hide-scrollbar max-h-[90vh] py-8 px-3">
          <span class="block text-[24px] font-bold mb-4"> Tạo câu hỏi</span>
          <div
            class="w-full mb-5"
            v-for="(question, index) in questionsCreate"
            :key="index"
          >
            <div class="w-full flex flex-col items-start mb-4">
              <label class="text-primary font-bold text-[20px]" for="title"
                >Câu hỏi thứ {{ index + 1 }}</label
              >
              <input
                type="text"
                id="title"
                class="i-cus"
                placeholder="Câu hỏi"
                v-model="question.title"
              />
            </div>
            <div class="w-full flex flex-wrap items-center justify-between">
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="answer1">Đáp án 1</label>
                <input
                  type="text"
                  id="answer1"
                  class="i-cus2"
                  placeholder="Đáp án 1"
                  v-model="question.answer1"
                />
              </div>
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="answer2">Đáp án 2</label>
                <input
                  type="text"
                  id="answer2"
                  class="i-cus2"
                  placeholder="Đáp án 2"
                  v-model="question.answer2"
                />
              </div>
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="answer3">Đáp án 3</label>
                <input
                  type="text"
                  id="answer3"
                  class="i-cus2"
                  placeholder="Đáp án 3"
                  v-model="question.answer3"
                />
              </div>
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="answer4">Đáp án 4</label>
                <input
                  type="text"
                  id="answer4"
                  class="i-cus2"
                  placeholder="Đáp án 4"
                  v-model="question.answer4"
                />
              </div>
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="rightAnswer">Đáp án dúng</label>
                <input
                  type="text"
                  id="rightAnswer"
                  class="i-cus2"
                  placeholder="Đáp án đúng"
                  v-model="question.rightAnswer"
                />
              </div>
              <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
                <label for="level">Cấp độ</label>
                <input
                  type="number"
                  id="level"
                  class="i-cus2"
                  placeholder="Cấp độ"
                  v-model="question.level"
                />
              </div>
            </div>
          </div>

          <div class="w-full flex items-center justify-end">
            <button class="btn-primary px-3 py-1 mr-3" @click="addQuestion">
              Thêm câu hỏi mới
            </button>
            <button class="btn-primary px-3 py-1" @click="saveAllQuestions">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- create lesson -->
    <div class="fog-l" v-if="isShowCreateLesson" @click.self="cancelAll">
      <div
        class="bg-white w-[90%] md:w-[60%] lg:w-[40%] h-screen overflow-y-scroll p-4"
      >
        <FormSchema
          :schema="lessonSchema"
          btn-name="Lưu"
          @form-submitted="createLesson"
        />
      </div>
    </div>

    <!-- test exam online -->
    <div class="fog-c" v-if="isShowTest" @click.self="cancelAll">
      <div
        class="w-[95%] md:w-[90%] lg:w-[70%] bg-white rounded-2xl p-6 max-h-[90vh] overflow-hidden"
      >
        <div class="overflow-y-scroll hide-scrollbar max-h-[90vh] py-8 px-3">
          <div class="w-full flex items-start justify-between px-5">
            <div class="w-[45%] flex flex-col items-start">
              <span class="block font-bold text-[20px] mb-2"
                >Danh sách bài học</span
              >
              <MultiSelect
                v-model="selectedListLesson"
                :options="courseDetail?.lessons"
                :optionLabel="`name`"
                placeholder="Chọn 1 hoặc nhiều"
                class="w-full px-3 py-1"
              />
            </div>
            <div class="w-[45%] flex flex-col items-start">
              <span class="block font-bold text-[20px] mb-2"
                >Loại bài kiểm tra</span
              >
              <select
                v-model="selectedTestType"
                class="select-primary w-full py-1"
              >
                <option value="Đầu vào">Đầu vào</option>
                <option value="15 phút">15 phút</option>
                <option value="45 phút">45 phút</option>
                <option value="Giữa kì">Giữa kì</option>
                <option value="Cuối kì">Cuối kì</option>
              </select>
            </div>
          </div>
          <div class="w-[97%] flex justify-end mt-4">
            <button
              :disabled="examData.length > 0"
              :class="examData.length > 0 ? 'cursor-not-allowed' : ''"
              class="btn-primary px-2 py-1"
              @click="createExam"
            >
              Tạo bài kiểm tra
            </button>
          </div>

          <div
            v-if="examData.length > 0"
            class="flex items-start flex-row-reverse mt-10"
          >
            <div class="w-[20%]">
              <div class="w-full" v-if="isShowResult">
                <span class="block">
                  Số câu đúng:
                  {{ rightAnswerByChildren.length }} /
                  {{ allAnswerByChildren.length }}
                </span>
                <span
                  class="block"
                  :class="
                    (rightAnswerByChildren.length * 100) /
                      allAnswerByChildren.length >=
                    50
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                >
                  Điểm của bạn:
                  {{
                    (rightAnswerByChildren.length * 100) /
                    allAnswerByChildren.length
                  }}
                  <br>
                  <span class="font-bold">{{
                    (rightAnswerByChildren.length * 100) /
                      allAnswerByChildren.length >=
                    50
                      ? "Passed"
                      : "Not passed"
                  }}</span>
                </span>
              </div>
            </div>
            <div class="w-[80%] flex flex-col items-start">
              <div
                class="w-full pr-2 flex items-start justify-between mb-2 flex-wrap flex-col lg:flex-row"
                v-for="(item, i) in examData"
                :key="i"
              >
                <div class="br-cus w-full lg:w-[20%] px-2">
                  <span class="block text-[18px] font-bold"
                    >Câu hỏi {{ i + 1 }}</span
                  >
                  <!-- <span class="block">Độ khó: {{ item?.level }}</span> -->
                </div>
                <div
                  class="br-cus w-full lg:w-[79%] lg:mt-0 px-2 flex items-start flex-col"
                >
                  <p class="mb-3">{{ item?.title }}</p>
                  <p>
                    <input
                      v-model="item.childrenAnswer"
                      type="radio"
                      :id="item?.answer1"
                      :value="item?.answer1"
                    />
                    <label :for="item?.answer1"> A. {{ item?.answer1 }}</label>
                  </p>
                  <p>
                    <input
                      v-model="item.childrenAnswer"
                      type="radio"
                      :id="item?.answer2"
                      :value="item?.answer2"
                    />
                    <label :for="item?.answer2"> B. {{ item?.answer2 }}</label>
                  </p>
                  <p>
                    <input
                      v-model="item.childrenAnswer"
                      type="radio"
                      :id="item?.answer3"
                      :value="item?.answer3"
                    />
                    <label :for="item?.answer3"> C. {{ item?.answer3 }}</label>
                  </p>
                  <p>
                    <input
                      v-model="item.childrenAnswer"
                      type="radio"
                      :id="item?.answer4"
                      :value="item?.answer4"
                    />
                    <label :for="item?.answer4"> D. {{ item?.answer4 }}</label>
                  </p>
                </div>
              </div>
            </div>

            <!-- submit btn -->
          </div>
          <div
            v-if="examData.length > 0"
            class="w-full flex items-center justify-end"
          >
            <button class="btn-primary px-3 py-1 mt-5" @click="submitExam">
              Nộp bài
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- show result -->
    <!-- <div class="fog-c" v-if="isShowResult" @click.self="isShowResult = false">
      <div
        class="w-[95%] md:w-[50%] lg:w-[40%] bg-white rounded-2xl p-6 max-h-[90vh] overflow-hidden"
      >
        Kết quả kiểm tra của bạn là: {{ rightAnswerByChildren.length }} /
        {{ allAnswerByChildren.length }}
      </div>
    </div> -->
  </div>
</template>
<script>
import API_COURSE from "../../API/API_COURSE";
import API_QUESTION from "../../API/API_QUESTION";
import API_LESSONS from "../../API/API_LESSONS";
import API_EXAM from "../../API/API_EXAM";
import { useSystemStore } from "../../stores/System";
import func from "../../common/func";
import swal from "../../common/swal";
import QuestionReview from "../../components/QuestionReview.vue";
import schemaConfig from "../../common/config/schemaConfig";
import FormSchema from "../../components/FormSchema.vue";
import MultiSelect from "primevue/multiselect";
export default {
  components: {
    QuestionReview,
    FormSchema,
    MultiSelect,
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
      selectedListLesson: [],
      selectedTestType: "Đầu vào",
      questionsByLesson: [],
      currentLessonSelected: "",
      lessonSchema: schemaConfig.lessonSchema(),
      questionsCreate: [
        {
          title: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          rightAnswer: "",
          level: "",
        },
      ],
      isShowCreateLesson: false,
      isShowCreateQuestion: false,
      isShowCreateClass: false,
      isShowTest: false,
      isShowResult: false,
      examData: [],
      examTime: 60,
      rightAnswerByChildren: [],
      allAnswerByChildren: [],
    };
  },
  created() {
    this.getCourseDetail(this.$route.params.id);
  },
  methods: {
    convertVND(price) {
      return func.convertVND(price);
    },
    convertDate(date) {
      return func.convertDate(date);
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
      this.currentLessonSelected = item;
      this.systemStore.setChangeLoading(true);
      API_QUESTION.getQuestionsOrCreateQuiz([
        {
          lessonId: item?.id,
          totalQuestion: null,
        },
      ])
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          if (res.data[0]?.questions.length > 0) {
            this.questionsByLesson = res.data[0].questions;
          } else {
            swal.info("Bài học này chưa lưu câu hỏi nào");
          }
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    reload() {
      this.systemStore.setChangeLoading(true);
      API_QUESTION.getQuestionsOrCreateQuiz([
        {
          lessonId: this.currentLessonSelected?.id,
          totalQuestion: null,
        },
      ])
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          if (res.data[0]?.questions.length > 0) {
            this.questionsByLesson = res.data[0].questions;
          } else {
            swal.info("Bài học này chưa lưu câu hỏi nào");
            this.cancelAll();
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
    handleCreateTest() {
      this.isShowTest = true;
    },
    handleCreateNewLesson() {
      this.isShowCreateLesson = true;
    },
    handleCreateNewQuestions(item) {
      this.currentLessonSelected = item;
      this.isShowCreateQuestion = true;
    },
    createLesson(item) {
      item["courseId"] = this.$route.params.id;
      item["prerequisites"] = "none";
      this.systemStore.setChangeLoading(true);
      API_LESSONS.postLesson(item)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success(res.data);
          this.cancelAll();
          this.lessonSchema = schemaConfig.lessonSchema();
          this.getCourseDetail(this.$route.params.id);
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
          // this.cancelAll()
          swal.error("Tạo thất bại! Vui lòng thử lại");
        });
    },
    addQuestion() {
      this.questionsCreate.push({
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        rightAnswer: "",
        level: "",
      });
    },

    saveAllQuestions() {
      this.systemStore.setChangeLoading(true);
      let finalData = [];
      finalData = this.questionsCreate.map((item) => {
        item["lessionId"] = this.currentLessonSelected?.id;
        return item;
      });

      API_QUESTION.postQuestion(finalData)
        .then((res) => {
          swal.success(res.data);
          this.cancelAll();
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          swal.error("Tạo thất bại! Vui lòng thử lại");
          this.cancelAll();
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.questionsByLesson = [];
      this.selectedListLesson = [];
      this.isShowCreateLesson = false;
      this.isShowCreateQuestion = false;
      this.isShowTest = false;
      this.examData = [];
      this.isShowResult = false;
      this.questionsCreate = [
        {
          title: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          rightAnswer: "",
          level: "",
        },
      ];
    },
    createExam() {
      if (this.selectedListLesson.length == 0)
        return swal.error("Chọn ít nhất 1 bài học để tạo bài kiểm tra");

      this.systemStore.setChangeLoading(true);
      let tmpArr = [];
      this.selectedListLesson.map((item) => {
        tmpArr.push({
          lessonId: item?.id,
          totalQuestion: 5,
        });
        return item;
      });
      API_QUESTION.getQuestionsOrCreateQuiz(tmpArr)
        .then((res) => {
          if (res.data.length == 0) {
            swal.error(
              "Các bài học này không tồn tại câu hỏi nào để tạo bài kiểm tra"
            );
          } else {
            let eData = [];
            res.data.forEach((item) => {
              if (item.questions.length > 0) {
                item.questions.forEach((question) => {
                  eData.push(question);
                });
              }
            });
            this.examData = eData;
          }
        })
        .catch((err) => {
          swal.error("Tạo thất bại! Vui lòng thử tạo lại bài kiểm tra");
        });
      API_EXAM.postExam({
        courseId: this.$route.params.id,
        testName: "ansc222",
        testDate: new Date().toISOString(),
        testDuration: 60,
        testType: 1,
      })
        .then((res) => {
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          // swal.error(err.response?.data);
          this.systemStore.setChangeLoading(false);
        });
    },
    submitExam() {
      let tmpArr = [];
      this.examData.map((item) => {
        if (item?.childrenAnswer == item?.rightAnswer) {
          tmpArr.push(item);
        }
        return item;
      });

      this.rightAnswerByChildren = tmpArr;
      this.allAnswerByChildren = this.examData;
      // this.examData = [];
      // this.cancelAll();
      this.isShowResult = true;
      swal.success("Nộp bài thành công!");
    },
  },
};
</script>
<style scoped>
.fog-c {
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

.fog-l {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
