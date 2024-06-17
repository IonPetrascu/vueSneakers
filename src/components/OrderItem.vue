<script lang="ts" setup>
import type { Item } from '../types'

const props = defineProps<{
  items: Item[]
}>()
</script>
<template>
  <div class="item" :key="item.id" v-for="item in items">
    <span class="cell">{{ item.id }}</span>
    <img class="cell img" :src="`/src/assets/sneakers/${item.imageUrl}`" :alt="item.title" />
    <span class="cell">{{ item.title }}</span>
    <span class="cell">{{ item.price }}$</span>
  </div>
</template>
<style scoped>
.item {
  display: flex;
  align-items: center;
  border-top: 1px solid black;
  justify-content: space-between;
  gap: 10px;
}

.img {
  width: 50px;
}
</style>
