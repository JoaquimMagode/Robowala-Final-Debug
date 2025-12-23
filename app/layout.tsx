"use client"

import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { usePathname } from "next/navigation"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AIChatWidget } from "@/components/layout/ai-chat-widget"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AIChatWidget />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>ROBO WALA | Premium IoT & Robotics Store</title>
        <meta name="description" content="India's leading e-commerce platform for IoT components, robotics kits, sensors, and development boards." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6A00" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <Providers>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
          <SonnerToaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
