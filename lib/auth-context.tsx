"use client"

import { createContext, useContext, useEffect, useState, useMemo } from "react"
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

  const isAuth = status === "authenticated" && !!session?.user

  useEffect(() => {
    if (status === "loading") return

    setAuthenticated(isAuth)

    if (isAuth && !isInitialized) {
      fetchCart()
      setIsInitialized(true)
    } else if (!isAuth && isInitialized) {
      setIsInitialized(false)
    }
  }, [status, session, setAuthenticated, fetchCart, isInitialized, isAuth])

  const value = useMemo(() => ({
    isAuthenticated: isAuth,
    isLoading: status === "loading",
    user: session?.user || null,
  }), [isAuth, status, session?.user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}