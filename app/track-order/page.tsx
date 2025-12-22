"use client"

import { useState } from "react"
import { Search, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [result, setResult] = useState<null | { status: string, date: string }>(null)

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        // Mock search
        setTimeout(() => {
            setResult({ status: "In Transit", date: "Expected Delivery: Dec 12, 2025" })
            setIsSearching(false)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="container mx-auto max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
                    <p className="text-muted-foreground">Enter your Order ID to see the current status</p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="order-id">Order ID</Label>
                            <Input
                                id="order-id"
                                placeholder="e.g. #ORD-123456"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSearching}>
                            {isSearching ? "Tracking..." : "Track Order"}
                        </Button>
                    </form>

                    {result && (
                        <div className="mt-8 pt-6 border-t border-border">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{result.status}</h3>
                                    <p className="text-sm text-muted-foreground">{result.date}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="relative pl-4 border-l-2 border-border space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                                        <p className="text-sm font-medium">Out for Delivery</p>
                                        <p className="text-xs text-muted-foreground">Today, 8:00 AM</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                                        <p className="text-sm font-medium text-muted-foreground">Shipped</p>
                                        <p className="text-xs text-muted-foreground">Yesterday</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                                        <p className="text-sm font-medium text-muted-foreground">Order Confirmed</p>
                                        <p className="text-xs text-muted-foreground">Dec 8, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
