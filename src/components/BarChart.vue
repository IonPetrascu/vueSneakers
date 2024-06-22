<template>
  <div>
    <h2>{{ title }}</h2>
    <canvas id="shoesChart"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import type { ItemByPrice } from '../types'

const props = defineProps<{ array: ItemByPrice[]; title: string; chartBy: string }>()

let myChart

const chartConfig = {
  type: 'bar',
  data: {
    labels: props.array.value.map((item) => item.title),
    datasets: [
      {
        label: props.chartBy,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: props.array.value.map((item) => item.price)
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: props.chartBy
        }
      }
    },
    hoverBackgroundColor: '#FFE2D9'
  }
}

const mountChart = (): void => {
  const ctx = document.getElementById('shoesChart') as HTMLCanvasElement

  if (ctx) {
    myChart = new Chart(ctx, chartConfig)
  }

}
onMounted(mountChart)
</script>

<style scoped>
h2 {
  text-align: center;
  margin-block: 10px;
}
</style>
