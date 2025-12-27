import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { z } from "zod"

async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }
  return { session }
}

async function getUserId() {
  const session = await auth()
  return (session?.user as any)?.id
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()
    const body = await request.json()

    // Validation schema
    const createOrderSchema = z.object({
      shippingAddress: z.object({
        name: z.string().min(1, "Name is required"),
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        pincode: z.string().min(1, "PIN code is required"),
        phone: z.string().min(1, "Phone is required"),
      }),
    })

    const validationResult = createOrderSchema.safeParse(body)

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

    const { shippingAddress } = validationResult.data

    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    })

    if (cartItems.length === 0) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Cart is empty",
        },
        { status: 400 }
      )
    }

    // Validate all products are in stock
    const outOfStockProducts = cartItems.filter((item) => !item.product.inStock)

    if (outOfStockProducts.length > 0) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Some products are out of stock",
          details: {
            outOfStockProducts: outOfStockProducts.map((item) => item.product.name),
          },
        },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    )
    const discount = cartItems.reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    )
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          subtotal,
          discount,
          total,
          status: "PENDING",
          shippingAddress: JSON.stringify(shippingAddress),
        },
      })

      // Create order items
      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price, // Snapshot price at time of order
        })),
      })

      // Clear user's cart
      await tx.cartItem.deleteMany({
        where: { userId },
      })

      // Fetch complete order with items
      return await tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    })

    if (!order) {
      throw new Error("Failed to create order")
    }

    // Parse shipping address and product specifications
    const orderWithParsedData = {
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          specifications: item.product.specifications ? JSON.parse(item.product.specifications) : {},
        },
      })),
    }

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: orderWithParsedData,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while creating the order",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Parse shipping address and product specifications
    const ordersWithParsedData = orders.map((order) => ({
      ...order,
      shippingAddress: JSON.parse(order.shippingAddress),
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          specifications: item.product.specifications ? JSON.parse(item.product.specifications) : {},
        },
      })),
    }))

    return NextResponse.json(
      {
        orders: ordersWithParsedData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Orders fetch error:", error)
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
