import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { requireAdmin } from "@/lib/auth-helpers"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    const { id } = params

    const customer = await prisma.user.findUnique({
      where: { 
        id,
        role: "USER"
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!customer) {
      return NextResponse.json(
        {
          error: "NotFoundError",
          message: "Customer not found"
        },
        { status: 404 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: id
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        total: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            quantity: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      customer,
      orders
    })
  } catch (error) {
    console.error("Customer orders fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching customer orders"
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}