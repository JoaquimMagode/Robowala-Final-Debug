"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentOrders } from "@/components/admin/recent-orders"
import { TopProducts } from "@/components/admin/top-products"
import { SalesChart } from "@/components/admin/sales-chart"
import { useAuth } from "@/lib/auth-context"

interface DashboardData {
  stats: {
    totalRevenue: { value: number; change: number; trend: string }
    totalOrders: { value: number; change: number; trend: string }
    totalProducts: { value: number; change: number; trend: string }
    totalCustomers: { value: number; change: number; trend: string }
  }
  recentOrders: any[]
  topProducts: any[]
  monthlySales: any[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/")
      return
    }

    if (isAuthenticated && user?.role === "ADMIN") {
      fetchDashboardData()
    }
  }, [isAuthenticated, user, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }
      const data = await response.json()
      setDashboardData(data)
    } catch (err: any) {
      console.error("Dashboard fetch error:", err)
      setError(err.message || "Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">No dashboard data available</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${dashboardData.stats.totalRevenue.value.toLocaleString()}`,
      change: `${dashboardData.stats.totalRevenue.change >= 0 ? '+' : ''}${dashboardData.stats.totalRevenue.change.toFixed(1)}%`,
      trend: dashboardData.stats.totalRevenue.trend,
      icon: TrendingUp,
    },
    {
      title: "Total Orders",
      value: dashboardData.stats.totalOrders.value.toLocaleString(),
      change: `${dashboardData.stats.totalOrders.change >= 0 ? '+' : ''}${dashboardData.stats.totalOrders.change.toFixed(1)}%`,
      trend: dashboardData.stats.totalOrders.trend,
      icon: ShoppingCart,
    },
    {
      title: "Total Products",
      value: dashboardData.stats.totalProducts.value.toLocaleString(),
      change: `+${dashboardData.stats.totalProducts.value}`,
      trend: dashboardData.stats.totalProducts.trend,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: dashboardData.stats.totalCustomers.value.toLocaleString(),
      change: `${dashboardData.stats.totalCustomers.change >= 0 ? '+' : ''}${dashboardData.stats.totalCustomers.change.toFixed(1)}%`,
      trend: dashboardData.stats.totalCustomers.trend,
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={dashboardData.monthlySales} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts data={dashboardData.topProducts} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrders data={dashboardData.recentOrders} />
        </CardContent>
      </Card>
    </div>
  )
}
