"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useCartStore } from "@/lib/cart-store"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const { items, getItemCount } = useCartStore()

  useEffect(() => {
    setIsHydrated(true)
    console.log('CartProvider hydrated, items:', items.length)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      console.log('Cart items changed:', items.length, 'total count:', getItemCount())
    }
  }, [items, isHydrated, getItemCount])

  if (!isHydrated) {
    return <>{children}</>
  }

  return <>{children}</>
}
