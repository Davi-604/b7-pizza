import { Product } from "@prisma/client"
import { create } from "zustand"

type Store = {
    products: Product[],
    setProduct: (products: Product[]) => void
}

export const useProducts = create<Store>((set) => ({
    products: [],
    setProduct: (products) => set({ products })
}))