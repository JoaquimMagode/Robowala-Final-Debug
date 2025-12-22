import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAuth, getUserId } from "@/lib/auth-helpers"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()
    const { id } = await params

    // Get order with items
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Order not found",
        },
        { status: 404 }
      )
    }

    // Verify order belongs to user
    if (order.userId !== userId) {
      return NextResponse.json(
        {
          error: "AuthorizationError",
          message: "You don't have permission to view this order",
        },
        { status: 403 }
      )
    }

    // Parse shipping address and product specifications
    const orderWithParsedData = {
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          specifications: JSON.parse(item.product.specifications),
        },
      })),
    }

    return NextResponse.json(
      {
        order: orderWithParsedData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching the order",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
