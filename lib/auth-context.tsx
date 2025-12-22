"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "./cart-store"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const setAuthenticated = useCartStore((state) => state.setAuthenticated)
  const fetchCart = useCartStore((state) => state.fetchCart)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    const isAuth = status === "authenticated" && !!session?.user
    setAuthenticated(isAuth)

    if (isAuth && !isInitialized) {
      fetchCart()
      setIsInitialized(true)
    } else if (!isAuth && isInitialized) {
      setIsInitialized(false)
    }
  }, [status, session, setAuthenticated, fetchCart, isInitialized])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: status === "authenticated" && !!session?.user,
        isLoading: status === "loading",
        user: session?.user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}