<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import CartComponent from './components/CartComponent.vue'
import PopUpOrder from './components/PopUpOrder.vue'
import { useItemsStore } from './stores/store'
import { provide, onMounted } from 'vue'
import userForm from './components/userForm/userForm.vue'
const itemsStore = useItemsStore()
onMounted(() => {
  itemsStore.getMe().then(itemsStore.getCartFromLS).catch(console.log)
})
//i just testing provide inject
provide('addToFavorites', itemsStore.addToFavorites)
</script>

<template>
  <Header />
  <PopUpOrder />
  <userForm />
  <CartComponent v-if="itemsStore.cartIsOpen" />
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.path" />
  </router-view>
</template>

<style scoped></style>
//4:09:36-4:13:23
