"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/products"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function MegaMenu() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    return (
        <nav className="hidden lg:block border-t border-b bg-background">
            <div className="container mx-auto px-4">
                <ul className="flex items-center gap-6 py-3">
                    {categories.slice(0, 8).map((category) => (
                        <li
                            key={category.slug}
                            className="relative group"
                            onMouseEnter={() => setActiveCategory(category.slug)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <Link
                                href={`/products?category=${category.slug}`}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors",
                                    activeCategory === category.slug && "text-primary"
                                )}
                            >
                                {category.name}
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <ChevronDown className="h-3 w-3" />
                                )}
                            </Link>

                            {/* Mega Menu Dropdown */}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <div
                                    className={cn(
                                        "absolute left-0 top-full pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                                        activeCategory === category.slug && "opacity-100 visible"
                                    )}
                                >
                                    <div className="bg-background border rounded-lg shadow-lg p-6 min-w-[600px]">
                                        <div className="grid grid-cols-3 gap-4">
                                            {category.subcategories.map((subcategory) => (
                                                <Link
                                                    key={subcategory.slug}
                                                    href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                                                    className="text-sm hover:text-primary transition-colors py-1"
                                                >
                                                    {subcategory.name}
                                                    {subcategory.count > 0 && (
                                                        <span className="text-xs text-muted-foreground ml-1">
                                                            ({subcategory.count})
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                        {category.description && (
                                            <div className="mt-4 pt-4 border-t">
                                                <p className="text-xs text-muted-foreground">{category.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/products"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
