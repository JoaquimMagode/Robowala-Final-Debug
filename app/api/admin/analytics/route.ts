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

    // Fetch analytics data in parallel
    const [
      totalRevenue,
      previousMonthRevenue,
      totalOrders,
      previousMonthOrders,
      totalCustomers,
      previousMonthCustomers,
      newCustomersThisMonth,
      topProducts,
      recentOrders,
      monthlySales,
      categoryDistribution,
      ordersByStatus
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

      // New customers this month
      prisma.user.count({
        where: {
          role: "USER",
          createdAt: { gte: currentMonth }
        }
      }),

      // Top selling products
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true, price: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5
      }),

      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true }
          }
        }
      }),

      // Monthly sales for the last 6 months
      prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', createdAt) as month,
          SUM(total) as sales,
          COUNT(*) as orders
        FROM Order 
        WHERE status != 'CANCELLED' 
          AND createdAt >= date('now', '-6 months')
        GROUP BY strftime('%Y-%m', createdAt)
        ORDER BY month ASC
      `,

      // Category distribution
      prisma.product.groupBy({
        by: ["category"],
        _count: { category: true }
      }),

      // Orders by status
      prisma.order.groupBy({
        by: ["status"],
        _count: { status: true }
      })
    ])

    // Get product details for top products
    const topProductIds = topProducts.map(p => p.productId)
    const productDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, price: true }
    })

    // Calculate metrics
    const currentRevenue = totalRevenue._sum.total || 0
    const prevRevenue = previousMonthRevenue._sum.total || 0
    const revenueChange = prevRevenue > 0 ? ((currentRevenue - prevRevenue) / prevRevenue) * 100 : 0

    const currentOrderCount = totalOrders
    const prevOrderCount = previousMonthOrders
    const orderChange = prevOrderCount > 0 ? ((currentOrderCount - prevOrderCount) / prevOrderCount) * 100 : 0

    const currentCustomerCount = totalCustomers
    const prevCustomerCount = previousMonthCustomers
    const customerChange = prevCustomerCount > 0 ? ((currentCustomerCount - prevCustomerCount) / prevCustomerCount) * 100 : 0

    // Calculate average order value
    const avgOrderValue = currentOrderCount > 0 ? currentRevenue / currentOrderCount : 0

    // Calculate return rate (customers with more than 1 order)
    const returningCustomers = await prisma.user.count({
      where: {
        role: "USER",
        orders: {
          some: {}
        }
      }
    })
    const returnRate = currentCustomerCount > 0 ? (returningCustomers / currentCustomerCount) * 100 : 0

    // Format top products
    const formattedTopProducts = topProducts.map(item => {
      const product = productDetails.find(p => p.id === item.productId)
      return {
        name: product?.name || "Unknown Product",
        sales: item._sum.quantity || 0,
        revenue: item._sum.price || 0
      }
    })

    // Format recent orders
    const formattedRecentOrders = recentOrders.map(order => ({
      id: order.orderNumber,
      customer: order.user.name || "Unknown",
      amount: order.total,
      status: order.status.toLowerCase(),
      date: order.createdAt.toISOString().split('T')[0]
    }))

    // Format monthly sales
    const formattedMonthlySales = (monthlySales as any[]).map(item => ({
      month: new Date(item.month + "-01").toLocaleDateString("en-US", { month: "short" }),
      sales: Number(item.sales) || 0,
      orders: Number(item.orders) || 0
    }))

    // Format category distribution
    const totalProducts = categoryDistribution.reduce((sum, cat) => sum + cat._count.category, 0)
    const formattedCategoryData = categoryDistribution.map((cat, index) => ({
      name: cat.category,
      value: totalProducts > 0 ? Math.round((cat._count.category / totalProducts) * 100) : 0,
      color: `hsl(${(index * 60) % 360}, 70%, 50%)`
    }))

    return NextResponse.json({
      keyMetrics: {
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
        totalCustomers: {
          value: currentCustomerCount,
          change: customerChange,
          trend: customerChange >= 0 ? "up" : "down"
        },
        productsSold: {
          value: topProducts.reduce((sum, p) => sum + (p._sum.quantity || 0), 0),
          change: 0,
          trend: "up"
        }
      },
      customerMetrics: {
        newCustomers: newCustomersThisMonth,
        returnRate: Math.round(returnRate),
        avgOrderValue: Math.round(avgOrderValue)
      },
      salesData: formattedMonthlySales,
      categoryData: formattedCategoryData,
      topProducts: formattedTopProducts,
      recentOrders: formattedRecentOrders,
      ordersByStatus: ordersByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      }))
    })

  } catch (error) {
    console.error("Analytics data fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching analytics data"
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}