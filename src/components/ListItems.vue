<script lang="ts" setup>
import ItemComponent from './ItemComponent.vue'
import { useItemsStore } from '@/stores/store'
import { onMounted, ref, watch, inject } from 'vue'
const itemsStore = useItemsStore()

const filters = ref({
  sortBy: 'title',
  searchQuery: ''
})
const onChangeSelect = (e: Event): void => {
  const target = e.target as HTMLSelectElement
  filters.value.sortBy = target.value
}
const onChangeInput = (e: Event): void => {
  const target = e.target as HTMLInputElement
  filters.value.searchQuery = target.value
}

watch([() => filters.value.sortBy, () => filters.value.searchQuery], () =>
  itemsStore
    .fetchItems({
      sortBy: filters.value.sortBy,
      searchQuery: filters.value.searchQuery
    })
    .then(itemsStore.fetchFavorites)
)

const onClickAdd = (item): void => {
  itemsStore.onClickAddPlusCart(item)
}

const addToFavorites = inject('addToFavorites')

onMounted(() => {
  itemsStore
    .fetchItems({
      sortBy: filters.value.sortBy,
      searchQuery: filters.value.searchQuery
    })
    .then(itemsStore.fetchFavorites)
    .then(itemsStore.getCartFromLS)
    .catch(console.log)
})
</script>
<template>
  <section>
    <div class="head">
      <h2>{{ filters.searchQuery  ? `Search ${filters.searchQuery}` : 'All sneakers' }}</h2>
      <div class="filters">
        <select @change="onChangeSelect" class="select">
          <option value="title">By name</option>
          <option value="price">By price (asc)</option>
          <option value="-price">By price (desc)</option>
        </select>
        <div class="input-wrap">
          <input @input="onChangeInput" class="input" placeholder="Search..." type="text" />
        </div>
      </div>
    </div>

    <div v-auto-animate class="list">
      <ItemComponent
        v-for="item in itemsStore.items"
        :key="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-added="item.isAdded"
        :is-favorite="item.isFavorite"
        :on-click-add="() => onClickAdd(item)"
        :on-click-favorite="() => addToFavorites(item)"
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
