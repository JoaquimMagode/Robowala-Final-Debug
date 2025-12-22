import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

/**
 * Get the authenticated user from the session
 * Returns the user or null if not authenticated
 */
export async function getAuthUser() {
  const session = await auth()
  return session?.user || null
}

/**
 * Require authentication for an API route
 * Returns the user if authenticated, or an error response if not
 */
export async function requireAuth() {
  const user = await getAuthUser()
  
  if (!user) {
    return {
      error: NextResponse.json(
        {
          error: "AuthenticationError",
          message: "Authentication required. Please log in.",
        },
        { status: 401 }
      ),
      user: null,
    }
  }
  
  return { error: null, user }
}

/**
 * Require admin role for an API route
 * Returns the user if authenticated and admin, or an error response if not
 */
export async function requireAdmin() {
  const { error, user } = await requireAuth()
  
  if (error) {
    return { error, user: null }
  }
  
  if ((user as any).role !== "ADMIN") {
    return {
      error: NextResponse.json(
        {
          error: "AuthorizationError",
          message: "Admin access required.",
        },
        { status: 403 }
      ),
      user: null,
    }
  }
  
  return { error: null, user }
}

/**
 * Get user ID from session
 * Throws error if not authenticated
 */
export async function getUserId(): Promise<string> {
  const user = await getAuthUser()
  
  if (!user || !(user as any).id) {
    throw new Error("User not authenticated")
  }
  
  return (user as any).id
}
