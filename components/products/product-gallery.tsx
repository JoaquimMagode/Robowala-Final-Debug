"use client"

import { useState } from "react"
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Use product image or fallback
  const images = [product.image || "/placeholder.svg"]

  console.log('Product gallery rendering:', { productName: product.name, image: product.image })

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary">
        {/* Badge */}
        {product.badge && (
          <div className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            {product.badge}
          </div>
        )}

        {/* Image */}
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          className={cn(
            "h-full w-full cursor-zoom-in object-cover transition-transform duration-300",
            isZoomed && "scale-150",
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 h-10 w-10 rounded-full"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "h-20 w-20 overflow-hidden rounded-lg border-2 transition-all",
                selectedImage === index ? "border-primary" : "border-border hover:border-muted-foreground",
              )}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
