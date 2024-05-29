<script lang="ts" setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div class="item">
    <img
      @click="onClickFavorite"
      v-if="isFavorite"
      class="add-fav"
      src="../assets/images/heart-active.svg"
      alt=""
    />
    <img
      @click="onClickFavorite"
      v-else
      class="add-fav"
      src="../assets/images/heart-inactive.svg"
      alt=""
    />
    <img class="img-item" :src="`/src/assets/sneakers/${imageUrl}`" alt="sneaker 1" />
    <h4 class="title">{{ title }}</h4>
    <div class="bottom">
      <div>
        <span class="price">PRICE:</span>
        <span class="price-count">{{ price }} $</span>
      </div>
      <button @click="onClickAdd" class="add-btn">
        <img v-if="isAdded" src="../assets/images/btn-succes.svg" alt="add button" />
        <img v-else src="../assets/images/add-btn.svg" alt="add button" />
      </button>
    </div>
  </div>
</template>
<style scoped>
.item {
  position: relative;
  border: 1px solid #f3f3f3;
  border-radius: 40px;
  width: 210px;
  padding: 20px 30px 35px;
}
.add-fav {
  border-radius: 8px;
  width: 32px;
  height: 32px;
  position: absolute;
  left: 30px;
  top: 30px;
  cursor: pointer;
}
.title {
  font-weight: 400;
  font-size: 14px;
  color: var(--black);
}
.price {
  font-weight: 500;
  font-size: 11px;
  color: #bdbdbd;
}
.price-count {
  font-weight: 700;
  font-size: 14px;
  color: var(--black);
}
.add-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.img-item {
  width: 133px;
  height: 112px;
  margin-bottom: 14px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 15px;

  & > div {
    display: flex;
    flex-direction: column;
  }
}
</style>
