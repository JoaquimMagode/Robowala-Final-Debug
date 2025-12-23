import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

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

    // Parse specifications and fix image path
    const productWithParsedSpecs = {
      ...product,
      image: product.image?.startsWith('/') ? product.image : `/products/${product.image}`,
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
  }
}
