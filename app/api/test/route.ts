import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const productCount = await prisma.product.count()
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      products: productCount,
      users: userCount,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20)
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20)
      }
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}