"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-[#1e3a5f] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6a00]">
            <Mail className="h-6 w-6 text-white" />
          </div>

          {/* Headline */}
          <h2 className="mb-2 text-2xl font-bold">Stay Updated</h2>
          <p className="mb-6 text-sm text-white/70">
            Subscribe to our newsletter for exclusive deals, new product launches, and maker tutorials.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 rounded-lg bg-white/10 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6a00]">
                <Check className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm font-medium">Thanks for subscribing! Check your inbox soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 w-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#ff6a00] sm:max-w-xs"
              />
              <Button type="submit" className="h-10 bg-[#ff6a00] text-white hover:bg-[#e55f00]">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-white/50">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
