"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ProductForm } from "@/components/admin/product-form"
import { Loader2 } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discountPercent?: number
  discountAmount?: number
  image: string
  images: string[]
  category: string
  subcategory?: string
  brand?: string
  badge?: string
  inStock: boolean
  stock: number
  description: string
  specifications: Record<string, string>
  datasheet?: string
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [productId, setProductId] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ id }) => setProductId(id))
  }, [params])

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      router.push("/")
      return
    }

    if (isAuthenticated && user?.role === "ADMIN" && productId) {
      fetchProduct()
    }
  }, [isAuthenticated, user, authLoading, router, productId])

  const fetchProduct = async () => {
    if (!productId) {
      setError("Invalid product ID")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Product not found")
      }
      
      setProduct(data.product)
    } catch (err: any) {
      console.error("Product fetch error:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
        <p className="text-sm text-muted-foreground">Update product information</p>
      </div>

      <ProductForm productId={productId} initialData={product} />
    </div>
  )
}