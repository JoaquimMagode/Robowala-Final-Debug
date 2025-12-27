import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    // Get current date and previous month for comparison
    const now = new Date()
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // Fetch all statistics in parallel
    const [
      totalRevenue,
      previousMonthRevenue,
      totalOrders,
      previousMonthOrders,
      totalProducts,
      totalCustomers,
      previousMonthCustomers,
      recentOrders,
      topProducts,
      monthlySales
    ] = await Promise.all([
      // Total revenue
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "CANCELLED" } }
      }),
      
      // Previous month revenue
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          status: { not: "CANCELLED" },
          createdAt: { lt: currentMonth }
        }
      }),

      // Total orders
      prisma.order.count({
        where: { status: { not: "CANCELLED" } }
      }),

      // Previous month orders
      prisma.order.count({
        where: {
          status: { not: "CANCELLED" },
          createdAt: { lt: currentMonth }
        }
      }),

      // Total products
      prisma.product.count(),

      // Total customers
      prisma.user.count({
        where: { role: "USER" }
      }),

      // Previous month customers
      prisma.user.count({
        where: {
          role: "USER",
          createdAt: { lt: currentMonth }
        }
      }),

      // Recent orders (last 5)
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      }),

      // Top products by order count
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        _count: { productId: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5
      }),

      // Monthly sales for the last 12 months
      prisma.order.groupBy({
        by: ['createdAt'],
        _sum: { total: true },
        _count: { id: true },
        where: {
          status: { not: "CANCELLED" },
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
          }
        },
        orderBy: { createdAt: 'asc' }
      })
    ])

    // Get product details for top products
    const topProductIds = topProducts.map(p => p.productId)
    const productDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, price: true }
    })

    // Calculate statistics
    const currentRevenue = totalRevenue._sum.total || 0
    const prevRevenue = previousMonthRevenue._sum.total || 0
    const revenueChange = prevRevenue > 0 ? ((currentRevenue - prevRevenue) / prevRevenue) * 100 : 0

    const currentOrderCount = totalOrders
    const prevOrderCount = previousMonthOrders
    const orderChange = prevOrderCount > 0 ? ((currentOrderCount - prevOrderCount) / prevOrderCount) * 100 : 0

    const currentCustomerCount = totalCustomers
    const prevCustomerCount = previousMonthCustomers
    const customerChange = prevCustomerCount > 0 ? ((currentCustomerCount - prevCustomerCount) / prevCustomerCount) * 100 : 0

    // Format top products with details
    const formattedTopProducts = topProducts.map(item => {
      const product = productDetails.find(p => p.id === item.productId)
      return {
        name: product?.name || "Unknown Product",
        sales: item._sum.quantity || 0,
        revenue: (item._sum.quantity || 0) * (product?.price || 0)
      }
    })

    // Format recent orders
    const formattedRecentOrders = recentOrders.map(order => ({
      id: order.orderNumber,
      customer: order.user.name || "Unknown",
      email: order.user.email,
      total: order.total,
      status: order.status.toLowerCase(),
      date: order.createdAt.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    }))

    // Format monthly sales data
    const formattedMonthlySales = monthlySales.map((item: any) => {
      const date = new Date(item.createdAt)
      return {
        month: date.toLocaleDateString("en-US", { month: "short" }),
        sales: Number(item._sum.total) || 0,
        orders: Number(item._count.id) || 0
      }
    })

    return NextResponse.json({
      stats: {
        totalRevenue: {
          value: currentRevenue,
          change: revenueChange,
          trend: revenueChange >= 0 ? "up" : "down"
        },
        totalOrders: {
          value: currentOrderCount,
          change: orderChange,
          trend: orderChange >= 0 ? "up" : "down"
        },
        totalProducts: {
          value: totalProducts,
          change: 0, // We don't track product changes month-to-month
          trend: "up"
        },
        totalCustomers: {
          value: currentCustomerCount,
          change: customerChange,
          trend: customerChange >= 0 ? "up" : "down"
        }
      },
      recentOrders: formattedRecentOrders,
      topProducts: formattedTopProducts,
      monthlySales: formattedMonthlySales
    })

  } catch (error) {
    console.error("Dashboard data fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching dashboard data"
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}