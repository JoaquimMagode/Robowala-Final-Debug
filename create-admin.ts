import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    console.log("🔍 Checking for admin user...")

    // Check if admin user exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@robowala.com" }
    })

    if (existingAdmin) {
      console.log("✅ Admin user already exists:")
      console.log(`   Email: ${existingAdmin.email}`)
      console.log(`   Role: ${existingAdmin.role}`)
      console.log(`   Name: ${existingAdmin.name}`)
      return
    }

    // Create admin user
    console.log("🔨 Creating admin user...")
    const hashedPassword = await bcrypt.hash("admin123", 12)

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@robowala.com",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN"
      }
    })

    console.log("✅ Admin user created successfully:")
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Role: ${adminUser.role}`)
    console.log(`   Name: ${adminUser.name}`)

    console.log("\n🎯 Login Instructions:")
    console.log("1. Go to /login")
    console.log("2. Use email: admin@robowala.com")
    console.log("3. Use password: admin123")
    console.log("4. After login, go to /admin/products")

  } catch (error) {
    console.error("❌ Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()