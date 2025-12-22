"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = "919876543210" // Replace with actual number
  const defaultMessage = "Hi! I'm interested in your IoT products."

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip/Popup */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-72 rounded-lg border border-border bg-card p-4 shadow-lg transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Need Help?</h4>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Chat with us on WhatsApp for quick support and product inquiries!
        </p>
        <Button onClick={handleWhatsAppClick} className="w-full bg-[#25D366] text-white hover:bg-[#20BD5A]">
          <MessageCircle className="mr-2 h-4 w-4" />
          Start Chat
        </Button>
      </div>

      {/* Main Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-foreground hover:bg-foreground/90" : "bg-[#25D366] hover:bg-[#20BD5A]",
        )}
      >
        {isOpen ? <X className="h-6 w-6 text-background" /> : <MessageCircle className="h-6 w-6 text-white" />}
        <span className="sr-only">WhatsApp Support</span>
      </Button>

      {/* Pulse Animation */}
      {!isOpen && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />}
    </div>
  )
}
