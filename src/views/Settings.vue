<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto py-3">
      <!-- theme -->
      <div class="w-full">
        <div class="w-full py-2 flex items-center justify-between">
          <span class="text-primary text-[24px]">Màu chủ đề</span>
          <!-- <button class="btn-primary px-3 py-1 rounded-lg">
            Add new theme
          </button> -->
          <div></div>
        </div>
        <div class="w-full grid grid-cols-12 gap-4">
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            v-for="item in themeList"
          >
            <SkeletonLoading :color="item" />
            <button
              class="btn-primary px-3 py-1 rounded-md"
              @click="changeTheme(item)"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <!-- config khác -->
      <div class="w-full mt-20">
        <div class="w-full flex items-center justify-between">
          <div class="w-full py-2 flex items-center justify-between">
            <span class="text-primary text-[24px]">Bài kiểm tra đầu vào</span>
            <button
              @click="isShowCreateQuestion = true"
              class="btn-primary px-3 py-1 rounded-lg"
            >
              Thêm câu hỏi mới
            </button>
          </div>
        </div>

        <!-- question review -->
        <QuestionReview
          :data="questions"
          :pageSize="5"
          :is-edit="true"
          :is-delete="true"
          @reload="reload"
        />
      </div>

      <!-- list btn -->
      <div class="w-full mt-20">
        <div class="w-full flex items-center justify-between">
          <div class="w-full py-2 flex items-center justify-between">
            <span class="text-primary text-[24px]">Các cài đặt khác</span>
            <!-- <button
              @click="isShowCreateQuestion = true"
              class="btn-primary px-3 py-1 rounded-lg"
            >
              Thêm câu hỏi mới
            </button> -->
            <div></div>
          </div>
        </div>

        <!-- list btn -->
        <div class="w-full grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
        <button class="px-3 py-1 btn-primary" @click="createListSchedule">Tạo lịch cho lớp học</button>
        </div>
        </div>
      </div>
    </div>

    <!-- create list question -->
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
                <label for="rightAnswer">Đáp án đúng</label>
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
  </div>
</template>
<script>
import SkeletonLoading from "../components/SkeletonLoading.vue";
import { useSystemStore } from "../stores/system";
import QuestionReview from "../components/QuestionReview.vue";
import API_QUESTION from "../API/API_QUESTION";
import API_SCHEDULE from "../API/API_SCHEDULE";
import swal from "../common/swal";
export default {
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  components: { SkeletonLoading, QuestionReview },
  data() {
    return {
      currentTheme: "",
      themeList: [
        { color: "007d88", blur: "d9eced" },
        { color: "4486f4", blur: "e2eaf7" },
        { color: "d9535a", blur: "f1ddde" },
        { color: "f4dc70", blur: "fdfbf0" },
      ],
      questions: [],
      isShowCreateQuestion: false,
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
    };
  },
  created() {
    this.currentTheme = this.systemStore.getTheme.color;
    this.getQuestions();
  },
  methods: {
    changeTheme(themeColor) {
      this.currentTheme = themeColor;
      this.systemStore.setChangeTheme(themeColor);
      localStorage.removeItem("theme");
      localStorage.setItem("theme", JSON.stringify(themeColor));
      document.body.style.setProperty(
        "--primary-color",
        `#${themeColor.color}`
      );
      document.body.style.setProperty("--blur-color", `#${themeColor.blur}`);
    },
    getQuestions(item) {
      this.currentLessonSelected = item;
      this.systemStore.setChangeLoading(true);
      API_QUESTION.getQuestionsOrCreateQuiz([
        {
          lessonId: null,
          totalQuestion: null,
          type: 2,
        },
      ])
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          this.questions = res.data[0]?.questions;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    reload() {
      this.getQuestions();
    },
    createListSchedule() {
      this.systemStore.setChangeLoading(true)
      API_SCHEDULE.createAutomaticalySchedule()
      .then(res => {
        swal.success('Xếp lịch cho giáo viên thành công')
        // swal.success(res.data)
        this.systemStore.setChangeLoading(false)
      })
      .catch(err => {
        swal.error(err.response?.data)
        this.systemStore.setChangeLoading(false)
      })
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
        item["lessionId"] = null;
        item["type"] = 2;
        return item;
      });

      API_QUESTION.postQuestion(finalData)
        .then((res) => {
          swal.success(res.data);
          this.cancelAll();
          this.getQuestions();
          this.systemStore.setChangeLoading(false);
        })
        .catch((err) => {
          swal.error(err.response?.data);
          // this.cancelAll();
          this.systemStore.setChangeLoading(false);
        });
    },
    cancelAll() {
      this.isShowCreateQuestion = false;
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
</style>
