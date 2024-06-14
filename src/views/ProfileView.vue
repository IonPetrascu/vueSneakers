<script setup lang="ts">
import { useItemsStore } from '@/stores/store'

const itemsStore = useItemsStore()
const openForm = (): void => {
  itemsStore.isOpenForm = true
}
const login = (): void => {
  itemsStore.typeForm = 'signin'
  itemsStore.isOpenForm = true
}
const register = (): void => {
  itemsStore.typeForm = 'signup'
  itemsStore.isOpenForm = true
}
</script>

<template>
  <div class="container">
    <div class="wrapper-profile" v-if="itemsStore.currentUser !== null">
      <img class="img" src="/src/assets/images/user-empty.webp" alt="" />
      <div class="info-list">
        <div v-for="(item, key) in Object.keys(itemsStore.currentUser)" :key="key">
          {{ item }} : {{ itemsStore.currentUser[item] }}
        </div>
        <div class="buttons">
          <button class="change-btn" @click="openForm">Change account</button>
          <button class="change-btn" @click="itemsStore.logOut">Log out</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Please log in to access your profile and orders.</h1>
      <div class="buttons">
        <button @click="login">Login</button>
        <button @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-block: 10px;
}
.buttons {
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 40px;
  margin-top: auto;
}
button {
  border: none;
  background-color: #fcb858;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: max-content;
}
.container {
  padding: 40px 10px;
}
.img {
  width: 155px;
  border-radius: 10px;
}
.wrapper-profile {
  display: flex;
  gap: 30px;
  margin: 0 auto;
  width: max-content;
}
.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.change-btn {
  margin-top: auto;
}
</style>
