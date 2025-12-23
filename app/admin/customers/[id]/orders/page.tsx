"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, Filter, MoreHorizontal, Eye, Truck, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: Array<{
    id: string
    quantity: number
  }>
}

interface Customer {
  id: string
  name: string
  email: string
}

export default function CustomerOrdersPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/")
      return
    }

    if (isAuthenticated && user?.role === "ADMIN") {
      fetchCustomerOrders()
    }
  }, [isAuthenticated, user, authLoading, router])

  const fetchCustomerOrders = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/customers/${params.id}/orders`)
      if (!response.ok) {
        throw new Error("Failed to fetch customer orders")
      }
      const data = await response.json()
      setCustomer(data.customer)
      setOrders(data.orders)
    } catch (err: any) {
      console.error("Failed to fetch customer orders:", err)
      setError(err.message || "Failed to load customer orders")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch (err: any) {
      alert(err.message || "Failed to update order status")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    IN_TRANSIT: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    ON_THE_WAY: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    OUT_FOR_DELIVERY: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    SHIPPED: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    DELIVERED: "bg-green-500/10 text-green-600 border-green-500/20",
    DELAYED: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
  }

  const filteredOrders = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase())
  )

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <h1 className="text-2xl font-bold text-foreground">
            {customer?.name}'s Orders
          </h1>
          <p className="text-sm text-muted-foreground">
            {customer?.email} • {orders.length} total orders
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Items</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      {search ? "No orders found matching your search" : "No orders yet"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-4 pr-4">
                        <span className="text-sm font-medium font-mono">{order.orderNumber}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-sm">{order.items.length}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-sm font-medium">₹{order.total}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="outline" className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/orders/${order.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PROCESSING")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "IN_TRANSIT")}>
                              <Truck className="mr-2 h-4 w-4" />
                              In Transit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "ON_THE_WAY")}>
                              <Truck className="mr-2 h-4 w-4" />
                              On the Way
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "OUT_FOR_DELIVERY")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Out for Delivery
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "DELIVERED")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "DELAYED")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Delayed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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