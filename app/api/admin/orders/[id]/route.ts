import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"
import { z } from "zod"

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    const { error } = await requireAdmin()
    if (error) return error

    const { id } = await params
    const body = await request.json()

    // Validation schema
    const updateOrderSchema = z.object({
      status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
    })

    const validationResult = updateOrderSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid input data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { status } = validationResult.data

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    })

    if (!existingOrder) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Order not found",
        },
        { status: 404 }
      )
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id },
      data: { status },
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
    })

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
        message: "Order status updated successfully",
        order: orderWithParsedData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while updating the order",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
