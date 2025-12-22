"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, Grid3X3, LayoutList, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/products/product-card"
import { FilterSidebar } from "@/components/products/filter-sidebar"
import { ProductSort, type SortOption } from "@/components/products/product-sort"
import { productsAPI } from "@/lib/api-client"
import { categories } from "@/lib/products"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"
import { Spinner } from "@/components/ui/spinner"

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const initialSubcategory = searchParams.get("subcategory")

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategory)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await productsAPI.list({
          category: selectedCategory || undefined,
        })

        // Apply client-side filtering for subcategory, brand, price and stock
        let filtered = data.products

        if (selectedSubcategory) {
          filtered = filtered.filter((p: Product) => p.subcategorySlug === selectedSubcategory)
        }

        if (selectedBrands.length > 0) {
          filtered = filtered.filter((p: Product) => p.brand && selectedBrands.includes(p.brand))
        }

        if (priceRange[0] > 0 || priceRange[1] < 10000) {
          filtered = filtered.filter((p: Product) =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
          )
        }

        if (inStockOnly) {
          filtered = filtered.filter((p: Product) => p.inStock)
        }

        setProducts(filtered)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, selectedSubcategory, selectedBrands, priceRange, inStockOnly])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return Number.parseInt(b.id) - Number.parseInt(a.id)
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setSelectedBrands([])
    setPriceRange([0, 10000])
    setInStockOnly(false)
  }

  const categoryName = selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name : "All Products"

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-secondary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
          <p className="mt-2 text-muted-foreground">
            {isLoading ? "Loading..." : `${sortedProducts.length} ${sortedProducts.length === 1 ? "product" : "products"} found`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters - Using FilterSidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory || undefined}
            selectedSubcategory={selectedSubcategory || undefined}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onSubcategoryChange={setSelectedSubcategory}
            onBrandChange={setSelectedBrands}
            onPriceChange={setPriceRange}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      selectedCategory={selectedCategory || undefined}
                      selectedSubcategory={selectedSubcategory || undefined}
                      selectedBrands={selectedBrands}
                      priceRange={priceRange}
                      onCategoryChange={(cat: string) => {
                        setSelectedCategory(cat)
                        setIsFilterOpen(false)
                      }}
                      onSubcategoryChange={(sub: string) => {
                        setSelectedSubcategory(sub)
                        setIsFilterOpen(false)
                      }}
                      onBrandChange={setSelectedBrands}
                      onPriceChange={setPriceRange}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode & Sort */}
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded p-1.5 transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "rounded p-1.5 transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>

                <ProductSort value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || inStockOnly || priceRange[0] > 0 || priceRange[1] < 10000) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {categoryName}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                  <button
                    type="button"
                    onClick={() => setPriceRange([0, 10000])}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {inStockOnly && (
                  <button
                    type="button"
                    onClick={() => setInStockOnly(false)}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    In Stock
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-lg border border-border bg-card p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                )}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/50 p-8 text-center">
                <p className="text-lg font-semibold text-foreground">No products found</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search criteria</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
