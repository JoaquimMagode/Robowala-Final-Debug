import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const count = await prisma.product.count()
    
    if (count === 0) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 12)
      await prisma.user.upsert({
        where: { email: "admin@robowala.com" },
        update: {},
        create: {
          email: "admin@robowala.com",
          name: "Admin User",
          password: hashedPassword,
          role: "ADMIN",
        },
      })

      const products = [
        {
          name: "ESP32-WROOM-32 DevKit",
          slug: "esp32-wroom-32-devkit",
          price: 499,
          originalPrice: 699,
          rating: 4.8,
          reviews: 678,
          image: "/esp32-development-board-wifi-bluetooth-microcontro.jpg",
          category: "Microcontrollers",
          categorySlug: "microcontrollers",
          subcategory: "ESP32 Boards",
          subcategorySlug: "esp32",
          brand: "Espressif",
          badge: "Bestseller",
          inStock: true,
          description: "Powerful WiFi & Bluetooth enabled microcontroller for IoT projects.",
          specifications: JSON.stringify({
            CPU: "Dual-core Xtensa @ 240MHz",
            Flash: "4MB",
            RAM: "520KB SRAM",
            WiFi: "802.11 b/g/n",
            Bluetooth: "BLE 4.2",
            GPIO: "34 pins",
          }),
        },
        {
          name: "4WD Robot Car Chassis Kit",
          slug: "4wd-robot-car-kit",
          price: 1899,
          originalPrice: 2499,
          rating: 4.7,
          reviews: 234,
          image: "/4wd-robot-car-chassis-kit-arduino-compatible.jpg",
          category: "Learning Kits",
          categorySlug: "kits",
          subcategory: "Robotics Kits",
          subcategorySlug: "robotics-kits",
          brand: null,
          badge: "Kit",
          inStock: true,
          description: "Complete 4WD robot car chassis kit with motors and wheels.",
          specifications: JSON.stringify({
            Motors: "4x TT DC Motors",
            Wheels: "4x 65mm diameter",
            Material: "Acrylic",
            "Battery Holder": "4x AA (not included)",
            Dimensions: "200mm x 150mm",
          }),
        },
        {
          name: "2212 920KV Brushless Motor",
          slug: "2212-920kv-motor",
          price: 649,
          originalPrice: 849,
          rating: 4.7,
          reviews: 234,
          image: "/2212-brushless-motor.jpg",
          category: "Drone Parts",
          categorySlug: "drone-parts",
          subcategory: "Drone Motors",
          subcategorySlug: "drone-motors",
          brand: "Emax",
          badge: "Popular",
          inStock: true,
          description: "High-quality brushless motor for quadcopters and multirotors.",
          specifications: JSON.stringify({
            KV: "920",
            "Max Current": "15A",
            Voltage: "11.1V (3S)",
            Weight: "55g",
            "Shaft Diameter": "3.17mm",
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