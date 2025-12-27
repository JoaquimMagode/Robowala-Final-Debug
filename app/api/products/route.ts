import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    
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
    
    if (category) {
      where.categorySlug = category
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    // Get total count for pagination
    const total = await prisma.product.count({ where })

    // Get products with pagination
    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })

    // Parse specifications and images
    const productsWithParsedData = products.map((product) => ({
      ...product,
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      images: product.images ? JSON.parse(product.images) : [],
    }))

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)
    const hasMore = page < totalPages

    return NextResponse.json(
      {
        products: productsWithParsedData,
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
    console.error("Products fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching products",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  const { requireAdmin } = await import("@/lib/auth-helpers")
  const { z } = await import("zod")
  
  try {
    // Require admin authentication
    const { error, user } = await requireAdmin()
    if (error) return error

    const body = await request.json()

    // Validation schema for product creation
    const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.number().positive("Price must be positive"),
      originalPrice: z.number().positive("Original price must be positive"),
      rating: z.number().min(0).max(5).default(0),
      reviews: z.number().min(0).default(0),
      image: z.string().url("Image must be a valid URL"),
      category: z.string().min(1, "Category is required"),
      categorySlug: z.string().min(1, "Category slug is required"),
      badge: z.string().nullable().optional(),
      inStock: z.boolean().default(true),
      description: z.string().min(1, "Description is required"),
      specifications: z.record(z.string()),
    })

    // Validate request body
    const validationResult = productSchema.safeParse(body)
    
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

    const data = validationResult.data

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    })

    if (existingProduct) {
      return NextResponse.json(
        {
          error: "ConflictError",
          message: "A product with a similar name already exists",
        },
        { status: 409 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        specifications: JSON.stringify(data.specifications),
      },
    })

    // Parse specifications back to object for response
    const productWithParsedSpecs = {
      ...product,
      specifications: JSON.parse(product.specifications),
    }

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: productWithParsedSpecs,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while creating the product",
      },
      { status: 500 }
    )
  }
}
