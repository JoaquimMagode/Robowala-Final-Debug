import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/products"

interface ComparisonState {
    products: Product[]
    addProduct: (product: Product) => void
    removeProduct: (productId: string) => void
    clearAll: () => void
    isInComparison: (productId: string) => boolean
}

export const useComparisonStore = create<ComparisonState>()(
    persist(
        (set, get) => ({
            products: [],

            addProduct: (product) => {
                const { products } = get()
                if (products.length >= 4) {
                    alert("You can compare up to 4 products at a time")
                    return
                }
                if (products.find((p) => p.id === product.id)) {
                    return
                }
                set({ products: [...products, product] })
            },

            removeProduct: (productId) => {
                set((state) => ({
                    products: state.products.filter((p) => p.id !== productId),
                }))
            },

            clearAll: () => {
                set({ products: [] })
            },

            isInComparison: (productId) => {
                return get().products.some((p) => p.id === productId)
            },
        }),
        {
            name: "comparison-storage",
        }
    )
)
