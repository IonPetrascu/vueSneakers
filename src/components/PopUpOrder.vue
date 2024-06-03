<script lang="ts" setup>
import { useItemsStore } from '@/stores/store'

const itemStore = useItemsStore()

const closePopup = (): void => {
  itemStore.openPopUpOrder = false
}
</script>
<template>
  <div v-if="itemStore.openPopUpOrder" class="popup-wrapper">
    <div v-if="itemStore.orderId !== null" class="popup-content">
      <span class="close-btn" @click="closePopup">&times;</span>
      <h2>Your Order №{{ itemStore.orderId }} is Confirmed!</h2>
      <img class="img" src="/src/assets/images/smile.png" alt="">
      <p>
        Thank you for your purchase. Your order number <span id="order-number"></span> has been
        successfully placed.
      </p>
      <div class="buttons">
        <button class="btn">View Orders</button>
        <button class="btn" @click="closePopup">Close</button>
      </div>
    </div>
    <div v-else class="popup-content">
      <span class="close-btn" @click="closePopup">&times;</span>
      <h2 class="error-title">Order Submission Failed</h2>
      <img class="img" src="/src/assets/images/smile-sad.png" alt="sad emoji" />
      <p>We're sorry, but there was an error processing your order. Please try again later.</p>
      <div class="buttons">
        <button class="btn">View Orders</button>
        <button class="btn" @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.popup-content {
  background-color: var(--white);
  padding: 30px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}
.popup-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  padding: 10px;
}

.error-title {
  color: rgb(211, 75, 75);
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}
.img {
  width: 50px;
  margin: 0 auto;
}
.btn {
  margin: 10px 5px;
  padding: 10px 20px;
  background: #9dd458;
  color: var(--white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
}

.btn:hover {
  background: #4f6b2d;
}
.buttons {
  display: flex;
}
</style>
