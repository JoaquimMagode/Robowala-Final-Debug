"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Star, GitCompare } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { useComparisonStore } from "@/lib/comparison-store"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { addProduct, isInComparison } = useComparisonStore()
  const { toast } = useToast()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const discount = product.originalPrice > 0 ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  const inComparison = isInComparison(product.id)

  const handleAddToCart = async () => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)
    try {
      await addItem(product, 1)
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addProduct(product)
    toast({
      title: "Added to Comparison",
      description: `${product.name} has been added to comparison.`,
    })
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1">
      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:bg-background hover:text-red-500"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Badge */}
      {product.badge && (
        <span className="absolute left-2 top-2 z-10 rounded bg-[#1e3a5f] px-2 py-0.5 text-[10px] font-bold text-white">
          {product.badge}
        </span>
      )}

      {/* Discount Badge */}
      {!product.badge && discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded bg-[#ff6a00] px-2 py-0.5 text-[10px] font-bold text-white">
          {discount}% OFF
        </span>
      )}

      {/* Out of Stock */}
      {!product.inStock && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/70">
          <span className="rounded bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">Out of Stock</span>
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block p-3">
        <div className="relative aspect-square overflow-hidden rounded bg-secondary">
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg"
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 pt-0">
        {/* Category & Brand */}
        <div className="mb-2 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-medium text-primary/80 bg-primary/5 px-2 py-0.5 rounded">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-[10px] font-medium text-orange-600/80 bg-orange-500/5 px-2 py-0.5 rounded flex items-center gap-1">
              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                }`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-foreground">₹{product.price.toFixed(2)}</span>
              <span className="ml-1 text-[10px] text-muted-foreground line-through">₹{product.originalPrice}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="flex-1 flex h-8 items-center justify-center gap-1 rounded bg-primary text-primary-foreground text-xs font-medium transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-3 w-3" />
              {isAddingToCart ? "Adding..." : "Add"}
            </button>
            <button
              onClick={handleAddToComparison}
              className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${inComparison
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-secondary"
                }`}
              title={inComparison ? "In comparison" : "Add to comparison"}
            >
              <GitCompare className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
