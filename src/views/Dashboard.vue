<template>
  <div class="w-full">
    <!-- part 1 -->
    <div class="w-full my-3 px-5">
      <Statistical />
    </div>

    <button class="btn-primary" @click="test">siêu test</button>

    <!-- part 2 -->
    <div class="w-full px-5 grid grid-cols-12 gap-3">
      <div
        class="col-span-12 md:col-span-6 border-cus min-h-[350px] p-4 flex items-center"
      >
        <BarChart
          :data="[21, 14, 16, 13, 17, 25]"
          :labels="[1, 2, 3, 4, 5, 6]"
          label="test data"
        />
      </div>
      <div
        class="col-span-12 md:col-span-6 border-cus min-h-[350px] p-4 flex items-center flex-wrap justify-around"
      >
        <div class="w-[45%]">
          <PieChart />
        </div>
        <div class="w-[45%]">
          <DoughnutChart />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Statistical from "../components/Statistical.vue";
import BarChart from "../components/chart/BarChart.vue";
import DoughnutChart from "../components/chart/DoughnutChart.vue";
import PieChart from "../components/chart/PieChart.vue";
import * as signalR from "@aspnet/signalr";
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
      connection: "",
    };
  },
  created() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7221/notificationHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.connection.start().catch(function (err) {
      return console.error(err.toString());
    });
  },
  methods: {
    test() {
      const userId = "434d275c-ff7d-48fa-84e3-bed5ecadca82";
      this.connection.invoke("SendMessage", "mess 1").catch(function (err) {
        return console.error(err.toSting());
      });
    },
  },
};
</script>
<style scoped>
.border-cus {
  border: 1px solid #d9eced;
}
</style>
