<script lang="ts" setup>
defineProps({
  imageUrl: String,
  description: String,
  title: String,
  btnAction: Function
})
</script>
<template>
  <div class="block">
    <img :src="`/src/assets/images/${imageUrl}`" alt="" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button @click="btnAction">Back</button>
  </div>
</template>
<style scoped>
.block {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  background-color: var(--white);
  width: 385px;
  padding: 30px;
  display: flex;
}
img {
  width: 120px;
  height: 120px;
}
h3 {
  font-weight: 600;
  font-size: 22px;
  color: var(--black);
}
p {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: var(--black);
  opacity: 0.4;
}
button {
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: var(--white);
  background: #9dd458;
  border-radius: 18px;
  padding-block: 18px;
  border: none;
  cursor: pointer;

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
}
</style>
