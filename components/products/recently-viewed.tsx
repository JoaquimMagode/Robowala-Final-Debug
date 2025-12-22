"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/products/product-card"
import { useRecentlyViewedStore } from "@/lib/recently-viewed-store"
import { Button } from "@/components/ui/button"

export function RecentlyViewed() {
    const { products } = useRecentlyViewedStore()
    const [mounted, setMounted] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || products.length === 0) {
        return null
    }

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById("recently-viewed-scroll")
        if (container) {
            const scrollAmount = 300
            const newPosition = direction === "left"
                ? scrollPosition - scrollAmount
                : scrollPosition + scrollAmount

            container.scrollTo({ left: newPosition, behavior: "smooth" })
            setScrollPosition(newPosition)
        }
    }

    return (
        <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Recently Viewed</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Products you've recently checked out
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="h-8 w-8"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div
                    id="recently-viewed-scroll"
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-64">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
