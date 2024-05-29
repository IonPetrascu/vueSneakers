<script lang="ts" setup></script>
<template>
  <div class="background">
    <aside class="cart">
      <div>Cart</div>
      <div class="list-items"></div>
      <div class="bottom">
        <div class="statistics">
          <span>Кesults:</span>
          <span>...</span>
          <span>21 304 $</span>
        </div>
        <div class="statistics">
          <span>Tax 5%:</span>
          <span>...</span>
          <span>2304 $</span>
        </div>
      </div>
      <button>Order</button>
    </aside>
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
}
</style>
