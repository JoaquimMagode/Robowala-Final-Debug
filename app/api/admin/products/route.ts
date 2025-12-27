import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"
import { z } from "zod"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const body = await request.json()

    const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.number().positive("Price must be positive"),
      originalPrice: z.number().positive("Original price must be positive"),
      discountPercent: z.number().min(0).max(100).optional(),
      discountAmount: z.number().min(0).optional(),
      image: z.string().url("Valid image URL required"),
      images: z.array(z.string().url()).optional(),
      category: z.string().min(1, "Category is required"),
      subcategory: z.string().optional(),
      brand: z.string().optional(),
      badge: z.string().optional(),
      inStock: z.boolean().default(true),
      stock: z.number().min(0).default(0),
      description: z.string().min(1, "Description is required"),
      specifications: z.record(z.string()).default({}),
      datasheet: z.string().url().optional(),
    })

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
          message: "A product with this name already exists",
        },
        { status: 409 }
      )
    }

    // Generate category slug
    const categorySlug = data.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    // Generate subcategory slug if provided
    const subcategorySlug = data.subcategory
      ? data.subcategory
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : null

    // Create product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        price: data.price,
        originalPrice: data.originalPrice,
        discountPercent: data.discountPercent,
        discountAmount: data.discountAmount,
        image: data.image,
        images: data.images ? JSON.stringify(data.images) : null,
        category: data.category,
        categorySlug,
        subcategory: data.subcategory,
        subcategorySlug,
        brand: data.brand,
        badge: data.badge,
        inStock: data.inStock,
        stock: data.stock,
        description: data.description,
        specifications: JSON.stringify(data.specifications),
        datasheet: data.datasheet,
      },
    })

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: {
          ...product,
          specifications: JSON.parse(product.specifications),
          images: product.images ? JSON.parse(product.images) : [],
        },
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
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    if (category) {
      where.categorySlug = category
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ])

    const productsWithParsedData = products.map((product) => ({
      ...product,
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      images: product.images ? JSON.parse(product.images) : [],
    }))

    return NextResponse.json({
      products: productsWithParsedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
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