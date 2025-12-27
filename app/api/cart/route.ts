import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAuth, getUserId } from "@/lib/auth-helpers"
import { auth } from "@/lib/auth"
import { z } from "zod"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check authentication but don't require it
    const { error } = await requireAuth()
    if (error) {
      // Return empty cart for unauthenticated users
      return NextResponse.json(
        {
          items: [],
          subtotal: 0,
          discount: 0,
          total: 0,
        },
        { status: 200 }
      )
    }

    const userId = await getUserId()

    // Get cart items with product details
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Parse specifications and calculate totals
    const items = cartItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        ...item.product,
        specifications: JSON.parse(item.product.specifications),
      },
    }))

    // Calculate cart totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    )
    const discount = items.reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    )
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    return NextResponse.json(
      {
        items,
        subtotal,
        discount,
        total,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Cart fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching the cart",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()
    const body = await request.json()

    // Validation schema
    const addToCartSchema = z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().int().positive("Quantity must be positive").default(1),
    })

    const validationResult = addToCartSchema.safeParse(body)

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

    const { productId, quantity } = validationResult.data

    // Check if user exists in database, create if not
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      // Get user info from session to create database record
      const session = await auth()
      if (!session?.user) {
        return NextResponse.json(
          {
            error: "AuthenticationError",
            message: "Invalid session",
          },
          { status: 401 }
        )
      }

      // Create user record in database
      user = await prisma.user.create({
        data: {
          id: userId,
          email: session.user.email!,
          name: session.user.name || session.user.email!,
          role: "USER",
        },
      })
    }

    // Check if product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Product not found",
        },
        { status: 404 }
      )
    }

    if (!product.inStock) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Product is out of stock",
        },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })

    let cartItem

    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
        include: {
          product: true,
        },
      })
    }

    // Parse specifications
    const itemWithParsedSpecs = {
      ...cartItem,
      product: {
        ...cartItem.product,
        specifications: JSON.parse(cartItem.product.specifications),
      },
    }

    return NextResponse.json(
      {
        message: "Item added to cart successfully",
        item: itemWithParsedSpecs,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Add to cart error:", error)
    
    // Handle Prisma foreign key constraint errors
    if (error instanceof Error && error.message.includes('Foreign key constraint')) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid user or product reference. Please ensure you are logged in and the product exists.",
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while adding to cart",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()

    // Clear all cart items for user
    await prisma.cartItem.deleteMany({
      where: { userId },
    })

    return NextResponse.json(
      {
        message: "Cart cleared successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Clear cart error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while clearing the cart",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
