// API Client for making requests to the backend

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: any
  ) {
    super(message)
    this.name = "APIError"
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new APIError(
        data.message || "An error occurred",
        response.status,
        data.details
      )
    }

    return data
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError("Network error occurred", 500)
  }
}

// Products API
export const productsAPI = {
  list: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)
    
    const query = searchParams.toString()
    return fetchAPI<{
      products: any[]
      pagination: any
    }>(`/api/products${query ? `?${query}` : ""}`)
  },

  getBySlug: (slug: string) => {
    return fetchAPI<{ product: any }>(`/api/products/${slug}`)
  },

  create: (data: any) => {
    return fetchAPI<{ product: any }>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: (id: string, data: any) => {
    return fetchAPI<{ product: any }>(`/api/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: (id: string) => {
    return fetchAPI<{ message: string }>(`/api/admin/products/${id}`, {
      method: "DELETE",
    })
  },
}

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name?: string }) => {
    return fetchAPI<{ user: any }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  login: (data: { email: string; password: string }) => {
    return fetchAPI<{ user: any }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  logout: () => {
    return fetchAPI<{ message: string }>("/api/auth/logout", {
      method: "POST",
    })
  },
}

// Cart API
export const cartAPI = {
  get: () => {
    return fetchAPI<{
      items: any[]
      subtotal: number
      discount: number
      total: number
    }>("/api/cart")
  },

  add: (data: { productId: string; quantity: number }) => {
    return fetchAPI<{ item: any }>("/api/cart", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateQuantity: (itemId: string, quantity: number) => {
    return fetchAPI<{ item: any }>(`/api/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })
  },

  removeItem: (itemId: string) => {
    return fetchAPI<{ message: string }>(`/api/cart/${itemId}`, {
      method: "DELETE",
    })
  },

  clear: () => {
    return fetchAPI<{ message: string }>("/api/cart", {
      method: "DELETE",
    })
  },
}

// Orders API
export const ordersAPI = {
  create: (data: { shippingAddress: any }) => {
    return fetchAPI<{ order: any }>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  list: () => {
    return fetchAPI<{ orders: any[] }>("/api/orders")
  },

  getById: (id: string) => {
    return fetchAPI<{ order: any }>(`/api/orders/${id}`)
  },
}

// Admin Orders API
export const adminOrdersAPI = {
  list: (params?: { status?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set("status", params.status)
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    
    const query = searchParams.toString()
    return fetchAPI<{
      orders: any[]
      pagination: any
    }>(`/api/admin/orders${query ? `?${query}` : ""}`)
  },

  updateStatus: (id: string, status: string) => {
    return fetchAPI<{ order: any }>(`/api/admin/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  },
}

// Upload API
export const uploadAPI = {
  image: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new APIError(
        data.message || "Upload failed",
        response.status,
        data.details
      )
    }

    return data as { url: string }
  },
}

export { APIError }
