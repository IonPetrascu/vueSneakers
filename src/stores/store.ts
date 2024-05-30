import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/types'
export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref<Item[]>([])

  const fetchItems = (params: { sortBy: string, searchQuery: string }): void => {
    const queryParams = new URLSearchParams({
      sortBy: params.sortBy
    })

    if (params.searchQuery !== '') {
      queryParams.append('title', `*${params.searchQuery}*`)
    }

    fetch(`https://b71d9efcf989be11.mokky.dev/items?${queryParams.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        items.value = data
      })
      .catch(console.log)
  }
  return { items, fetchItems }
})
