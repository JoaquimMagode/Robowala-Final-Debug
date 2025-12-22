"use client"

import { useEffect, useState, Suspense } from "react"
import { Sparkles } from "lucide-react"
import { ProductCard } from "@/components/products/product-card"
import { productsAPI } from "@/lib/api-client"
import { Spinner } from "@/components/ui/spinner"
import type { Product } from "@/lib/products"

function NewArrivalsContent() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // In a real app, we would pass a sort parameter like sort=newest
                // For now, we'll just fetch products and reverse them to simulate "newest"
                const data = await productsAPI.list({ limit: 12 })
                setProducts(data.products.reverse())
            } catch (error) {
                console.error("Failed to fetch new arrivals:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="bg-[#1e3a5f] text-white py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 translate-y-2">
                        <Sparkles className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Discover the latest robotics kits, sensors, and development boards just added to our inventory.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                {isLoading ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-xl bg-secondary animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!isLoading && products.length === 0 && (
                    <div className="text-center py-20 bg-secondary/30 rounded-xl">
                        <p className="text-muted-foreground text-lg">Check back soon for new products!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function NewArrivalsPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Spinner /></div>}>
            <NewArrivalsContent />
        </Suspense>
    )
}
