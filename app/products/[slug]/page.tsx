"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ShoppingCart, Star } from "lucide-react"
import { productsAPI } from "@/lib/api-client"
import { useCartStore } from "@/lib/cart-store"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const addItem = useCartStore((state) => state.addItem)

  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with slug:', slug)
        const data = await productsAPI.getBySlug(slug)
        console.log('Product data received:', data)
        setProduct(data.product)
      } catch (error) {
        console.error("Failed to fetch product:", error)
        // Try to create a fallback product
        const fallbackProduct = {
          id: slug,
          slug: slug,
          name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          price: 999,
          originalPrice: 1299,
          rating: 4.5,
          reviews: 100,
          image: '/placeholder.jpg',
          category: 'Electronics',
          description: 'Product description not available.',
          inStock: true
        }
        setProduct(fallbackProduct)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-8" />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-12 bg-muted rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/products" className="text-muted-foreground hover:text-primary">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain w-full h-full p-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.jpg"
              }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
              </div>
              <p className="text-sm text-green-600">In Stock</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
