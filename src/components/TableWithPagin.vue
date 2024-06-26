<template>
  <div class="overflow-x-auto">
    <table class="table-auto min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="
              header == 'courseId' || header == 'examId'
                ? 'hidden'
                : 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            "
          >
            {{ reNameHeader(header) }}
          </th>
          <th
            v-show="isShowAction"
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Hành động
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td
            v-for="(value, key) in item"
            :key="key"
            :class="
              key == 'courseId' || key == 'examId'
                ? 'hidden'
                : 'px-4 py-2 max-w-[300px]'
            "
          >
            {{ value }}
          </td>
          <td v-show="isShowAction" class="px-4 py-2">
            <button
              @click="handleViewSchedule(item)"
              v-show="viewSchedule"
              class="btn-primary px-2 py-1"
            >
              Tình trạng điểm danh và tài nguyên
            </button>
            <button
              v-show="viewExam"
              @click="handleViewExam(item)"
              class="btn-primary px-2 py-1"
            >
              Xem lại
            </button>
            <button
              v-show="viewCertificate"
              @click="handleViewCertificate(item)"
              class="btn-primary px-2 py-1"
            >
              Xem chứng chỉ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        Trang trước
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        Trang sau
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    viewSchedule: {
      type: Boolean,
      default: false,
    },
    viewExam: {
      type: Boolean,
      default: false,
    },
    viewCertificate: {
      type: Boolean,
      default: false,
    },
    isShowAction: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
    };
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
      return this.data.slice(startIndex, endIndex);
    },
    headers() {
      return Object.keys(this.data[0] || {});
    },
  },
  watch: {
    data() {
      this.calculateTotalPages();
    },
  },
  mounted() {
    this.calculateTotalPages();
  },
  methods: {
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
    reNameHeader(header) {
      let fHeader = header;
      switch (fHeader) {
        case "name":
          fHeader = "Tên";
          break;
        case "date":
          fHeader = "Ngày";
          break;
        case "score":
          fHeader = "Điểm số";
          break;
        case "examName":
          fHeader = "Bài kiểm tra";
          break;
        case "courseCode":
          fHeader = "Mã khoá học";
          break;
        case "classCode":
          fHeader = "Mã lớp";
          break;
        case "code":
          fHeader = "Mã chứng chỉ";
          break;

        default:
          fHeader = header;
          break;
      }

      return fHeader;
    },
    handleViewSchedule(item) {
      this.$emit("viewSchedule", item);
    },
    handleViewExam(item) {
      this.$emit("viewExam", item);
    },
    handleViewCertificate(item) {
      this.$emit("viewCertificate", item);
    },
  },
};
</script>

<style scoped>
td {
  vertical-align: top;
}
</style>
