"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { productsAPI } from "@/lib/api-client"
import { ProductGallery } from "@/components/products/product-gallery"
import { ProductInfo } from "@/components/products/product-info"
import { ProductTabs } from "@/components/products/product-tabs"
import { RelatedProducts } from "@/components/products/related-products"
import { useRecentlyViewedStore } from "@/lib/recently-viewed-store"
import type { Product } from "@/lib/products"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct)

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundError, setNotFoundError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const data = await productsAPI.getBySlug(slug)
        setProduct(data.product)

        // Add to recently viewed
        addToRecentlyViewed(data.product)

        // Fetch related products from same category
        const related = await productsAPI.list({ category: data.product.categorySlug, limit: 5 })
        setRelatedProducts(related.products.filter((p: Product) => p.id !== data.product.id).slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch product:", error)
        setNotFoundError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [slug, addToRecentlyViewed])

  if (notFoundError) {
    notFound()
  }

  if (isLoading || !product) {
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
            <Link href="/products" className="text-muted-foreground transition-colors hover:text-primary font-medium">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              {product.category}
            </Link>
            {product.subcategory && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/products?category=${product.categorySlug}&subcategory=${product.subcategorySlug}`}
                  className="text-muted-foreground transition-colors hover:text-primary font-medium"
                >
                  {product.subcategory}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
