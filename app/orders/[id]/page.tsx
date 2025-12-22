"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ordersAPI } from "@/lib/api-client"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

interface OrderDetail {
  id: string
  orderNumber: string
  status: string
  total: number
  subtotal: number
  discount: number
  createdAt: string
  updatedAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
      image: string
      slug: string
    }
  }>
  shippingAddress: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
}

const statusConfig = {
  PENDING: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    label: "Order Pending",
    description: "Your order has been received and is being processed.",
  },
  PROCESSING: {
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Processing",
    description: "Your order is being prepared for shipment.",
  },
  SHIPPED: {
    icon: Truck,
    color: "text-purple-600",
    bg: "bg-purple-100",
    label: "Shipped",
    description: "Your order is on its way to you.",
  },
  DELIVERED: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Delivered",
    description: "Your order has been delivered successfully.",
  },
  CANCELLED: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    label: "Cancelled",
    description: "This order has been cancelled.",
  },
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?callbackUrl=/orders")
      return
    }

    if (isAuthenticated && orderId) {
      fetchOrder()
    }
  }, [isAuthenticated, authLoading, orderId, router])

  const fetchOrder = async () => {
    setIsLoading(true)
    setError("")
    try {
      const data = await ordersAPI.getById(orderId)
      setOrder(data.order)
    } catch (err: any) {
      console.error("Failed to fetch order:", err)
      if (err.status === 404) {
        setError("Order not found")
      } else {
        setError(err.message || "Failed to load order details")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">{error || "Order not found"}</h1>
            <Button asChild>
              <Link href="/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = statusInfo.icon
  const shipping = order.total >= 499 ? 0 : 49

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary py-6">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order Details</h1>
              <p className="text-muted-foreground font-mono">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium text-foreground">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className={cn("flex items-start gap-4 p-4 rounded-lg", statusInfo.bg)}>
                <StatusIcon className={cn("h-6 w-6 shrink-0", statusInfo.color)} />
                <div>
                  <h2 className={cn("font-semibold", statusInfo.color)}>{statusInfo.label}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{statusInfo.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-foreground mt-1">₹{item.price} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="pt-2">Phone: {order.shippingAddress.phone}</p>
                <p>Email: {order.shippingAddress.email}</p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Summary */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">₹{order.total}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/support">Contact Support</Link>
                  </Button>
                  {order.status === "DELIVERED" && (
                    <Button variant="outline" className="w-full bg-transparent">
                      Buy Again
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
