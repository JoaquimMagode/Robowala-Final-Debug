"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

interface ProductTabsProps {
  product: Product
}

const tabs = ["Description", "Specifications", "Reviews"]

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Description")

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors",
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "Description" && (
          <div className="prose max-w-none text-muted-foreground">
            <p>{product.description}</p>
            <h4 className="mt-4 font-semibold text-foreground">Features:</h4>
            <ul className="mt-2 space-y-2">
              <li>High-quality components for reliable performance</li>
              <li>Compatible with Arduino, ESP32, and Raspberry Pi</li>
              <li>Comprehensive documentation and tutorials available</li>
              <li>Perfect for both beginners and professionals</li>
            </ul>
            <h4 className="mt-4 font-semibold text-foreground">Package Contents:</h4>
            <ul className="mt-2 space-y-2">
              <li>1x {product.name}</li>
              <li>Documentation / Quick Start Guide</li>
              <li>Anti-static packaging</li>
            </ul>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-6">
            {/* Reviews Summary */}
            <div className="flex flex-col items-center gap-4 rounded-lg bg-secondary p-6 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground">/ 5</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{product.reviews} reviews</p>
              </div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-3 text-sm text-muted-foreground">{star}</span>
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                {
                  name: "Rahul M.",
                  rating: 5,
                  date: "2 weeks ago",
                  comment: "Excellent quality product! Works perfectly with my Arduino projects. Fast delivery too.",
                },
                {
                  name: "Priya S.",
                  rating: 4,
                  date: "1 month ago",
                  comment: "Good product, well packaged. Documentation could be better but overall satisfied.",
                },
              ].map((review, index) => (
                <div key={index} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.name}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
