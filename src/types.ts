export interface Item {
  id: number
  title: string
  imageUrl: string
  price: number
  isFavorite?: boolean
  isAdded?: boolean
  favoriteId?: number
}

export interface ItemFav {
  id: number
  favoriteId: number
  item: Item
}

export interface Orders {
  items: Item[]
  totalPrice: number
  id: number
}
export interface ItemByPrice {
  title: string
  price: number
}
