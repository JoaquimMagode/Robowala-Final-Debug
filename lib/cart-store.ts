"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/products"
import { cartAPI } from "@/lib/api-client"

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  fetchCart: () => Promise<void>
  addItem: (product: Product, quantity?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  setAuthenticated: (isAuth: boolean) => void
  
  // Computed values
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      isLoading: false,
      isAuthenticated: false,

      setAuthenticated: (isAuth: boolean) => {
        set({ isAuthenticated: isAuth })
        if (isAuth) {
          get().fetchCart()
        } else {
          set({ items: [], subtotal: 0, discount: 0, total: 0 })
        }
      },

      fetchCart: async () => {
        if (!get().isAuthenticated) return
        
        set({ isLoading: true })
        try {
          const data = await cartAPI.get()
          set({
            items: data.items.map((item: any) => ({
              id: item.id,
              product: item.product,
              quantity: item.quantity,
            })),
            subtotal: data.subtotal,
            discount: data.discount,
            total: data.total,
          })
        } catch (error) {
          console.error("Failed to fetch cart:", error)
          // If unauthorized, clear cart
          if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 401) {
            set({ items: [], subtotal: 0, discount: 0, total: 0, isAuthenticated: false })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      addItem: async (product, quantity = 1) => {
        const calculateTotals = (items: CartItem[]) => {
          const subtotal = items.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0)
          const discount = items.reduce(
            (total, item) => total + (item.product.originalPrice - item.product.price) * item.quantity,
            0,
          )
          const total = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
          return { subtotal, discount, total }
        }

        if (!get().isAuthenticated) {
          // For non-authenticated users, store in local state
          set((state) => {
            const existingItem = state.items.find((item) => item.product.id === product.id)

            let newItems: CartItem[]
            if (existingItem) {
              newItems = state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              )
            } else {
              newItems = [...state.items, { id: `local-${Date.now()}`, product, quantity }]
            }

            return {
              items: newItems,
              ...calculateTotals(newItems),
            }
          })
          return
        }

        set({ isLoading: true })
        try {
          await cartAPI.add({ productId: product.id, quantity })
          await get().fetchCart()
        } catch (error) {
          console.error("Failed to add item to cart:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: async (itemId) => {
        if (!get().isAuthenticated) {
          // For non-authenticated users, remove from local state
          set((state) => {
            const newItems = state.items.filter((item) => item.id !== itemId)
            return {
              items: newItems,
              subtotal: newItems.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0),
              discount: newItems.reduce(
                (total, item) => total + (item.product.originalPrice - item.product.price) * item.quantity,
                0,
              ),
              total: newItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
            }
          })
          return
        }

        set({ isLoading: true })
        try {
          await cartAPI.removeItem(itemId)
          await get().fetchCart()
        } catch (error) {
          console.error("Failed to remove item from cart:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateQuantity: async (itemId, quantity) => {
        if (quantity < 1) return

        if (!get().isAuthenticated) {
          // For non-authenticated users, update local state
          set((state) => {
            const newItems = state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
            return {
              items: newItems,
              subtotal: newItems.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0),
              discount: newItems.reduce(
                (total, item) => total + (item.product.originalPrice - item.product.price) * item.quantity,
                0,
              ),
              total: newItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
            }
          })
          return
        }

        set({ isLoading: true })
        try {
          await cartAPI.updateQuantity(itemId, quantity)
          await get().fetchCart()
        } catch (error) {
          console.error("Failed to update quantity:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      clearCart: async () => {
        if (!get().isAuthenticated) {
          set({ items: [], subtotal: 0, discount: 0, total: 0 })
          return
        }

        set({ isLoading: true })
        try {
          await cartAPI.clear()
          set({ items: [], subtotal: 0, discount: 0, total: 0 })
        } catch (error) {
          console.error("Failed to clear cart:", error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "robo-wala-cart",
      partialize: (state) => ({
        items: state.isAuthenticated ? [] : state.items,
        subtotal: state.isAuthenticated ? 0 : state.subtotal,
        discount: state.isAuthenticated ? 0 : state.discount,
        total: state.isAuthenticated ? 0 : state.total,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
