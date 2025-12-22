"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparisonStore } from "@/lib/comparison-store"
import { useCartStore } from "@/lib/cart-store"
import { cn } from "@/lib/utils"

export default function ComparisonPage() {
    const { products, removeProduct, clearAll } = useComparisonStore()
    const addItem = useCartStore((state) => state.addItem)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <h1 className="text-3xl font-bold mb-4">No Products to Compare</h1>
                        <p className="text-muted-foreground mb-8">
                            Add products to comparison from the product pages
                        </p>
                        <Button asChild>
                            <Link href="/products">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Browse Products
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Get all unique specification keys
    const allSpecs = new Set<string>()
    products.forEach((product) => {
        Object.keys(product.specifications).forEach((key) => allSpecs.add(key))
    })
    const specKeys = Array.from(allSpecs)

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary to-primary/5">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Product Comparison</h1>
                            <p className="text-muted-foreground mt-1">
                                Comparing {products.length} {products.length === 1 ? "product" : "products"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={clearAll}>
                                <X className="mr-2 h-4 w-4" />
                                Clear All
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href="/products">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Products
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="container mx-auto px-4 py-8">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="sticky left-0 z-10 bg-background border-r border-border p-4 text-left font-semibold w-48">
                                    Feature
                                </th>
                                {products.map((product) => (
                                    <th key={product.id} className="border-r border-border p-4 min-w-[250px]">
                                        <div className="relative">
                                            <button
                                                onClick={() => removeProduct(product.id)}
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                            <div className="aspect-square relative mb-4 bg-secondary rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                            </div>
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="font-semibold hover:text-primary transition-colors block mb-2"
                                            >
                                                {product.name}
                                            </Link>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                                <span>{product.category}</span>
                                                {product.brand && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{product.brand}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Price Row */}
                            <tr className="border-t border-border bg-secondary/30">
                                <td className="sticky left-0 z-10 bg-secondary/30 border-r border-border p-4 font-semibold">
                                    Price
                                </td>
                                {products.map((product) => (
                                    <td key={product.id} className="border-r border-border p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-bold">₹{product.price}</span>
                                            <span className="text-sm text-muted-foreground line-through">
                                                ₹{product.originalPrice}
                                            </span>
                                            <span className="text-xs font-semibold text-green-600">
                                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Rating Row */}
                            <tr className="border-t border-border">
                                <td className="sticky left-0 z-10 bg-background border-r border-border p-4 font-semibold">
                                    Rating
                                </td>
                                {products.map((product) => (
                                    <td key={product.id} className="border-r border-border p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold">{product.rating}</span>
                                            <span className="text-sm text-muted-foreground">
                                                ({product.reviews} reviews)
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Stock Row */}
                            <tr className="border-t border-border bg-secondary/30">
                                <td className="sticky left-0 z-10 bg-secondary/30 border-r border-border p-4 font-semibold">
                                    Availability
                                </td>
                                {products.map((product) => (
                                    <td key={product.id} className="border-r border-border p-4">
                                        {product.inStock ? (
                                            <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                Out of Stock
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>

                            {/* Specifications */}
                            {specKeys.map((specKey, index) => (
                                <tr
                                    key={specKey}
                                    className={cn(
                                        "border-t border-border",
                                        index % 2 === 0 ? "bg-secondary/30" : ""
                                    )}
                                >
                                    <td className={cn(
                                        "sticky left-0 z-10 border-r border-border p-4 font-semibold",
                                        index % 2 === 0 ? "bg-secondary/30" : "bg-background"
                                    )}>
                                        {specKey}
                                    </td>
                                    {products.map((product) => (
                                        <td key={product.id} className="border-r border-border p-4">
                                            {product.specifications[specKey] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            {/* Action Row */}
                            <tr className="border-t border-border bg-secondary/30">
                                <td className="sticky left-0 z-10 bg-secondary/30 border-r border-border p-4 font-semibold">
                                    Actions
                                </td>
                                {products.map((product) => (
                                    <td key={product.id} className="border-r border-border p-4">
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                onClick={() => addItem(product, 1)}
                                                disabled={!product.inStock}
                                                className="w-full"
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                            </Button>
                                            <Button variant="outline" asChild className="w-full">
                                                <Link href={`/products/${product.slug}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
