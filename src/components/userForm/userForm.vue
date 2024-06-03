<script lang="ts" setup>
import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'
import { useItemsStore } from '@/stores/store'
import { onMounted } from 'vue'

onMounted(() => {})
const itemStore = useItemsStore()

const changeTypeForm = (): void => {
  itemStore.typeForm = itemStore.typeForm === 'signup' ? 'signin' : 'signup'
}
const closeForm = (): void => {
  itemStore.isOpenForm = false
}
</script>

<template>
  <div v-if="itemStore.isOpenForm" class="bg">
    <SignUp
      :close-form="closeForm"
      :change-type-form="changeTypeForm"
      :on-submit="itemStore.signUp"
      v-if="itemStore.typeForm === 'signup'"
    />
    <SignIn
      :close-form="closeForm"
      :change-type-form="changeTypeForm"
      :on-submit="itemStore.signIn"
      v-else
    />
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000067;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
</style>
