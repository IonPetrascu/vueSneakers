import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item, ItemFav } from '@/types'
export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref<Item[]>([])

  const fetchItems = (params: { sortBy: string, searchQuery: string }): Promise<void> => {
    return new Promise<void>((resolve) => {
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
        .then((data: Item[]) => {
          items.value = data.map(obj => ({
            ...obj,
            isFavorite: false,
            isAdded: false
          }))
          resolve()
        })
        .catch(console.log)
    })
  }

  const fetchFavorites = (): Promise<void> => {
    fetch('https://b71d9efcf989be11.mokky.dev/favorites')
      .then(res => res.json())
      .then((data: ItemFav[]) => {
        items.value = items.value.map(item => {
          const favorite = data.find(favorite => favorite.favoriteId === item.id)

          if (!favorite) {
            return item
          }
          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id
          }
        })
      })
      .catch(console.error)
  }

  const addToFavorites = (object: Item): void => {
    if (object.isFavorite === false) {
      const item = {
        favoriteId: object.id
      }
      fetch('https://b71d9efcf989be11.mokky.dev/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          object.isFavorite = true
          object.favoriteId = data.id
        })
        .catch(console.log)
    } else {
      fetch(`https://b71d9efcf989be11.mokky.dev/favorites/${object.favoriteId}`, {
        method: 'DELETE'
      }).then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        object.isFavorite = false
        return res.text()
      })
        .then(console.log)
        .catch(console.error)
    }
  }

  return { items, fetchItems, fetchFavorites, addToFavorites }
})
