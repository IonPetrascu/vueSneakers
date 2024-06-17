<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useItemsStore } from '@/stores/store'
const itemStore = useItemsStore()
</script>
<template>
  <header>
    <RouterLink class="logo" to="/">
      <img src="../assets/images/logo.png" alt="VUE SNEAKERS" />
      <div class="logo-title">
        <h1>VUE SNEAKERS</h1>
        <span>Best shop of sneakers</span>
      </div>
    </RouterLink>
    <nav>
      <ul>
        <button @click="() => (itemStore.cartIsOpen = true)" class="nav-item">
          <img src="../assets/icons/cart-icon.svg" alt="cart icon" />
          <span>{{ itemStore.totalPrice }} $</span>
        </button>
        <RouterLink class="nav-item" to="/favorites">
          <img src="../assets/icons/heart-icon.svg" alt="heart icon" />
          <span>Favorites</span>
        </RouterLink>
        <RouterLink class="nav-item" to="/orders">
          <img src="../assets/images/orders.svg" alt="orders image" />
          <span>Orders</span>
        </RouterLink>
        <RouterLink class="nav-item" to="profile">
          <img src="../assets/icons/user-icon.svg" alt="user icon" />
          <span v-if="itemStore.currentUser === null">Profile</span>
          <span v-else>{{ itemStore.currentUser.fullName }}</span>
        </RouterLink>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
header {
  padding: 45px;
  display: flex;
  border-bottom: 1px solid #eaeaea;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;

  img {
    width: 40px;
    height: 40px;
  }
}

.logo-title span {
  font-weight: 400;
  font-size: 14px;
  color: #9d9d9d;
}

.logo-title h1 {
  font-weight: 700;
  font-size: 20px;
  color: var(--black);
}

nav {
  ul {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    background-color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  img {
    width: 18px;
    height: 18px;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #5c5c5c;
  }
}
.active-link {
  span {
    color: #000;
    font-weight: 600;
  }
}
</style>
