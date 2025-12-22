"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Check, CreditCard, Truck, MapPin, ShieldCheck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/lib/cart-store"
import { ordersAPI } from "@/lib/api-client"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Shipping", icon: MapPin },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: ShieldCheck },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, discount, total, clearCart, isAuthenticated } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")

  const shipping = total >= 499 ? 0 : 49
  const finalTotal = total + shipping



  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const isShippingValid = () => {
    return Object.values(shippingInfo).every((value) => value.trim() !== "")
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setError("")

    try {
      // Create order via API
      const order = await ordersAPI.create({
        shippingAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          pincode: shippingInfo.pincode,
        },
      })

      // Clear cart after successful order
      await clearCart()

      // Redirect to success page with order number
      router.push(`/checkout/success?orderNumber=${order.order.orderNumber}`)
    } catch (err: any) {
      console.error("Order creation failed:", err)
      if (err.status === 400 && err.message.includes("stock")) {
        setError("Some items in your cart are out of stock. Please review your cart.")
      } else {
        setError(err.message || "Failed to place order. Please try again.")
      }
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">Add some products to checkout.</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ChevronLeft className="h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-xl font-bold text-foreground">Checkout</h1>
            <div className="w-24" />
          </div>

          {/* Progress Steps */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                    <span className="hidden sm:inline">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  Shipping Information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main Street, Apartment 4B"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleShippingChange}
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} disabled={!isShippingValid()}>
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-colors cursor-pointer",
                      paymentMethod === "card" ? "border-primary bg-accent" : "border-border",
                    )}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                    </Label>
                    <div className="flex gap-2">
                      <div className="rounded bg-muted px-2 py-1 text-xs">Visa</div>
                      <div className="rounded bg-muted px-2 py-1 text-xs">Mastercard</div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-colors cursor-pointer",
                      paymentMethod === "upi" ? "border-primary bg-accent" : "border-border",
                    )}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-muted-foreground">Pay using any UPI app</div>
                    </Label>
                    <div className="flex gap-2">
                      <div className="rounded bg-muted px-2 py-1 text-xs">GPay</div>
                      <div className="rounded bg-muted px-2 py-1 text-xs">PhonePe</div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-colors cursor-pointer",
                      paymentMethod === "netbanking" ? "border-primary bg-accent" : "border-border",
                    )}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                      <div className="font-medium">Net Banking</div>
                      <div className="text-sm text-muted-foreground">Pay directly from your bank account</div>
                    </Label>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-colors cursor-pointer",
                      paymentMethod === "cod" ? "border-primary bg-accent" : "border-border",
                    )}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" className="bg-transparent" onClick={() => setCurrentStep(1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Review Order
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Shipping Summary */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <Truck className="h-4 w-4 text-primary" />
                      Shipping Address
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
                    </p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <CreditCard className="h-4 w-4 text-primary" />
                      Payment Method
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                      Edit
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground capitalize">
                    {paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : paymentMethod === "upi"
                        ? "UPI Payment"
                        : paymentMethod === "netbanking"
                          ? "Net Banking"
                          : "Credit/Debit Card"}
                  </p>
                </div>

                {/* Order Items */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-semibold text-foreground">Order Items ({items.length})</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-lg bg-secondary object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-foreground">₹{item.product.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" className="bg-transparent" onClick={() => setCurrentStep(2)}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Place Order • ₹${finalTotal}`}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Order Summary</h2>

              {/* Items Preview */}
              <div className="mb-6 space-y-3">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-secondary">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="line-clamp-1 font-medium text-foreground">{item.product.name}</p>
                      <p className="text-muted-foreground">₹{item.product.price}</p>
                    </div>
                  </div>
                ))}
                {items.length > 3 && <p className="text-sm text-muted-foreground">+{items.length - 3} more items</p>}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">₹{finalTotal}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 rounded-lg bg-secondary/50 p-3 text-center">
                <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-xs text-muted-foreground">Secure checkout with 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
