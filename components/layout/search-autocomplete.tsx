"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { productsAPI } from "@/lib/api-client"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

export function SearchAutocomplete() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Product[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Popular searches (could be fetched from analytics)
    const popularSearches = [
        "Arduino UNO",
        "Raspberry Pi 5",
        "ESP32",
        "Servo Motor",
        "OLED Display",
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        const searchProducts = async () => {
            if (query.length < 2) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const data = await productsAPI.list({})
                // Simple client-side search (in production, this should be server-side)
                const filtered = data.products.filter((p: Product) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.category.toLowerCase().includes(query.toLowerCase()) ||
                    p.brand?.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 5)
                setResults(filtered)
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        const debounce = setTimeout(searchProducts, 300)
        return () => clearTimeout(debounce)
    }, [query])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
                break
            case "ArrowUp":
                e.preventDefault()
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
                break
            case "Enter":
                e.preventDefault()
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    router.push(`/products/${results[selectedIndex].slug}`)
                    setIsOpen(false)
                    setQuery("")
                } else if (query) {
                    router.push(`/products?search=${encodeURIComponent(query)}`)
                    setIsOpen(false)
                }
                break
            case "Escape":
                setIsOpen(false)
                break
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`)
            setIsOpen(false)
        }
    }

    return (
        <div ref={wrapperRef} className="relative w-full">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search for products, categories, brands..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                        setSelectedIndex(-1)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="h-10 w-full rounded-lg border-border bg-secondary pl-10 pr-10 focus:ring-2 focus:ring-primary/20"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("")
                            setResults([])
                            setIsOpen(false)
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </form>

            {/* Autocomplete Dropdown */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-card shadow-xl">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Searching...
                        </div>
                    ) : query.length >= 2 && results.length > 0 ? (
                        <div className="py-2">
                            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                                Products
                            </div>
                            {results.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    onClick={() => {
                                        setIsOpen(false)
                                        setQuery("")
                                    }}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 transition-colors",
                                        selectedIndex === index
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-secondary"
                                    )}
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="h-10 w-10 object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="truncate text-sm font-medium">{product.name}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{product.category}</span>
                                            {product.brand && (
                                                <>
                                                    <span>•</span>
                                                    <span>{product.brand}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-sm font-semibold">
                                        ₹{product.price}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : query.length >= 2 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No products found for "{query}"
                        </div>
                    ) : (
                        <div className="py-2">
                            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                                <TrendingUp className="h-3 w-3" />
                                Popular Searches
                            </div>
                            {popularSearches.map((search) => (
                                <button
                                    key={search}
                                    onClick={() => {
                                        setQuery(search)
                                        setIsOpen(true)
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-secondary transition-colors"
                                >
                                    {search}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
