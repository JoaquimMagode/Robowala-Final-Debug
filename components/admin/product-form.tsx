"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface ProductFormData {
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

interface ProductFormProps {
  productId?: string
  initialData?: Partial<ProductFormData>
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    images: [],
    category: "",
    inStock: true,
    stock: 0,
    description: "",
    specifications: {},
    ...initialData,
  })

  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (file: File, isPrimary = false) => {
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()

      if (isPrimary) {
        handleInputChange("image", url)
      } else {
        handleInputChange("images", [...formData.images, url])
      }

      toast.success("Image uploaded successfully")
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleInputChange("images", newImages)
  }

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      handleInputChange("specifications", {
        ...formData.specifications,
        [newSpecKey]: newSpecValue,
      })
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications }
    delete newSpecs[key]
    handleInputChange("specifications", newSpecs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products"
      const method = productId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save product")
      }

      toast.success(productId ? "Product updated successfully" : "Product created successfully")
      router.push("/admin/products")
    } catch (error: any) {
      toast.error(error.message || "Failed to save product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price (₹) *</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange("originalPrice", parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountPercent">Discount % (Optional)</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercent || ""}
                  onChange={(e) => handleInputChange("discountPercent", e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div>
                <Label htmlFor="discountAmount">Discount Amount (₹)</Label>
                <Input
                  id="discountAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discountAmount || ""}
                  onChange={(e) => handleInputChange("discountAmount", e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory || ""}
                  onChange={(e) => handleInputChange("subcategory", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand || ""}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={formData.badge || ""}
                  onChange={(e) => handleInputChange("badge", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="datasheet">Datasheet URL</Label>
              <Input
                id="datasheet"
                type="url"
                value={formData.datasheet || ""}
                onChange={(e) => handleInputChange("datasheet", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Primary Image *</Label>
            <div className="mt-2 flex items-center gap-4">
              {formData.image && (
                <img src={formData.image} alt="Primary" className="h-20 w-20 rounded-lg object-cover" />
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file, true)
                  }}
                  className="hidden"
                  id="primary-image"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("primary-image")?.click()}
                  disabled={imageUploading}
                >
                  {imageUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload Primary Image
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label>Additional Images</Label>
            <div className="mt-2 grid grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Additional ${index + 1}`} className="h-20 w-20 rounded-lg object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file, false)
                  }}
                  className="hidden"
                  id="additional-images"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-20 w-20"
                  onClick={() => document.getElementById("additional-images")?.click()}
                  disabled={imageUploading}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={6}
            required
          />
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Specification name"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
            />
            <Input
              placeholder="Value"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
            />
            <Button type="button" onClick={addSpecification}>
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border p-2">
                <span className="text-sm">
                  <strong>{key}:</strong> {value}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpecification(key)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {productId ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}