"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { productsAPI } from "@/lib/api-client"

function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    try {
      await addItem(product, 1)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      // Fallback: add basic product info to cart without API validation
      const basicProduct = {
        id: product.id || product.slug,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image || '/placeholder.jpg',
        category: product.category,
        inStock: true
      }
      // Try to add the basic product directly
      try {
        await addItem(basicProduct, 1)
      } catch (fallbackError) {
        console.error('Fallback add to cart also failed:', fallbackError)
      }
    }
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card transition-all hover:shadow-md">
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:bg-background hover:text-red-500"
      >
        <Heart className="h-4 w-4" />
      </button>

      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded bg-[#ff6a00] px-2 py-0.5 text-[10px] font-bold text-white">
          {discount}% OFF
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="block p-3">
        <div className="relative aspect-square overflow-hidden rounded bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 pt-0">
        <p className="mb-1 text-[10px] text-muted-foreground">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-[#1e3a5f] hover:underline">{product.name}</h3>
        </Link>

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

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-foreground">₹{product.price.toFixed(2)}</span>
            <span className="ml-1 text-[10px] text-muted-foreground line-through">₹{product.originalPrice}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded bg-[#1e3a5f] text-white transition-colors hover:bg-[#2d5a8f]"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productsAPI.list({ limit: 6 })
        setProducts(data.products)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
            <div className="mt-1 h-1 w-16 bg-[#ff6a00]" />
          </div>
          <Link
            href="/products"
            className="rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-secondary" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
