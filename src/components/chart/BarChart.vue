<template>
  <div class="w-full">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import { ref, watch } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Bar,
  },
  props: {
    labels: Array,
    label: String,
    data: Array,
    labelX: String,
    labelY: String,
    backgroundColor: {
      type: String,
      default: "#007d88",
    },
  },
  setup(props) {
    const dataProp = ref(props.data);

    watch(
      () => props.data,
      (newValue) => {
        dataProp.value = newValue;
      }
    );
    return {
      dataProp,
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: this.backgroundColor,
            data: this.dataProp,
          },
        ],
      };
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
  },
};
</script>
