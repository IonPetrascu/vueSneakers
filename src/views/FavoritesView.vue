<script setup lang="ts">
import ItemComponent from '@/components/ItemComponent.vue'
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/store'

const itemsStore = useItemsStore()

onMounted(itemsStore.fetchFavorites)
</script>
<template>
  <div v-if="itemsStore.favorites.length > 0" class="list" v-auto-animate>
    <ItemComponent
      v-for="obj in itemsStore.favorites"
      :key="obj.item.id"
      :title="obj.item.title"
      :image-url="obj.item.imageUrl"
      :price="obj.item.price"
    />
  </div>
  <div class="empty" v-else>
    <h1>Your favorite products list is empty.</h1>
    <div>
      <router-link to="/"> <button class="back">Go to shopping</button></router-link>
    </div>
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
.empty {
  padding: 40px 10px;
  text-align: center;
}
.back {
  margin-top: 20px;
  border: none;
  background-color: #fcb858;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.4s ease-in-out;
}
.back:hover{
  scale: 1.1;
}

</style>
