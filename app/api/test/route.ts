import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const count = await prisma.product.count()
    const products = await prisma.product.findMany({ take: 3 })
    
    return NextResponse.json({
      success: true,
      productCount: count,
      sampleProducts: products.map(p => ({ id: p.id, name: p.name, price: p.price }))
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}