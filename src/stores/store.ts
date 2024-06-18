import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Item, ItemFav } from '@/types'

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref<Item[]>([])
  const cart = ref<Item[]>([])
  const favorites = ref<ItemFav[]>([])
  const orders = ref([])

  const currentUser = ref(null)
  const typeForm = ref('signup')

  const isOpenForm = ref(false)
  const isCreatingOrder = ref(false)
  const openPopUpOrder = ref(false)
  const orderId = ref(null)
  const cartIsOpen = ref(false)
  const totalPrice = computed(() => cart.value.reduce((acc, el) => acc + el.price, 0))
  const taxPrice = computed(() => Math.round(5 / 100 * totalPrice.value))
  const userToken = computed(() => JSON.parse(localStorage.getItem('userToken')))

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
          resolve()
          return res.json()
        })
        .then((data: Item[]) => {
          items.value = data.map(obj => ({
            ...obj,
            isFavorite: false,
            isAdded: false
          }))
        }).then(getCartFromLS)
        .catch(console.log)
    })
  }
  const fetchFavorites = (): Promise<void> => {
    fetch('https://b71d9efcf989be11.mokky.dev/favorites?_relations=items', {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      }
    })
      .then(res => res.json())
      .then((data: ItemFav[]) => {
        favorites.value = data
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
      object.isFavorite = true
      const item = {
        favoriteId: object.id,
        item_id: object.id
      }
      fetch('https://b71d9efcf989be11.mokky.dev/favorites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then(res => res.json())
        .then(data => {
          object.favoriteId = data.id
        })
        .catch(console.log)
    } else {
      object.isFavorite = false
      fetch(`https://b71d9efcf989be11.mokky.dev/favorites/${object.favoriteId}`, {
        method: 'DELETE'
      }).then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.text()
      })
        .catch(console.error)
    }
  }
  const addToCart = (item: Item): void => {
    item.isAdded = true
    cart.value.push(item)
  }
  const removeFromCart = (item: Item): void => {
    item.isAdded = false
    const findIndexOfItem = items.value.findIndex((el) => el.id === item.id)
    items.value[findIndexOfItem].isAdded = false
    const findIndex = cart.value.findIndex((el) => el.id === item.id)

    cart.value.splice(findIndex, 1)
  }
  const onClickAddPlusCart = (item: Item): void => {
    item.isAdded === true ? removeFromCart(item) : addToCart(item)
  }
  const createOrder = (): void => {
    const token: string = JSON.parse(localStorage.getItem('userToken'))
    if (cart.value.length <= 0) {
      return
    }
    isCreatingOrder.value = true
    const params = {
      items: cart.value,
      totalPrice: totalPrice.value,
      userId: currentUser.value.id,
      date: Date.now()
    }
    console.log(Date.now());

    fetch('https://b71d9efcf989be11.mokky.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }).then((res) => {
      if (res.status === 401) {
        isOpenForm.value = true
        orderId.value = null
        throw new Error(`HTTP error! status: ${res.status}`)
      } else if (res.status === 404) {
        openPopUpOrder.value = true
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      cart.value = []
      items.value.forEach((el) => { el.isAdded = false })

      return res.json()
    })
      .then((data) => {
        openPopUpOrder.value = true
        orderId.value = data.id
      })
      .catch(console.log)
      .finally(() => {
        isCreatingOrder.value = false
      })
  }
  const getOrders = (): void => {
    if (currentUser.value === null) {
      throw new Error('User not login')
    }
    fetch(`https://b71d9efcf989be11.mokky.dev/orders?userId=${currentUser.value.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    }).then((res) => {
      if (res.status === 401) {
        throw new Error(`HTTP error! status: ${res.status}`)
      } else if (res.status === 404) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
      .then((data) => {
        orders.value = data
      })
      .catch(console.log)
  }
  const getCartFromLS = (): void => {
    const localCart = localStorage.getItem('cart')
    cart.value = localCart !== null ? JSON.parse(localCart) : []

    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }))
  }
  const signUp = async (params): Promise<void> => {
    try {
      const res = await fetch('https://9303851354d5e8f0.mokky.dev/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
      )
      if (!res.ok) {
        throw new Error('failed signUp')
      }
      const { data, token } = await res.json()
      localStorage.setItem('userToken', JSON.stringify(token))
      currentUser.value = data
      isOpenForm.value = false
      typeForm.value = 'signin'
    } catch (error) {
      console.log(error)
    }
  }
  const signIn = async (params): Promise<void> => {
    try {
      const res = await fetch('https://9303851354d5e8f0.mokky.dev/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
      )
      if (!res.ok) {
        throw new Error('failed signIn')
      }
      const { data, token } = await res.json()
      currentUser.value = data
      isOpenForm.value = false
      localStorage.setItem('userToken', JSON.stringify(token))
    } catch (error) {
      console.log(error)
    }
  }
  const getMe = async (): Promise<void> => {
    try {
      const res = await fetch('https://9303851354d5e8f0.mokky.dev/auth_me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken.value}`
        }
      }
      )
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('User not found')
        } else if (res.status === 401) {
          throw new Error('Unauthorized access')
        } else {
          throw new Error('An error occurred')
        }
      }
      const data = await res.json()
      currentUser.value = data
    } catch (error) {
      console.log(error)
    }
  }
  const logOut = (): void => {
    currentUser.value = null
    localStorage.removeItem('userToken')
  }
  watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }, { deep: true })

  return {
    items,
    cart,
    favorites,
    orders,
    currentUser,
    typeForm,
    orderId,
    isOpenForm,
    cartIsOpen,
    isCreatingOrder,
    totalPrice,
    openPopUpOrder,
    taxPrice,
    fetchItems,
    fetchFavorites,
    addToFavorites,
    onClickAddPlusCart,
    removeFromCart,
    createOrder,
    getOrders,
    getCartFromLS,
    signUp,
    signIn,
    getMe,
    logOut
  }
})
