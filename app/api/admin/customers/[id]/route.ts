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
        email: true,
        createdAt: true,
        _count: {
          select: {
            orders: true
          }
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            total: true,
            status: true,
            createdAt: true
          },
          orderBy: {
            createdAt: "desc"
          }
        }
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

    return NextResponse.json({
      customer
    })
  } catch (error) {
    console.error("Customer fetch error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while fetching the customer"
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}