import { create } from 'zustand'

export interface ProductType {
    id: number
    title: string
    price: number
    category: string
    description: string
    image: string
}

interface ProductStore {
  products: ProductType[]
  setProducts: (products: ProductType[]) => void
  getProductById: (id: number) => ProductType | undefined
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
}))
