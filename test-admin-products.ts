import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function testAdminProductManagement() {
  try {
    console.log("🧪 Testing Admin Product Management...")

    // Test 1: Create a test product
    console.log("1. Creating test product...")
    const testProduct = await prisma.product.create({
      data: {
        name: "Test Arduino Uno R4 WiFi",
        slug: "test-arduino-uno-r4-wifi",
        price: 2499.99,
        originalPrice: 2999.99,
        discountPercent: 16.67,
        discountAmount: 500,
        image: "/products/arduino-uno-r4-wifi.jpg",
        images: JSON.stringify([
          "/products/arduino-uno-r4-wifi-1.jpg",
          "/products/arduino-uno-r4-wifi-2.jpg"
        ]),
        category: "Development Boards",
        categorySlug: "development-boards",
        subcategory: "Arduino",
        subcategorySlug: "arduino",
        brand: "Arduino",
        badge: "Best Seller",
        inStock: true,
        stock: 50,
        description: "The Arduino Uno R4 WiFi is the latest addition to the Arduino Uno family, featuring built-in WiFi connectivity and enhanced performance.",
        specifications: JSON.stringify({
          "Microcontroller": "Renesas RA4M1",
          "Operating Voltage": "5V",
          "Digital I/O Pins": "14",
          "Analog Input Pins": "6",
          "Flash Memory": "256 KB",
          "SRAM": "32 KB",
          "Clock Speed": "48 MHz",
          "WiFi": "ESP32-S3",
          "USB": "USB-C"
        }),
        datasheet: "https://docs.arduino.cc/hardware/uno-r4-wifi"
      }
    })
    console.log("✅ Test product created:", testProduct.name)

    // Test 2: Update the product
    console.log("2. Updating test product...")
    const updatedProduct = await prisma.product.update({
      where: { id: testProduct.id },
      data: {
        price: 2299.99,
        discountPercent: 23.33,
        stock: 45
      }
    })
    console.log("✅ Test product updated - New price:", updatedProduct.price)

    // Test 3: Fetch products with pagination
    console.log("3. Fetching products...")
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    })
    console.log(`✅ Fetched ${products.length} products`)

    // Test 4: Search products
    console.log("4. Searching products...")
    const searchResults = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: "Arduino" } },
          { description: { contains: "Arduino" } }
        ]
      }
    })
    console.log(`✅ Found ${searchResults.length} Arduino products`)

    // Test 5: Clean up - Delete test product
    console.log("5. Cleaning up test product...")
    await prisma.product.delete({
      where: { id: testProduct.id }
    })
    console.log("✅ Test product deleted")

    console.log("🎉 All admin product management tests passed!")

  } catch (error) {
    console.error("❌ Test failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testAdminProductManagement()