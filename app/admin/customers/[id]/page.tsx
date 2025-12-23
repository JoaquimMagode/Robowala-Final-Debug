"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, ShoppingBag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Customer {
  id: string
  name: string
  email: string
  createdAt: string
  _count: {
    orders: number
  }
  orders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
  }>
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/")
      return
    }

    if (isAuthenticated && user?.role === "ADMIN") {
      fetchCustomer()
    }
  }, [isAuthenticated, user, authLoading, router])

  const fetchCustomer = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/customers/${params.id}`)
      if (!response.ok) {
        throw new Error("Customer not found")
      }
      const data = await response.json()
      setCustomer(data.customer)
    } catch (err: any) {
      console.error("Failed to fetch customer:", err)
      setError(err.message || "Failed to load customer")
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
    })
  }

  const getTotalSpent = () => {
    return customer?.orders.reduce((sum, order) => sum + order.total, 0) || 0
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    SHIPPED: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    DELIVERED: "bg-green-500/10 text-green-600 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Customer Not Found</h1>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{customer.name}</h1>
          <p className="text-sm text-muted-foreground">Customer Details</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {formatDate(customer.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer._count.orders} total orders</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Orders:</span>
              <span className="text-sm font-medium">{customer._count.orders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Spent:</span>
              <span className="text-sm font-medium">₹{getTotalSpent()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Order:</span>
              <span className="text-sm font-medium">
                ₹{customer._count.orders > 0 ? Math.round(getTotalSpent() / customer._count.orders) : 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/customers/${customer.id}/orders`}>
              View All Orders
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  customer.orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-4 pr-4">
                        <Link 
                          href={`/orders/${order.id}`}
                          className="text-sm font-medium font-mono hover:text-primary"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-sm font-medium">₹{order.total}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="outline" className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}