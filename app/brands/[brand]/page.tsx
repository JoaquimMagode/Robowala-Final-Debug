"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Award } from "lucide-react"
import { ProductCard } from "@/components/products/product-card"
import { productsAPI } from "@/lib/api-client"
import type { Product } from "@/lib/products"
import { Spinner } from "@/components/ui/spinner"

// Brand information (in production, this would come from a database)
const brandInfo: Record<string, { name: string; description: string; logo?: string; website?: string }> = {
    "arduino": {
        name: "Arduino",
        description: "Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's intended for anyone making interactive projects.",
        website: "https://www.arduino.cc"
    },
    "raspberry-pi-foundation": {
        name: "Raspberry Pi Foundation",
        description: "The Raspberry Pi Foundation is a UK-based charity that works to put the power of computing and digital making into the hands of people all over the world.",
        website: "https://www.raspberrypi.org"
    },
    "espressif": {
        name: "Espressif Systems",
        description: "Espressif Systems is a fabless semiconductor company providing cutting-edge low power WiFi SoCs and wireless solutions for wireless communications and Internet of Things applications.",
        website: "https://www.espressif.com"
    },
    "dji": {
        name: "DJI",
        description: "DJI is the global leader in developing and manufacturing innovative drone and camera technology for commercial and recreational use.",
        website: "https://www.dji.com"
    },
    "mastech": {
        name: "MASTECH",
        description: "MASTECH is a leading manufacturer of electronic test and measurement equipment, specializing in digital multimeters and other testing instruments.",
    },
}

export default function BrandPage() {
    const params = useParams()
    const brandSlug = params.brand as string
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const brand = brandInfo[brandSlug] || {
        name: brandSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        description: `Explore our collection of ${brandSlug} products.`
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const data = await productsAPI.list({})
                // Filter by brand
                const filtered = data.products.filter((p: Product) =>
                    p.brand?.toLowerCase().replace(/\s+/g, "-") === brandSlug
                )
                setProducts(filtered)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [brandSlug])

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumbs */}
            <div className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary to-primary/5">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <Link href="/brands" className="text-muted-foreground transition-colors hover:text-primary font-medium">
                            Brands
                        </Link>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{brand.name}</span>
                    </nav>
                </div>
            </div>

            {/* Brand Header */}
            <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-orange-500/5">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
                                <Award className="h-6 w-6 text-orange-600" />
                            </div>
                            <h1 className="text-4xl font-bold">{brand.name}</h1>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                            {brand.description}
                        </p>
                        {brand.website && (
                            <a
                                href={brand.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                            >
                                Visit Official Website
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                        {brand.name} Products
                    </h2>
                    <p className="text-muted-foreground">
                        {isLoading ? "Loading..." : `${products.length} ${products.length === 1 ? "product" : "products"} found`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl border border-border bg-card p-4">
                                <div className="aspect-square bg-muted rounded-lg mb-4" />
                                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                                <div className="h-4 bg-muted rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/50 p-8 text-center">
                        <p className="text-lg font-semibold text-foreground">No products found</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            We don't have any {brand.name} products at the moment
                        </p>
                        <Link
                            href="/products"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                            Browse All Products
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
