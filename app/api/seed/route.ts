import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Check if products exist
    const count = await prisma.product.count()
    
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
        name: "DHT22 Temperature & Humidity Sensor",
        slug: "dht22-sensor",
        price: 249,
        originalPrice: 349,
        rating: 4.6,
        reviews: 567,
        image: "/dht22-temperature-humidity-sensor-white.jpg",
        category: "Sensors",
        categorySlug: "sensors",
        subcategory: "Temperature Sensors",
        subcategorySlug: "temperature-sensors",
        brand: "Aosong",
        badge: "Bestseller",
        inStock: true,
        description: "High precision digital temperature and humidity sensor.",
        specifications: JSON.stringify({
          "Temperature Range": "-40°C to 80°C",
          "Temperature Accuracy": "±0.5°C",
          "Humidity Range": "0-100% RH",
          "Humidity Accuracy": "±2% RH",
          Interface: "Single-wire digital",
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
      message: `Database seeded with ${products.length} products`,
      existingCount: count,
      products: products.map(p => ({ name: p.name, slug: p.slug }))
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    )
  }
}