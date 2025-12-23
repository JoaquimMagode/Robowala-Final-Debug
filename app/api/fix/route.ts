import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const missingProducts = [
      {
        name: "L298N Dual H-Bridge Motor Driver",
        slug: "l298n-motor-driver",
        price: 179,
        originalPrice: 249,
        rating: 4.5,
        reviews: 678,
        image: "/l298n-motor-driver-module-red-pcb.jpg",
        category: "Motors & Drivers",
        categorySlug: "motors",
        subcategory: "Motor Drivers",
        subcategorySlug: "motor-drivers",
        brand: "STMicroelectronics",
        badge: "Bestseller",
        inStock: true,
        description: "Dual H-Bridge motor driver module for controlling DC motors and stepper motors.",
        specifications: JSON.stringify({
          Channels: "2",
          "Max Current": "2A per channel",
          "Peak Current": "3A per channel",
          "Input Voltage": "5V - 35V",
          "Logic Voltage": "5V",
        }),
      },
      {
        name: "MASTECH MS8233D Digital Multimeter",
        slug: "mastech-ms8233d",
        price: 899,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 234,
        image: "/mastech-ms8233d-multimeter.jpg",
        category: "Tools & Equipment",
        categorySlug: "tools",
        subcategory: "Multimeters",
        subcategorySlug: "multimeters",
        brand: "MASTECH",
        badge: "Popular",
        inStock: true,
        description: "Professional digital multimeter with auto-ranging and backlight.",
        specifications: JSON.stringify({
          "DC Voltage": "600V",
          "AC Voltage": "600V",
          "DC Current": "10A",
          "AC Current": "10A",
          Resistance: "60MΩ",
          Features: "Auto-ranging, Backlight, Data hold",
        }),
      },
      {
        name: "60W Soldering Iron Kit",
        slug: "60w-soldering-kit",
        price: 599,
        originalPrice: 799,
        rating: 4.6,
        reviews: 345,
        image: "/60w-soldering-iron-kit.jpg",
        category: "Tools & Equipment",
        categorySlug: "tools",
        subcategory: "Soldering Equipment",
        subcategorySlug: "soldering",
        brand: null,
        badge: null,
        inStock: true,
        description: "Complete soldering iron kit with stand, solder wire, and accessories.",
        specifications: JSON.stringify({
          Power: "60W",
          "Temperature Range": "200°C - 450°C",
          Includes: "Iron, Stand, Solder wire, Tips, Desoldering pump",
          "Tip Type": "Replaceable",
        }),
      }
    ]

    for (const product of missingProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
    }

    return NextResponse.json({ 
      message: `Created missing products`,
      products: missingProducts.map(p => p.slug)
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed", details: error.message },
      { status: 500 }
    )
  }
}