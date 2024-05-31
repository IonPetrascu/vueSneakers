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
  id: Number
  favoriteId: Number
}

export interface Orders {
  items: Item[]
  totalPrice: number
  id: number
}
