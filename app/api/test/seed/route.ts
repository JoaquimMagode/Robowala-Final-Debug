import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const count = await prisma.product.count()
    
    if (count === 0) {
      const products = [
        {
          name: "F450 Quadcopter Frame Kit",
          slug: "f450-quadcopter-frame",
          price: 1299,
          originalPrice: 1699,
          rating: 4.6,
          reviews: 145,
          image: "/f450-quadcopter-frame.jpg",
          category: "Drone Parts",
          categorySlug: "drone-parts",
          subcategory: "Frames",
          subcategorySlug: "drone-frames",
          brand: "DJI",
          inStock: true,
          description: "Durable quadcopter frame kit with 450mm wheelbase, perfect for DIY drones.",
          specifications: JSON.stringify({
            Wheelbase: "450mm",
            Material: "Glass Fiber + Nylon",
            Weight: "282g"
          }),
        },
        {
          name: "LM2596 Buck Converter Module",
          slug: "lm2596-buck-converter",
          price: 89,
          originalPrice: 129,
          rating: 4.5,
          reviews: 678,
          image: "/lm2596-buck-converter.jpg",
          category: "Power Supply",
          categorySlug: "power-supply",
          subcategory: "Buck Converters",
          subcategorySlug: "buck-converters",
          brand: "Texas Instruments",
          inStock: true,
          description: "Adjustable step-down voltage regulator module.",
          specifications: JSON.stringify({
            "Input Voltage": "4.5V - 40V",
            "Output Voltage": "1.25V - 37V (adjustable)"
          }),
        }
      ]

      for (const product of products) {
        await prisma.product.create({ data: product })
      }

      return NextResponse.json({ 
        message: `Seeded ${products.length} products`,
        count: products.length 
      })
    }

    return NextResponse.json({ 
      message: "Database already has products",
      count 
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Database error", details: error.message },
      { status: 500 }
    )
  }
}