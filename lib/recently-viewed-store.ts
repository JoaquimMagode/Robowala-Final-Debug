import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/products"

interface RecentlyViewedState {
    products: Product[]
    addProduct: (product: Product) => void
    clearAll: () => void
}

const MAX_RECENT_PRODUCTS = 10

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
    persist(
        (set, get) => ({
            products: [],

            addProduct: (product) => {
                const { products } = get()

                // Remove if already exists
                const filtered = products.filter((p) => p.id !== product.id)

                // Add to beginning
                const updated = [product, ...filtered].slice(0, MAX_RECENT_PRODUCTS)

                set({ products: updated })
            },

            clearAll: () => {
                set({ products: [] })
            },
        }),
        {
            name: "recently-viewed-storage",
        }
    )
)
