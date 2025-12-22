"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { Spinner } from "@/components/ui/spinner"

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get("orderNumber")

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  if (!orderNumber) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details Card */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Package className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-2xl font-bold text-foreground font-mono">{orderNumber}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-sm text-muted-foreground">
                You can track your order status from your orders page.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/orders">
              View My Orders
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="bg-transparent">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">📦 Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Your order will be delivered within 3-5 business days.
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">🔒 Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and secure.
            </p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">💬 24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Our support team is here to help you anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  )
}
