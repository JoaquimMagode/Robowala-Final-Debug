import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const { error } = await requireAdmin()
    if (error) return error

    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    
    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid pagination parameters",
        },
        { status: 400 }
      )
    }

    // Build where clause for filtering
    const where: any = {}
    
    if (status) {
      where.status = status
    }

    // Get total count for pagination
    const total = await prisma.order.count({ where })

    // Get orders with pagination
    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    // Parse shipping address and product specifications
    const ordersWithParsedData = orders.map((order) => ({
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      paymentMethod: order.paymentMethod || "COD",
      paymentStatus: order.paymentStatus || "PENDING",
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          specifications: item.product.specifications ? JSON.parse(item.product.specifications) : {},
        },
      })),
    }))

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)
    const hasMore = page < totalPages

    return NextResponse.json(
      {
        orders: ordersWithParsedData,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Admin orders fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching orders",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
