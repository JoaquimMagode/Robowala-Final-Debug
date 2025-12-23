import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

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

    // Parse specifications safely
    let specifications = {}
    try {
      specifications = product.specifications ? JSON.parse(product.specifications) : {}
    } catch (parseError) {
      console.error("Failed to parse specifications:", parseError)
      specifications = {}
    }

    // Fix image path
    let imagePath = product.image
    if (imagePath && !imagePath.startsWith('http')) {
      if (!imagePath.startsWith('/')) {
        imagePath = `/${imagePath}`
      }
    }
    
    const productWithParsedSpecs = {
      ...product,
      image: imagePath || '/placeholder.svg',
      specifications,
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
