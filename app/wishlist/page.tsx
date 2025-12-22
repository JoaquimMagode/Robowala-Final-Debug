"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
// In a real app, use a wishlist store. For now we show empty state or mock.
import { useState } from "react"

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([
        // Mock items for demo
        {
            id: "1",
            name: "Arduino UNO R3",
            price: 450,
            image: "/images/products/arduino-uno.jpg",
            stock: true
        },
        {
            id: "2",
            name: "Raspberry Pi 4 Model B",
            price: 4500,
            image: "/images/products/pi4.jpg",
            stock: true
        }
    ])

    const removeFromWishlist = (id: string) => {
        setWishlistItems(items => items.filter(i => i.id !== id))
    }

    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500 fill-red-500" /> My Wishlist
                </h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/30 rounded-xl">
                        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-muted-foreground mb-6">Explore our products and save your favorites here!</p>
                        <Button asChild>
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
                                <div className="h-20 w-20 bg-secondary rounded-md flex items-center justify-center shrink-0">
                                    {/* Placeholder image */}
                                    <span className="text-xs text-muted-foreground">Img</span>
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-primary font-bold">₹ {item.price}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" className="gap-2">
                                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromWishlist(item.id)}>
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
