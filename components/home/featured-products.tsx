"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { productsAPI } from "@/lib/api-client"

const staticFeaturedProducts = [
  {
    id: "esp32-devkit",
    slug: "esp32-devkit",
    sku: "SKU: 1164989",
    name: "ESP32-WROOM-32 DevKit V1",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 234,
    image: "/esp32-development-board-wifi-bluetooth-microcontro.jpg",
    category: "Development Boards",
    categorySlug: "development-boards",
    inStock: true,
  },
  {
    id: "arduino-uno-r4",
    slug: "arduino-uno-r4",
    sku: "SKU: 1164990",
    name: "Arduino UNO R4 WiFi Development Board",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 156,
    image: "/arduino-uno-r4-wifi-development-board-blue.jpg",
    category: "Development Boards",
    categorySlug: "development-boards",
    inStock: true,
  },
  {
    id: "raspberry-pi-5",
    slug: "raspberry-pi-5",
    sku: "SKU: 1281445",
    name: "Raspberry Pi 5 8GB Single Board Computer",
    price: 7499,
    originalPrice: 8499,
    rating: 4.9,
    reviews: 89,
    image: "/raspberry-pi-5-single-board-computer.jpg",
    category: "Single Board Computers",
    categorySlug: "development-boards",
    inStock: true,
  },
  {
    id: "sensor-kit-37",
    slug: "sensor-kit-37",
    sku: "SKU: 1713507",
    name: "37-in-1 Sensor Kit for Arduino",
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 312,
    image: "/arduino-sensor-kit-37-pieces-various-sensors-modul.jpg",
    category: "Sensors",
    categorySlug: "sensors",
    inStock: true,
  },
  {
    id: "dht22-sensor",
    slug: "dht22",
    sku: "SKU: 1713572",
    name: "DHT22 Digital Temperature Humidity Sensor",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 445,
    image: "/dht22-temperature-humidity-sensor-white.jpg",
    category: "Sensors",
    categorySlug: "sensors",
    inStock: true,
  },
  {
    id: "l298n-driver",
    slug: "l298n",
    sku: "SKU: 1713577",
    name: "L298N Motor Driver Module Dual H-Bridge",
    price: 149,
    originalPrice: 199,
    rating: 4.5,
    reviews: 267,
    image: "/l298n-motor-driver-module-red-pcb.jpg",
    category: "Motors",
    categorySlug: "motors",
    inStock: true,
  },
]

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        categorySlug: product.categorySlug,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        description: "",
        specifications: [],
      },
      1,
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card transition-all hover:shadow-md">
      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:bg-background hover:text-red-500"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded bg-[#ff6a00] px-2 py-0.5 text-[10px] font-bold text-white">
          {discount}% OFF
        </span>
      )}

      {/* Image */}
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

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 pt-0">
        {/* Category */}
        <p className="mb-1 text-[10px] text-muted-foreground">{product.category}</p>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-[#1e3a5f] hover:underline">{product.name}</h3>
        </Link>

        {/* SKU */}
        <p className="mb-1 text-[10px] text-muted-foreground">{product.sku}</p>

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
  const [products, setProducts] = useState<any[]>(staticFeaturedProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productsAPI.list({ limit: 6 })
        setProducts(data.products)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        // Fallback to static data on error
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Products Grid */}
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
