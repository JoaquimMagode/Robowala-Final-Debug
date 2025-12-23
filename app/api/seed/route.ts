import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const products = [
      {
        name: "Arduino Starter Kit for Beginners",
        slug: "arduino-starter-kit",
        price: 2499,
        originalPrice: 2999,
        rating: 4.8,
        reviews: 456,
        image: "/arduino-starter-kit.jpg",
        category: "Learning Kits",
        categorySlug: "kits",
        subcategory: "Arduino Kits",
        subcategorySlug: "arduino-kits-learning",
        brand: "Arduino",
        badge: "Bestseller",
        inStock: true,
        description: "Complete Arduino starter kit with UNO board and 30+ components.",
        specifications: JSON.stringify({
          Includes: "Arduino UNO R3, Breadboard, LEDs, Resistors, Sensors, Motors, etc.",
          Components: "30+ items",
          Projects: "15 guided projects",
          Manual: "Included",
        }),
      },
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
      }
    ]

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
    }

    return NextResponse.json({ 
      message: `Created ${products.length} products`,
      products: products.map(p => p.name)
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed to create products", details: error.message },
      { status: 500 }
    )
  }
}