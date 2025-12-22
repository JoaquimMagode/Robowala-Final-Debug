"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { categories } from "@/lib/products"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
    selectedCategory?: string
    selectedSubcategory?: string
    selectedBrands: string[]
    priceRange: [number, number]
    onCategoryChange: (category: string) => void
    onSubcategoryChange: (subcategory: string) => void
    onBrandChange: (brands: string[]) => void
    onPriceChange: (range: [number, number]) => void
    onClearFilters: () => void
}

export function FilterSidebar({
    selectedCategory,
    selectedSubcategory,
    selectedBrands,
    priceRange,
    onCategoryChange,
    onSubcategoryChange,
    onBrandChange,
    onPriceChange,
    onClearFilters,
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>(["category", "price"])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const toggleSection = (section: string) => {
        setExpandedSections((prev) =>
            prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
        )
    }

    const currentCategory = categories.find((c) => c.slug === selectedCategory)
    const subcategories = currentCategory?.subcategories || []

    // Popular brands (in a real app, this would come from the database)
    const popularBrands = [
        "Arduino",
        "Raspberry Pi Foundation",
        "Espressif",
        "DJI",
        "Emax",
        "TowerPro",
        "STMicroelectronics",
        "MASTECH",
    ]

    const handleBrandToggle = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            onBrandChange(selectedBrands.filter((b) => b !== brand))
        } else {
            onBrandChange([...selectedBrands, brand])
        }
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Clear Filters */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 text-xs">
                    <X className="mr-1 h-3 w-3" />
                    Clear All
                </Button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
                <button
                    onClick={() => toggleSection("category")}
                    className="flex w-full items-center justify-between text-sm font-semibold"
                >
                    Category
                    {expandedSections.includes("category") ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
                {expandedSections.includes("category") && (
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                onClick={() => onCategoryChange(category.slug)}
                                className={cn(
                                    "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                                    selectedCategory === category.slug
                                        ? "bg-primary text-primary-foreground font-medium"
                                        : "hover:bg-secondary"
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
                <div className="space-y-3">
                    <button
                        onClick={() => toggleSection("subcategory")}
                        className="flex w-full items-center justify-between text-sm font-semibold"
                    >
                        Subcategory
                        {expandedSections.includes("subcategory") ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </button>
                    {expandedSections.includes("subcategory") && (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {subcategories.map((subcategory) => (
                                <button
                                    key={subcategory.slug}
                                    onClick={() => onSubcategoryChange(subcategory.slug)}
                                    className={cn(
                                        "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                                        selectedSubcategory === subcategory.slug
                                            ? "bg-primary/10 text-primary font-medium border border-primary/20"
                                            : "hover:bg-secondary"
                                    )}
                                >
                                    {subcategory.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Brand Filter */}
            <div className="space-y-3">
                <button
                    onClick={() => toggleSection("brand")}
                    className="flex w-full items-center justify-between text-sm font-semibold"
                >
                    Brand
                    {expandedSections.includes("brand") ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
                {expandedSections.includes("brand") && (
                    <div className="space-y-2">
                        {popularBrands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onCheckedChange={() => handleBrandToggle(brand)}
                                />
                                <Label
                                    htmlFor={`brand-${brand}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                >
                                    {brand}
                                </Label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
                <button
                    onClick={() => toggleSection("price")}
                    className="flex w-full items-center justify-between text-sm font-semibold"
                >
                    Price Range
                    {expandedSections.includes("price") ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
                {expandedSections.includes("price") && (
                    <div className="space-y-4">
                        <Slider
                            min={0}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={(value) => onPriceChange(value as [number, number])}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">₹{priceRange[0]}</span>
                            <span className="text-muted-foreground">to</span>
                            <span className="font-medium">₹{priceRange[1]}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Stock Status */}
            <div className="space-y-3">
                <button
                    onClick={() => toggleSection("stock")}
                    className="flex w-full items-center justify-between text-sm font-semibold"
                >
                    Availability
                    {expandedSections.includes("stock") ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
                {expandedSections.includes("stock") && (
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="in-stock" defaultChecked />
                            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                                In Stock
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="out-of-stock" />
                            <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                                Out of Stock
                            </Label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Filter Button */}
            <Button
                variant="outline"
                className="lg:hidden fixed bottom-4 right-4 z-40 shadow-lg"
                onClick={() => setIsMobileOpen(true)}
            >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
            </Button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <FilterContent />
                </div>
            </aside>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-background border-l border-border p-6 shadow-xl overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    )
}
