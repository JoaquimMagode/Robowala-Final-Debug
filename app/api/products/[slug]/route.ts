import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Find product by slug
    const product = await prisma.product.findUnique({
      where: { slug },
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

    // Parse specifications from JSON string
    const productWithParsedSpecs = {
      ...product,
      specifications: JSON.parse(product.specifications),
    }

    return NextResponse.json(
      {
        product: productWithParsedSpecs,
      },
      { status: 200 }
    )
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
