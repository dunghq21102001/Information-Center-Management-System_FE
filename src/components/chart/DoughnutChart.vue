<template>
    <div class="w-full">
        <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Doughnut
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
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true
            }
        }
    }
}
</script>