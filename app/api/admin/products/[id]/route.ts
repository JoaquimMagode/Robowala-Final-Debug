import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"
import { z } from "zod"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { id } = params

    const product = await prisma.product.findUnique({
      where: { id },
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

    const productWithParsedData = {
      ...product,
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      images: product.images ? JSON.parse(product.images) : [],
    }

    return NextResponse.json({
      product: productWithParsedData,
    })
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching the product",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin authentication
    const { error } = await requireAdmin()
    if (error) return error

    const { id } = params
    const body = await request.json()

    // Validation schema for product update (all fields optional for partial updates)
    const productUpdateSchema = z.object({
      name: z.string().min(1).optional(),
      price: z.number().positive().optional(),
      originalPrice: z.number().positive().optional(),
      discountPercent: z.number().min(0).max(100).optional(),
      discountAmount: z.number().min(0).optional(),
      rating: z.number().min(0).max(5).optional(),
      reviews: z.number().min(0).optional(),
      image: z.string().url().optional(),
      images: z.array(z.string().url()).optional(),
      category: z.string().min(1).optional(),
      categorySlug: z.string().min(1).optional(),
      subcategory: z.string().optional(),
      subcategorySlug: z.string().optional(),
      brand: z.string().optional(),
      badge: z.string().nullable().optional(),
      inStock: z.boolean().optional(),
      stock: z.number().min(0).optional(),
      description: z.string().min(1).optional(),
      specifications: z.record(z.string()).optional(),
      datasheet: z.string().url().optional(),
    })

    // Validate request body
    const validationResult = productUpdateSchema.safeParse(body)
    
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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Product not found",
        },
        { status: 404 }
      )
    }

    const data = validationResult.data

    // Prepare update data
    const updateData: any = { ...data }

    // If name is being updated, regenerate slug
    if (data.name) {
      const newSlug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      
      // Check if new slug conflicts with another product
      const slugConflict = await prisma.product.findFirst({
        where: {
          slug: newSlug,
          id: { not: id },
        },
      })

      if (slugConflict) {
        return NextResponse.json(
          {
            error: "ConflictError",
            message: "A product with a similar name already exists",
          },
          { status: 409 }
        )
      }

      updateData.slug = newSlug
    }

    // Generate category slug if category is updated
    if (data.category) {
      updateData.categorySlug = data.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }

    // Generate subcategory slug if subcategory is updated
    if (data.subcategory) {
      updateData.subcategorySlug = data.subcategory
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }

    // Convert specifications to JSON string if provided
    if (data.specifications) {
      updateData.specifications = JSON.stringify(data.specifications)
    }

    // Convert images array to JSON string if provided
    if (data.images) {
      updateData.images = JSON.stringify(data.images)
    }

    // Update product (only specified fields)
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    // Parse specifications and images back to objects for response
    const productWithParsedSpecs = {
      ...product,
      specifications: JSON.parse(product.specifications),
      images: product.images ? JSON.parse(product.images) : [],
    }

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product: productWithParsedSpecs,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while updating the product",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin authentication
    const { error } = await requireAdmin()
    if (error) return error

    const { id } = params

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Product not found",
        },
        { status: 404 }
      )
    }

    // Check if product is referenced in any orders
    const orderItems = await prisma.orderItem.findFirst({
      where: { productId: id },
    })

    if (orderItems) {
      return NextResponse.json(
        {
          error: "ConflictError",
          message: "Cannot delete product that exists in orders",
        },
        { status: 409 }
      )
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      {
        message: "Product deleted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while deleting the product",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
