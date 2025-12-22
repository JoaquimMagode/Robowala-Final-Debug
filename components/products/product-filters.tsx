"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  inStockOnly: boolean
  onInStockChange: (inStock: boolean) => void
  onClearFilters: () => void
}

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  inStockOnly,
  onInStockChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  const hasActiveFilters = selectedCategory !== null || priceRange[0] > 0 || priceRange[1] < 10000 || inStockOnly

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters} className="w-full bg-transparent">
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}

      {/* Categories */}
      <div className="rounded-lg border border-border bg-card p-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-sm font-semibold text-foreground"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          Categories
          <ChevronDown className={cn("h-4 w-4 transition-transform", isCategoryOpen && "rotate-180")} />
        </button>

        {isCategoryOpen && (
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={() => onCategoryChange(null)}
              className={cn(
                "block w-full rounded px-2 py-1.5 text-left text-sm transition-colors",
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm transition-colors",
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {cat.name}
                <span className="text-xs">({cat.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="rounded-lg border border-border bg-card p-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-sm font-semibold text-foreground"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          Price Range
          <ChevronDown className={cn("h-4 w-4 transition-transform", isPriceOpen && "rotate-180")} />
        </button>

        {isPriceOpen && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">₹{priceRange[0]}</span>
              <span className="text-muted-foreground">₹{priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(checked) => onInStockChange(!!checked)} />
          <label htmlFor="in-stock" className="text-sm font-medium text-foreground cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  )
}
