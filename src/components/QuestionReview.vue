<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between">
      <span class="font-bold text-[24px] block mb-3">
        {{
          lesson != null
            ? `Bộ câu hỏi của bài ${lesson?.name}`
            : "Xem lại bài làm"
        }}
      </span>
      <span class="font-bold text-[20px]">{{ totalScore.toFixed(0) }} điểm</span>
    </div>
    <input
      type="text"
      placeholder="Tìm kiếm theo tên câu hỏi"
      class="in-cus"
      v-model="searchQuery"
    />
    <div class="w-full flex items-start justify-between">
      <div
        class="flex flex-col items-start"
        :class="examData == null ? 'w-full' : 'w-[80%]'"
      >
        <div
          class="w-full flex items-start justify-between mb-2 flex-wrap flex-col lg:flex-row"
          v-for="(item, i) in paginatedData"
          :key="i"
        >
          <div class="br-cus w-full lg:w-[15%] p-2">
            <span class="block text-[18px] font-bold">Câu hỏi {{ i + 1 }}</span>
            <span v-if="item?.level" class="block"
              >Độ khó: {{ item?.level }}</span
            >
            <div class="w-full flex justify-start items-center">
              <button
                v-if="isEdit"
                @click="handleShowEdit(item)"
                class="px-3 py-1 rounded-lg border-solid bg-green-500 text-white hover:text-green-500 hover:bg-white border-[1px] border-green-500 duration-150 mr-2"
              >
                Sửa
              </button>
              <button
                v-if="isDelete"
                @click="deleteQuestion(item)"
                class="px-3 py-1 rounded-lg border-solid bg-red-500 text-white hover:text-red-500 hover:bg-white border-[1px] border-red-500 duration-150 mr-2"
              >
                Xoá
              </button>
            </div>
          </div>
          <div
            class="br-cus w-full lg:w-[84%] mt-3 lg:mt-0 p-2 flex items-start flex-col"
          >
            <p class="mb-3">{{ item?.title }}</p>
            <p
              :class="[
                item?.answer1 == item?.rightAnswer &&
                item?.answer1 == item?.answer
                  ? 'font-bold text-green-500'
                  : '',
                item?.answer1 != item?.rightAnswer &&
                item?.answer1 == item?.answer
                  ? 'font-bold text-red-500'
                  : '',
              ]"
            >
              <span class="font-bold">A.</span> {{ item?.answer1 ? item?.answer1 : 'Không có đáp án'}}
            </p>
            <p
              :class="[
                item?.answer2 == item?.rightAnswer &&
                item?.answer2 == item?.answer
                  ? 'font-bold text-green-500'
                  : '',
                item?.answer2 != item?.rightAnswer &&
                item?.answer2 == item?.answer
                  ? 'font-bold text-red-500'
                  : '',
              ]"
            >
              <span class="font-bold">B.</span> {{item?.answer2 ? item?.answer2 : 'Không có đáp án'}}
            </p>
            <p
              :class="[
                item?.answer3 == item?.rightAnswer &&
                item?.answer3 == item?.answer
                  ? 'font-bold text-green-500'
                  : '',
                item?.answer3 != item?.rightAnswer &&
                item?.answer3 == item?.answer
                  ? 'font-bold text-red-500'
                  : '',
              ]"
            >
              <span class="font-bold">C.</span> {{ item?.answer3 ? item?.answer3 : 'Không có đáp án'}}
            </p>
            <p
              :class="[
                item?.answer4 == item?.rightAnswer &&
                item?.answer4 == item?.answer
                  ? 'font-bold text-green-500'
                  : '',
                item?.answer4 != item?.rightAnswer &&
                item?.answer4 == item?.answer
                  ? 'font-bold text-red-500'
                  : '',
              ]"
            >
              <span class="font-bold">D.</span> {{item?.answer4 ? item?.answer4 : 'Không có đáp án' }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="examData != null" class="hidden lg:block w-[20%] br-cus">
        ok
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button
        @click="previousPage"
        :disabled="isOnlyOnePage || currentPage === 1"
        class="py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        Trang trước
      </button>
      <span>{{ currentPage }} / {{ filteredTotalPages }}</span>
      <button
        @click="nextPage"
        :disabled="isOnlyOnePage || currentPage === filteredTotalPages"
        class="py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        Trang sau
      </button>
    </div>

    <div class="fog-q" v-if="showEditForm" @click.self="handleCancel">
      <div class="w-[95%] md:w-[70%] lg:w-[50%] bg-white rounded-md p-4">
        <span class="block text-[20px] font-bold"> Sửa câu hỏi</span>
        <div class="w-full flex flex-col items-start mb-4">
          <label for="title">Câu hỏi</label>
          <input
            type="text"
            id="title"
            class="i-cus"
            placeholder="Câu hỏi"
            v-model="selectedData.title"
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
              v-model="selectedData.answer1"
            />
          </div>
          <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
            <label for="answer2">Đáp án 2</label>
            <input
              type="text"
              id="answer2"
              class="i-cus2"
              placeholder="Đáp án 2"
              v-model="selectedData.answer2"
            />
          </div>
          <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
            <label for="answer3">Đáp án 3</label>
            <input
              type="text"
              id="answer3"
              class="i-cus2"
              placeholder="Đáp án 3"
              v-model="selectedData.answer3"
            />
          </div>
          <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
            <label for="answer4">Đáp án 4</label>
            <input
              type="text"
              id="answer4"
              class="i-cus2"
              placeholder="Đáp án 4"
              v-model="selectedData.answer4"
            />
          </div>
          <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
            <label for="rightAnswer">Đáp án dúng</label>
            <input
              type="text"
              id="rightAnswer"
              class="i-cus2"
              placeholder="Đáp án đúng"
              v-model="selectedData.rightAnswer"
            />
          </div>
          <div class="w-full lg:w-[48%] flex flex-col items-start mb-4">
            <label for="level">Cấp độ</label>
            <input
              type="number"
              id="level"
              class="i-cus2"
              placeholder="Cấp độ"
              v-model="selectedData.level"
            />
          </div>
        </div>
        <div class="w-full flex items-center justify-end">
          <button class="btn-cancel px-3 py-1 mr-3" @click="handleCancel">
            Huỷ
          </button>
          <button class="btn-primary px-3 py-1" @click="editQuestion">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API_QUESTION from "../API/API_QUESTION";
import schemaConfig from "../common/config/schemaConfig";
import swal from "../common/swal";
import { useSystemStore } from "../stores/System";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    lesson: {
      type: Object,
      default: null,
    },
    examData: {
      type: Object,
      required: false,
      default: null,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isReview: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      showEditForm: false,
      selectedData: {
        lessionId: "",
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        rightAnswer: "",
        level: 0,
      },
      searchQuery: "",
    };
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(
        startIndex + this.pageSize,
        this.filteredData.length
      );
      return this.filteredData.slice(startIndex, endIndex);
    },
    headers() {
      return Object.keys(this.filteredData[0] || {});
    },
    filteredData() {
      if (!this.searchQuery) {
        return this.data;
      } else {
        return this.data.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    filteredTotalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize);
    },
    isOnlyOnePage() {
      return this.filteredTotalPages === 1;
    },
  },
  watch: {
    data() {
      this.calculateTotalPages();
    },
    searchQuery() {
      this.resetPagination();
    },
  },
  mounted() {
    this.calculateTotalPages();
  },
  methods: {
    resetPagination() {
      this.currentPage = 1;
    },
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    handleShowEdit(item) {
      this.showEditForm = true;
      this.selectedData = item;
    },
    handleCancel() {
      this.showEditForm = false;
      this.selectedData = {
        lessionId: "",
        title: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        rightAnswer: "",
        level: 0,
      };
    },
    editQuestion() {
      this.systemStore.setChangeLoading(true);
      API_QUESTION.putQuestion(this.selectedData)
        .then((res) => {
          swal.success(res.data);
          this.systemStore.setChangeLoading(false);
          this.$emit("reload", true);
          this.showEditForm = false;
        })
        .catch((err) => {
          swal.error("Sửa thất bại! Vui lòng thử lại");
          this.systemStore.setChangeLoading(false);
        });
    },
    deleteQuestion(item) {
      swal
        .confirm("Bạn có chắc chắn muốn xoá câu hỏi này không?")
        .then((result) => {
          if (result.value) {
            this.systemStore.setChangeLoading(true);
            API_QUESTION.deleteQuestion(item?.id)
              .then((res) => {
                this.systemStore.setChangeLoading(false);
                this.currentPage = 1;
                swal.success("Xoá thành công!");
                this.$emit("reload", true);
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
.br-cus {
  border: 1px solid rgb(198, 198, 198);
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

.in-cus {
  border: 1px solid rgb(213, 213, 213);
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0;
}
</style>
