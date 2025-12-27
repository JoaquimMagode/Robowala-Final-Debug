import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AIChatWidget } from "@/components/layout/ai-chat-widget"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { LayoutWrapper } from "@/components/layout-wrapper"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "ROBO WALA | Premium IoT & Robotics Store",
  description: "India's leading e-commerce platform for IoT components, robotics kits, sensors, and development boards.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
          <SonnerToaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
