<script lang="ts" setup>
import InfoBlock from './InfoBlock.vue'
import { useItemsStore } from '@/stores/store'

const itemStore = useItemsStore()

const closeCart = (): void => {
  itemStore.cartIsOpen = false
}

const disabledBtn = (): boolean => {
  return itemStore.totalPrice <= 0 || itemStore.isCreatingOrder
}
</script>
<template>
  <div @click.self="closeCart" class="background">
    <aside v-if="itemStore.cart.length > 0" class="cart">
      <div class="head">
        <button @click="closeCart" class="close-cart">
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14.7143"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.71436 1L14.7144 7L8.71436 13"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h3>Cart</h3>
      </div>
      <div v-if="!itemStore.isCreatingOrder" class="list-items">
        <div :key="item.id" v-for="item in itemStore.cart" class="item">
          <img class="item-image" :src="`/src/assets/sneakers/${item.imageUrl}`" alt="" />
          <div class="item-info">
            <h4 class="info-title">{{ item.title }}</h4>
            <span class="info-price">{{ item.price }}$</span>
          </div>
          <button @click="() => itemStore.removeFromCart(item)" class="item-delete">
            <img class="delete-img" src="../assets/images/close.svg" alt="buttton close" />
          </button>
        </div>
      </div>
      <div v-else>Loading...</div>
      <div class="bottom">
        <div class="statistics">
          <span>Кesults:</span>
          <span class="line"></span>
          <span>{{ itemStore.totalPrice }} $</span>
        </div>
        <div class="statistics">
          <span>Tax 5%:</span>
          <span class="line"></span>
          <span>{{ itemStore.taxPrice }} $</span>
        </div>
      </div>
      <button
        :disabled="disabledBtn()"
        @click="itemStore.createOrder"
        class="order-btn"
        :title="disabledBtn() ? 'Your cart is empty' : 'Click to place your order'"
      >
        Order
      </button>
    </aside>
    <InfoBlock
      v-else
      image-url="cart-empty.svg"
      description="Add at least one pair of sneakers to complete your order."
      title="Cart is empty"
      :btn-action="closeCart"
    />
  </div>
</template>
<style scoped>
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000050;
  z-index: 5;
  display: flex;
  justify-content: end;
}
.cart {
  background-color: var(--white);
  width: 385px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.head {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: center;
}
.close-cart {
  border: none;
  background: none;
  cursor: pointer;
  & svg {
    transform: rotate(180deg);
    height: 35px;
    width: 50px;
  }
}
h3 {
  font-weight: 700;
  font-size: 24px;
  color: var(--black);
}
.list-items {
  flex: 1;
  margin-top: 25px;
  margin-bottom: 40px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.item {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #f3f3f3;
}
.item-image {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}
.item-info {
  margin-right: 10px;
}
.info-title {
  font-weight: 400;
  font-size: 14px;
  color: var(--black);
}
.info-price {
  font-weight: 700;
  font-size: 14px;
  color: var(--black);
}
.item-delete {
  align-self: flex-end;
  border: none;
  cursor: pointer;
  background: none;
}
.bottom {
  margin-top: auto;
}
.line {
  flex: 1;
  border-bottom: 1px dashed #dfdfdf;
  position: relative;
  top: -4px;
}
.statistics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
}
.order-btn {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: var(--white);
  background: #9dd458;
  border-radius: 18px;
  padding-block: 18px;
  border: none;
  cursor: pointer;
}
.order-btn:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
