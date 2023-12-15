<template>
    <div class="w-full">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: {
        Bar
    },
    props: {
        labels: Array,
        label: String,
        data: Array,
        backgroundColor: {
            type: String,
            default: '#007d88'
        }
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.label,
                        backgroundColor: this.backgroundColor,
                        data: this.data
                    }
                ]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>