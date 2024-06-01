<script setup lang="ts">
import ItemComponent from '@/components/ItemComponent.vue'
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/store'

const itemsStore = useItemsStore()

onMounted(itemsStore.fetchFavorites)
</script>
<template>
  <div class="list" v-auto-animate>
    <ItemComponent
      v-for="obj in itemsStore.favorites"
      :key="obj.item.id"
      :title="obj.item.title"
      :image-url="obj.item.imageUrl"
      :price="obj.item.price"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding: 20px;
}
</style>
