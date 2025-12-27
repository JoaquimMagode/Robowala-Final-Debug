import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Add missing columns to products table
    await prisma.$executeRaw`
      ALTER TABLE "Product" 
      ADD COLUMN IF NOT EXISTS "discountPercent" DOUBLE PRECISION,
      ADD COLUMN IF NOT EXISTS "discountAmount" DOUBLE PRECISION,
      ADD COLUMN IF NOT EXISTS "images" TEXT,
      ADD COLUMN IF NOT EXISTS "stock" INTEGER DEFAULT 0
    `

    // Update password field to be nullable
    await prisma.$executeRaw`
      ALTER TABLE "User" 
      ALTER COLUMN "password" DROP NOT NULL
    `

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