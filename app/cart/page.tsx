"use client"

import Link from "next/link"
import { ShoppingBag, ArrowLeft, Trash2, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/cart-store"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, discount, total, clearCart, isLoading } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild size="lg">
              <Link href="/products">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="mt-1 text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card">
              {/* Table Header */}
              <div className="hidden border-b border-border px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
                <div className="col-span-6 text-sm font-semibold text-foreground">Product</div>
                <div className="col-span-2 text-center text-sm font-semibold text-foreground">Quantity</div>
                <div className="col-span-2 text-center text-sm font-semibold text-foreground">Price</div>
                <div className="col-span-2 text-right text-sm font-semibold text-foreground">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="grid gap-4 md:grid-cols-12 md:items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary"
                        >
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-semibold text-foreground hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="mt-auto flex items-center gap-1 text-sm text-destructive hover:underline"
                            disabled={isLoading}
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center rounded-lg border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <p className="font-medium text-foreground">₹{item.product.price}</p>
                        <p className="text-sm text-muted-foreground line-through">₹{item.product.originalPrice}</p>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 text-right">
                        <p className="text-lg font-bold text-foreground">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="border-t border-border px-6 py-4">
                <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive" disabled={isLoading}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">{total >= 499 ? "FREE" : "₹49"}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">
                        ₹{total + (total >= 499 ? 0 : 49)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="mt-6 w-full" disabled={isLoading}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {total < 499 && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Add ₹{499 - total} more for <span className="font-medium text-primary">FREE shipping</span>
                  </p>
                )}
              </div>

              {/* Coupon Code */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Have a coupon?</h3>
                <div className="flex gap-2">
                  <Input placeholder="Enter coupon code" className="flex-1" />
                  <Button variant="outline" className="bg-transparent">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Secure checkout powered by</p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="rounded bg-background px-2 py-1 text-xs font-medium">Razorpay</span>
                  <span className="rounded bg-background px-2 py-1 text-xs font-medium">256-bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
