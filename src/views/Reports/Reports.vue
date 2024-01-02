<template>
  <div class="w-full">
    <div class="w-[90%] mx-auto grid grid-cols-12 gap-4 mt-5">
      <div class="col-span-12 md:col-span-4 rounded-lg br-cus overflow-hidden">
        <div class="w-full h-[40px] br-b-cus px-2">
          <h4
            class="text-[18px] leading-[40px] text-gray-600 hover:underline cursor-pointer"
          >
            Courses Report
          </h4>
        </div>
        <div class="w-full h-[250px] p-2 relative">
          <img
            class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[150px]"
            src="../../assets/report-img/course-report.png"
          />
          <button class="absolute bottom-2 right-2 cursor-pointer btn-primary text-[14px] px-2 py-1">
            View Report
          </button>
        </div>
      </div>

      <div class="col-span-12 md:col-span-4 rounded-lg br-cus overflow-hidden">
        <div class="w-full h-[40px] br-b-cus px-2">
          <h4
            class="text-[18px] leading-[40px] text-gray-600 hover:underline cursor-pointer"
          >
            Users Report
          </h4>
        </div>
        <div class="w-full h-[250px] p-2 relative">
          <img
            class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[150px]"
            src="../../assets/report-img/users-report.png"
          />
          <button class="absolute bottom-2 right-2 cursor-pointer btn-primary text-[14px] px-2 py-1">
            View Report
          </button>
        </div>
      </div>

      <div class="col-span-12 md:col-span-4 rounded-lg br-cus overflow-hidden">
        <div class="w-full h-[40px] br-b-cus px-2">
          <h4
            class="text-[18px] leading-[40px] text-gray-600 hover:underline cursor-pointer"
          >
            Salary Report
          </h4>
        </div>
        <div class="w-full h-[250px] p-2 relative">
          <img
            class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[150px]"
            src="../../assets/report-img/salary-report.png"
          />
          <button class="absolute bottom-2 right-2 cursor-pointer btn-primary text-[14px] px-2 py-1">
            View Report
          </button>
        </div>
      </div>

      <div class="col-span-12 md:col-span-4 rounded-lg br-cus overflow-hidden">
        <div class="w-full h-[40px] br-b-cus px-2">
          <h4
            class="text-[18px] leading-[40px] text-gray-600 hover:underline cursor-pointer"
          >
            Schedule Report
          </h4>
        </div>
        <div class="w-full h-[250px] p-2 relative">
          <img
            class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[150px]"
            src="../../assets/report-img/schedule-report.png"
          />
          <button class="absolute bottom-2 right-2 cursor-pointer btn-primary text-[14px] px-2 py-1">
            View Report
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.br-cus {
  border: 1px solid rgb(203, 203, 203);
}
.br-b-cus {
  border-bottom: 1px solid rgb(203, 203, 203);
}
</style>
