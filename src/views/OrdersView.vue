<script setup lang="ts">
import { useItemsStore } from '@/stores/store'
import OrderItem from '@/components/OrderItem.vue'
import { onMounted } from 'vue'

const itemsStore = useItemsStore()

onMounted(() => {
  itemsStore.getOrders()
})
</script>

<template>
  <div class="wrapper">
    <h1>Orders list</h1>
    <div class="order" :key="el.id" v-for="(el, index) in itemsStore.orders">
      <h3>Order №{{ index + 1 }}</h3>
      <div class="head">
        <span>Id </span>
        <span>Image</span>
        <span>Name</span>
        <span>Price</span>
      </div>
      <OrderItem :items="el.items" />
      <div class="bottom">
        <span>Total</span>
        <span class="total-price">{{ el.totalPrice }}$</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
}
.order {
  padding: 5px;
  background: rgba(224, 248, 232, 0.356);
  border: 1px dashed rgba(22, 17, 17, 0.74);
  margin-bottom: 20px;
}
.head {
  display: flex;
  align-content: center;
  justify-content: space-between;
  border-top: 1px solid #000;
  padding-block:5px ;
  font-weight: 600;
}
.bottom {
  border-top: 1px solid #000;
  display: flex;
  justify-content: space-between;
  padding-block: 5px;
}
.total-price {
  font-weight: 600;
  background-color: #fcb858;
}
</style>
