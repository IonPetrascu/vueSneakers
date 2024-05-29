<script lang="ts" setup>
import ItemComponent from './ItemComponent.vue'
import { useItemsStore } from '@/stores/store'
import { onMounted } from 'vue'

const itemsStore = useItemsStore()

const onClickAdd = (): void => {
  console.log('click add')
}
const onClickFavorite = (): void => {
  console.log('click fav')
}

onMounted(itemsStore.fetchItems)
</script>
<template>
  <section>
    <div class="head">
      <h2>All sneakers</h2>
      <div class="filters">
        <select class="select">
          <option value="title">By name</option>
          <option value="price">By price (asc)</option>
          <option value="-price">By price (desc)</option>
        </select>
        <div class="input-wrap">
          <input class="input" placeholder="Search..." type="text" />
        </div>
      </div>
    </div>

    <div class="list">
      <ItemComponent
        v-for="item in itemsStore.items"
        :key="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-added="false"
        :is-favorite="false"
        :on-click-add="onClickAdd"
        :on-click-favorite="onClickFavorite"
      />
    </div>
  </section>
</template>
<style scoped>
section {
  padding: 40px 60px 20px;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.filters {
  display: flex;
  gap: 20px;
}
.select {
  outline: none;
}
.input-wrap {
  position: relative;
}
.input-wrap::after {
  content: '';
  background: url('../assets/icons/search-icon.svg') no-repeat 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.input {
  padding: 5px 5px 5px 30px;
  position: relative;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}
</style>
