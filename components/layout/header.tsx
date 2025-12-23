"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Heart,
  Phone,
  ChevronDown,
  Cpu,
  Radio,
  Gauge,
  MonitorSmartphone,
  Cog,
  Package,
  Printer,
  Battery,
  Plane,
  Wrench,
  Car,
  CircuitBoard,
  User,
  LogOut,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/lib/auth-context"
import { MegaMenu } from "@/components/layout/mega-menu"
import { SearchAutocomplete } from "@/components/layout/search-autocomplete"

const categories = [
  { id: "development-boards", name: "Development Boards", icon: Cpu },
  { id: "drone-parts", name: "Drone Parts", icon: Plane },
  { id: "batteries", name: "Batteries & Power Supply", icon: Battery },
  { id: "3d-printing", name: "3D Printers and Parts", icon: Printer },
  { id: "sensors", name: "Sensors", icon: Gauge },
  { id: "electronic-components", name: "Electronic Components", icon: CircuitBoard },
  { id: "motors", name: "Motors | Drivers | Pumps", icon: Cog },
  { id: "displays", name: "Displays & Modules", icon: MonitorSmartphone },
  { id: "iot-wireless", name: "IoT and Wireless", icon: Radio },
  { id: "tools", name: "Tools & Workbench", icon: Wrench },
  { id: "diy-kits", name: "DIY & Maker Kits", icon: Package },
  { id: "ev-parts", name: "Electric Vehicle Parts", icon: Car },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/bulk-enquiry", label: "Bulk Enquiry" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/blog", label: "Blogs" },
  { href: "/about", label: "About Us" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getItemCount, total, items } = useCartStore((state) => ({
    getItemCount: state.getItemCount,
    total: state.total,
    items: state.items
  }))
  const { isAuthenticated, user, isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Force re-render when cart items change
  const itemCount = mounted ? getItemCount() : 0
  const totalPrice = mounted ? total : 0

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="border-b border-border bg-secondary">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Phone className="h-3 w-3" />
              <span>+91 98765 43210</span>
            </a>
            <Link href="/support" className="text-muted-foreground hover:text-foreground">
              Customer Support
            </Link>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/orders" className="text-muted-foreground hover:text-foreground">
              My Orders
            </Link>
            <Link href="/track-order" className="text-muted-foreground hover:text-foreground">
              Track your order
            </Link>
            <Link href="/account" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              My Account <ChevronDown className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/image.png" alt="ROBOWALA" width={200} height={72} className="h-16 w-auto" priority />
          </Link>

          <div className="hidden flex-1 max-w-xl mx-8 md:block">
            <SearchAutocomplete />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden h-10 w-10 md:flex" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            <Link href="/cart" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6a00] text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden text-sm font-medium md:block">₹ {totalPrice.toFixed(2)}</span>
            </Link>

            {/* User Menu */}
            {mounted && !isLoading && (
              <>
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hidden md:flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">{user?.name || user?.email}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-border md:block">
        <div className="container mx-auto flex items-center px-4">
          {/* All Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="flex h-12 items-center gap-2 bg-primary px-5 text-sm font-medium text-primary-foreground">
              <Menu className="h-4 w-4" />
              All Categories
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Categories Dropdown */}
            {isCategoryOpen && (
              <div className="absolute left-0 top-full z-50 w-64 border border-border bg-card shadow-lg">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-12 items-center px-4 text-sm font-medium text-foreground hover:text-[#ff6a00]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side links */}
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/careers"
              className="flex h-12 items-center gap-1 px-3 text-sm font-medium text-foreground hover:text-[#ff6a00]"
            >
              Careers
            </Link>

          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <MegaMenu />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          {/* Mobile Search */}
          <div className="mb-4">
            <SearchAutocomplete />
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <p className="px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">Categories</p>
            {categories.slice(0, 6).map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {category.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
