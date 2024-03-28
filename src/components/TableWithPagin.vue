<template>
  <div class="overflow-x-auto">
    <table class="table-auto min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ reNameHeader(header) }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td
            v-for="(value, key) in item"
            :key="key"
            class="px-4 py-2 max-w-[300px]"
          >
            {{ value }}
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

        case "courseCode":
          fHeader = "Mã khoá học";
          break;
        case "classCode":
          fHeader = "Mã lớp";
          break;

        default:
          fHeader = header;
          break;
      }

      return fHeader;
    },
  },
};
</script>

<style scoped>
td {
  vertical-align: top;
}
</style>
