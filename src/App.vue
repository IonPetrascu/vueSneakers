<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import CartComponent from './components/CartComponent.vue'
</script>

<template>
  <Header />
  <CartComponent />
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.path" />
  </router-view>
</template>

<style scoped></style>
