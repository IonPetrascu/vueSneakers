<template>
  <BarChart :array="arraySortedByPrice" title="Price Chart" chartBy="price" />
</template>

<script lang="ts" setup>
import BarChart from '@/components/BarChart.vue'
import { ref, computed } from 'vue'
import { useItemsStore } from '../stores/store'
import type { ItemByPrice } from '../types'

const itemsStore = useItemsStore()

const arraySortedByPrice = ref<ItemByPrice[]>([])

arraySortedByPrice.value = computed(() => extractItems())

function extractItems(): ItemByPrice[] {
  return itemsStore.items.length > 0
    ? itemsStore.items.map((item) => ({ title: item.title, price: item.price }))
    : []
}
</script>

<style scoped></style>
