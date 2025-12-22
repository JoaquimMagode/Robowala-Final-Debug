import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signIn } from "@/lib/auth"

const prisma = new PrismaClient()

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validationResult = loginSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid input data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: "AuthenticationError",
          message: "Invalid email or password",
        },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "AuthenticationError",
          message: "Invalid email or password",
        },
        { status: 401 }
      )
    }

    // Sign in with NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred during login",
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
