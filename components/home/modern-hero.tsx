"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Cpu, Wifi, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const floatingIcons = [
  { Icon: Cpu, delay: 0, position: "top-20 left-10" },
  { Icon: Wifi, delay: 0.5, position: "top-40 right-20" },
  { Icon: Zap, delay: 1, position: "bottom-32 left-20" },
]

export function ModernHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

      {/* Gradient Orb */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={cn("absolute hidden animate-bounce opacity-20 md:block", position)}
          style={{ animationDelay: `${delay}s`, animationDuration: "3s" }}
        >
          <Icon className="h-12 w-12 text-primary" />
        </div>
      ))}

      <div className="container relative z-10 mx-auto flex min-h-[90vh] items-center px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
            )}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary">NEW: ESP32-S3 DevKit Now Available</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Build the Future
              <br />
              <span className="text-primary">One Component</span>
              <br />
              at a Time
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              India's premier destination for IoT components, robotics kits, and development boards. Quality parts for
              makers, students, and professionals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Makers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24hr</p>
                <p className="text-sm text-muted-foreground">Shipping</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div
            className={cn(
              "relative transition-all delay-300 duration-1000",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
            )}
          >
            <div className="relative aspect-square">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl border border-border bg-secondary/50 p-8">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-background">
                  <img
                    src="/arduino-esp32-development-board-with-sensors-and-l.jpg"
                    alt="IoT Development Board with Sensors"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 rounded-lg border border-border bg-card p-3 shadow-lg">
                <p className="text-xs font-medium text-muted-foreground">Free Shipping</p>
                <p className="text-sm font-bold text-primary">Orders ₹499+</p>
              </div>

              <div className="absolute -right-4 bottom-1/4 rounded-lg border border-border bg-card p-3 shadow-lg">
                <p className="text-xs font-medium text-muted-foreground">Same Day</p>
                <p className="text-sm font-bold text-foreground">Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--secondary)"
          />
        </svg>
      </div>
    </section>
  )
}
