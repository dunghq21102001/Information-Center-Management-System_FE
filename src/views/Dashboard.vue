<template>
  <div class="w-full">
    <!-- part 1 -->
    <div class="w-full my-3 px-5">
      <Statistical
        :dashboard-data="dashboardData"
        labelX="Tháng"
        labelY="Triệu VND"
      />
    </div>

    <!-- part 2 -->
    <div class="w-full px-5 grid grid-cols-12 gap-3">
      <div
        class="col-span-12 md:col-span-6 border-cus min-h-[350px] p-4 flex items-center"
      >
        <BarChart
          :data="dataChart1"
          :labels="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          :label="'Doanh thu năm ' + currentYear"
        />
      </div>
      <div
        class="col-span-12 md:col-span-6 border-cus min-h-[350px] p-4 flex items-center flex-wrap justify-around"
      >
        <!-- <div class="w-[45%]">
          <PieChart />
        </div> -->
        <div class="w-[90%]" v-if="donutData.length == 0 && donutLabels == 0">
          <p class="w-full text-center">Không có dữ liệu</p>
        </div>
        <div class="w-[60%]" v-if="donutData.length != 0 && donutLabels != 0">
          <DoughnutChart :labels="donutLabels" :data="donutData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API_DASHBOARD from "../API/API_DASHBOARD";
import Statistical from "../components/Statistical.vue";
import BarChart from "../components/chart/BarChart.vue";
import DoughnutChart from "../components/chart/DoughnutChart.vue";
import PieChart from "../components/chart/PieChart.vue";
import * as signalR from "@aspnet/signalr";
import { useSystemStore } from "../stores/system";
export default {
  components: {
    BarChart,
    PieChart,
    DoughnutChart,
    Statistical,
  },
  props: {},
  data() {
    return {
      sD: null,
      eD: null,
      dashboardData: null,
      currentYear: new Date().getFullYear(),
      dataChart1: [],
      donutLabels: [],
      donutData: [],
    };
  },
  setup() {
    const systemStore = useSystemStore();
    return { systemStore };
  },
  created() {
    this.getCurrentYearDates();
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      this.systemStore.setChangeLoading(true);
      API_DASHBOARD.getData(this.sD, this.eD)
        .then((res) => {
          this.dashboardData = res.data;
          this.systemStore.setChangeLoading(false);

          let tmpD1 = [];
          res.data.dashBoardTransactionSummariseByMonthViewModels.map(
            (item) => {
              tmpD1.push(item?.totalAmountOfMonthInYear);
            }
          );
          this.dataChart1 = tmpD1;

          let tmpDonutData = [];
          let tmpDonutLabels = [];
          res.data.dashBoardTransactionSummariseByCourseViewModels.map(
            (item) => {
              tmpDonutData.push(item?.totalAmountCourse);
              tmpDonutLabels.push(item?.courseCode);
            }
          );

          this.donutData = tmpDonutData;
          this.donutLabels = tmpDonutLabels;
        })
        .catch((err) => this.systemStore.setChangeLoading(false));
    },
    getCurrentYearDates() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      const firstDayOfYear = new Date(currentYear, 0, 1);
      const formattedFirstDay = this.formatDate(firstDayOfYear);

      const lastDayOfYear = new Date(currentYear, 11, 31);
      const formattedLastDay = this.formatDate(lastDayOfYear);

      this.sD = formattedFirstDay;
      this.eD = formattedLastDay;
      // return {
      //   firstDayOfYear: formattedFirstDay,
      //   lastDayOfYear: formattedLastDay,
      // };
    },
    formatDate(date) {
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return `${year}/${month}/${day}`;
    },
  },
};
</script>
<style scoped>
.border-cus {
  border: 1px solid #d9eced;
}
</style>
