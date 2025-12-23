import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAuth, getUserId } from "@/lib/auth-helpers"
import { z } from "zod"

export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()
    const { itemId } = params
    const body = await request.json()

    // Validation schema
    const updateQuantitySchema = z.object({
      quantity: z.number().int().positive("Quantity must be positive"),
    })

    const validationResult = updateQuantitySchema.safeParse(body)

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

    const { quantity } = validationResult.data

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
    })

    if (!cartItem) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Cart item not found",
        },
        { status: 404 }
      )
    }

    if (cartItem.userId !== userId) {
      return NextResponse.json(
        {
          error: "AuthorizationError",
          message: "You don't have permission to modify this cart item",
        },
        { status: 403 }
      )
    }

    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: true,
      },
    })

    // Parse specifications
    const itemWithParsedSpecs = {
      ...updatedItem,
      product: {
        ...updatedItem.product,
        specifications: JSON.parse(updatedItem.product.specifications),
      },
    }

    return NextResponse.json(
      {
        message: "Cart item updated successfully",
        item: itemWithParsedSpecs,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Update cart item error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while updating the cart item",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    // Require authentication
    const { error } = await requireAuth()
    if (error) return error

    const userId = await getUserId()
    const { itemId } = params

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
    })

    if (!cartItem) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Cart item not found",
        },
        { status: 404 }
      )
    }

    if (cartItem.userId !== userId) {
      return NextResponse.json(
        {
          error: "AuthorizationError",
          message: "You don't have permission to delete this cart item",
        },
        { status: 403 }
      )
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json(
      {
        message: "Cart item removed successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete cart item error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while removing the cart item",
      },
      { status: 500 }
    )
  }
}
