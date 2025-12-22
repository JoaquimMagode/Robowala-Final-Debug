"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Star, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addItem(product, quantity)
    setQuantity(1)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push("/checkout")
  }

  return (
    <div className="space-y-6">
      {/* Category & Brand */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-1.5 text-sm font-semibold text-primary border border-primary/20">
          {product.category}
          {product.subcategory && (
            <>
              <span className="text-primary/50">•</span>
              <span className="text-primary/80">{product.subcategory}</span>
            </>
          )}
        </span>
        {product.brand && (
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 px-4 py-1.5 text-sm font-semibold text-orange-600 border border-orange-500/20">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {product.brand}
          </span>
        )}
        {product.badge && (
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500/10 to-green-500/5 px-4 py-1.5 text-sm font-semibold text-green-600 border border-green-500/20">
            {product.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground leading-tight">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
        <span className="font-medium text-foreground">{product.rating}</span>
        <span className="text-muted-foreground">({product.reviews} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
        <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
        <span className="rounded-full bg-[#ff6a00]/10 px-3 py-1 text-sm font-semibold text-[#ff6a00]">
          {discount}% OFF
        </span>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600">In Stock</span>
          </>
        ) : (
          <>
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-600">Out of Stock</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground">{product.description}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantity:</span>
        <div className="flex items-center rounded-lg border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-r-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          size="lg"
          className="flex-1 bg-[#1e3a5f] hover:bg-[#2d5a8f]"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-[#ff6a00] hover:bg-[#ff6a00]/90"
          disabled={!product.inStock}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 bg-transparent ${isWishlisted ? "text-red-500" : ""}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 rounded-lg border border-border bg-secondary/50 p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f]/10">
            <Truck className="h-5 w-5 text-[#1e3a5f]" />
          </div>
          <span className="text-xs text-muted-foreground">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f]/10">
            <Shield className="h-5 w-5 text-[#1e3a5f]" />
          </div>
          <span className="text-xs text-muted-foreground">Genuine Product</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f]/10">
            <RefreshCw className="h-5 w-5 text-[#1e3a5f]" />
          </div>
          <span className="text-xs text-muted-foreground">7-Day Returns</span>
        </div>
      </div>

      {/* Specifications Preview */}
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <h3 className="font-semibold text-foreground">Key Specifications</h3>
        <div className="grid gap-2">
          {Object.entries(product.specifications)
            .slice(0, 4)
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
