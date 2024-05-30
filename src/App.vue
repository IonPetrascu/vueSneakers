<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import CartComponent from './components/CartComponent.vue'
import { useItemsStore } from './stores/store'
import { provide } from 'vue'
const itemStore = useItemsStore()

//i just testing provide inject
provide('addToFavorites', itemStore.addToFavorites)
</script>

<template>
  <Header />
  <!--  <CartComponent /> -->
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.path" />
  </router-view>
</template>

<style scoped></style>
//4:09:36-4:13:23
