<script lang="ts" setup>
import ItemComponent from './ItemComponent.vue'
const onClickAdd = () => {
  console.log('click add')
}
const onClickFavorite = () => {
  console.log('click fav')
}
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
        title="Snakers"
        image-url="8.jpg"
        :price="5000"
        :is-added="false"
        :is-favorite="false"
        :on-click-add="onClickAdd"
        :on-click-favorite="onClickFavorite"
      />
    </div>
  </section>
</template>
<style scoped>
s h2 {
  margin: 40px 0px 40px 60px;
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
