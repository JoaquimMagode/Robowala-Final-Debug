import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth

export const config = {

  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/cart/:path*",
    "/api/orders/:path*",
    "/checkout",
    "/orders/:path*",
  ],
}
