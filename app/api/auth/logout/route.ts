import { NextRequest, NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Sign out using NextAuth
    await signOut({ redirect: false })

    return NextResponse.json(
      {
        message: "Logout successful",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred during logout",
      },
      { status: 500 }
    )
  }
}
