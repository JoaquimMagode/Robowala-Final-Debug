"use client"

import Link from "next/link"
import Image from "next/image"
import { Cpu, Printer, Scissors, Battery, RefreshCw } from "lucide-react"

const prototypeServices = [
  { icon: Cpu, label: "PCB Manufacturing", href: "/services/pcb" },
  { icon: Printer, label: "3D Printing", href: "/services/3d-printing" },
  { icon: Scissors, label: "Laser Cutting", href: "/services/laser-cutting" },
  { icon: Battery, label: "Custom Battery Pack", href: "/services/battery" },
]

export function HeroBanner() {
  return (
    <section className="bg-background py-4">
      <div className="container mx-auto px-4">
        <div className="flex gap-4">
          <div className="hidden w-56 flex-shrink-0 lg:block">
            {/* Fast Prototyping Box */}
            <div className="rounded-lg bg-primary text-primary-foreground">
              <div className="border-b border-primary-foreground/20 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">FAST</p>
                <p className="text-lg font-bold">Prototyping</p>
              </div>
              <div className="py-2">
                {prototypeServices.map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-foreground/10"
                    >
                      <Icon className="h-4 w-4" />
                      {service.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Refurbished Products Link */}
            <Link
              href="/products?condition=refurbished"
              className="mt-3 flex items-center gap-3 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4 text-green-600" />
              Refurbished Products
            </Link>
          </div>

          <div className="flex-1">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f]">
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 text-white md:px-12">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider opacity-80">New Arrival</p>
                  <h1 className="mb-3 text-2xl font-bold md:text-4xl">ESP32-S3 DevKit</h1>
                  <p className="mb-4 max-w-md text-sm opacity-90 md:text-base">
                    Powerful dual-core processor with WiFi & Bluetooth 5.0. Perfect for your next IoT project.
                  </p>
                  <Link
                    href="/products/esp32-devkit"
                    className="inline-block rounded bg-[#ff6a00] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e55f00]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 pr-8 lg:block">
                <Image
                  src="/esp32-development-board-wifi-bluetooth-microcontro.jpg"
                  alt="ESP32-S3 DevKit"
                  width={280}
                  height={280}
                  className="rounded-lg object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
