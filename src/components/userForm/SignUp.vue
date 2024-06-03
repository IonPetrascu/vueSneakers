<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  onSubmit: Function,
  changeTypeForm: Function,
  closeForm: Function
})
const name = ref('')
const email = ref('')
const password = ref('')

const submitForm = (): void => {
  props.onSubmit({
    fullName: name.value,
    email: email.value,
    password: password.value
  })
}
</script>
<template>
  <form v-on:submit.prevent="submitForm">
    <button type="button" class="close">
      <img @click.self="closeForm" src="/src/assets/icons/icon-close.svg" alt="close btn" />
    </button>
    <h2>Sign Up</h2>
    <input v-model="name" type="text" name="userName" autocomplete="name" />
    <input v-model="email" type="email" name="email" autocomplete="email" />
    <input v-model="password" type="password" name="password" autocomplete="current-password" />
    <p>
      Don't have an account?<button class="btnType" type="button" @click="changeTypeForm">
        Sign In
      </button>
    </p>
    <button class="submit" type="submit">Sign up</button>
  </form>
</template>
<style scoped>
.close {
  position: absolute;
  right: 15px;
  top: 15px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  border: none;
  padding: 2px;
  display: flex;
  background: none;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: 100%;
  }
}
form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  gap: 15px;
  background: var(--white);
  border-radius: 20px;
}
h2 {
  text-align: center;
}
input {
  padding: 10px;
  border: none;
  outline-color: #00000050;
  background: rgb(230, 231, 243);
}

.submit {
  padding: 10px;
  border: none;
  background-color: rgb(47, 255, 82);
  cursor: pointer;
}
.btnType {
  background: none;
  text-decoration: underline;
  border: none;
  color: blue;
  margin-left: 10px;
  cursor: pointer;
}
</style>
