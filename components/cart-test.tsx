"use client"

import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/lib/auth-context"

export function CartTest() {
  const { addItem, items, getItemCount, total } = useCartStore()
  const { isAuthenticated } = useAuth()

  const testProduct = {
    id: "test-1",
    name: "Test Product",
    slug: "test-product",
    price: 100,
    originalPrice: 150,
    rating: 4.5,
    reviews: 10,
    image: "/placeholder.jpg",
    category: "Test",
    description: "Test product",
    inStock: true
  }

  const handleAddTest = () => {
    console.log("Adding test product...")
    addItem(testProduct, 1)
  }

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-bold mb-2">Cart Test</h3>
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <p>Items in cart: {getItemCount()}</p>
      <p>Total: ₹{total}</p>
      <button 
        onClick={handleAddTest}
        className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Add Test Product
      </button>
      <div className="mt-2">
        <h4 className="font-semibold">Cart Items:</h4>
        {items.map((item, index) => (
          <div key={index} className="text-sm">
            {item.product.name} x {item.quantity}
          </div>
        ))}
      </div>
    </div>
  )
}