import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from './useProductsStore'

export interface CartItem {
  product: ProductType
  quantity: number
}

interface CartStore {
  items: CartItem[]
  setItems: (items: CartItem[]) => void
  setQuantity: (id: number, quantity: number) => void
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  setQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.product.id === id ? { ...item, quantity } : item
    ),
  })),
  getTotal: () => get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
}), {
  name: 'cart-storage',
}))
