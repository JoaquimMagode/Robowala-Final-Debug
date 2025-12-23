import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  products: [
    { href: "/products?category=development-boards", label: "Development Boards" },
    { href: "/products?category=sensors", label: "Sensors" },
    { href: "/products?category=motors", label: "Motors & Drivers" },
    { href: "/products?category=displays", label: "Displays" },
    { href: "/products?category=diy-kits", label: "DIY & Maker Kits" },
    { href: "/products?category=iot-wireless", label: "IoT & Wireless" },
  ],
  services: [
    { href: "/services/pcb", label: "PCB Manufacturing" },
    { href: "/services/3d-printing", label: "3D Printing" },
    { href: "/services/laser-cutting", label: "Laser Cutting" },
    { href: "/services/battery", label: "Custom Battery Pack" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },

  ],
  support: [
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns & Refunds" },
    { href: "/faq", label: "FAQ" },
    { href: "/track-order", label: "Track Order" },
    { href: "/bulk-enquiry", label: "Bulk Enquiry" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/image2.png" alt="ROBOWALA" width={200} height={72} className="h-16 w-auto" priority />
            </Link>
            <p className="mb-4 text-sm text-white/70">
              Your Ideas, Our Parts. India's leading e-commerce platform for IoT components and robotics.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:support@robowala.com"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-[#ff6a00]"
              >
                <Mail className="h-4 w-4" />
                support@robowala.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-[#ff6a00]"
              >
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4" />
                Mumbai, India
              </p>
            </div>
            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff6a00]"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff6a00]">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#ff6a00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff6a00]">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#ff6a00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff6a00]">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#ff6a00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff6a00]">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[#ff6a00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} ROBOWALA™. All rights reserved. | FUTURE IS HERE
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">We accept:</span>
            <div className="flex items-center gap-2">
              <div className="rounded bg-white/10 px-2 py-1 text-xs">UPI</div>
              <div className="rounded bg-white/10 px-2 py-1 text-xs">Cards</div>
              <div className="rounded bg-white/10 px-2 py-1 text-xs">NetBanking</div>
              <div className="rounded bg-white/10 px-2 py-1 text-xs">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
