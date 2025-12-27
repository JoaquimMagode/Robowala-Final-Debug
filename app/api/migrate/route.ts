import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Add missing columns one by one
    try {
      await prisma.$executeRaw`ALTER TABLE "Product" ADD COLUMN "discountPercent" DOUBLE PRECISION`
    } catch (e) { console.log("discountPercent already exists") }
    
    try {
      await prisma.$executeRaw`ALTER TABLE "Product" ADD COLUMN "discountAmount" DOUBLE PRECISION`
    } catch (e) { console.log("discountAmount already exists") }
    
    try {
      await prisma.$executeRaw`ALTER TABLE "Product" ADD COLUMN "images" TEXT`
    } catch (e) { console.log("images already exists") }
    
    try {
      await prisma.$executeRaw`ALTER TABLE "Product" ADD COLUMN "stock" INTEGER DEFAULT 0`
    } catch (e) { console.log("stock already exists") }

    try {
      await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL`
    } catch (e) { console.log("password already nullable") }

    return NextResponse.json({ 
      message: "Database migration completed successfully" 
    })
  } catch (error) {
    console.error("Migration error:", error)
    return NextResponse.json(
      { 
        error: "Migration failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}