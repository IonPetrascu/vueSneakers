<script setup lang="ts">
import { useItemsStore } from '@/stores/store'

const itemsStore = useItemsStore()
const openForm = (): void => {
  itemsStore.isOpenForm = true
}
</script>

<template>
  {{ itemsStore.currentUser }}
  <button @click="openForm">change account</button>
</template>
