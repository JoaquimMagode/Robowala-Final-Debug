"use client"

import Link from "next/link"
import { Package, MapPin, CreditCard, Settings, LogOut, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function AccountPage() {
    const { user, isAuthenticated, logout } = useAuth()

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                <p className="text-muted-foreground mb-6">You need to be logged in to view your account dashboard.</p>
                <Button asChild>
                    <Link href="/login">Go to Login</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <UserIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Hello, {user?.name || "User"}!</h1>
                        <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Orders */}
                    <Link href="/orders" className="block group">
                        <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-primary/50">
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                <Package className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">My Orders</h2>
                            <p className="text-muted-foreground text-sm">Track, return, or buy things again.</p>
                        </div>
                    </Link>

                    {/* Addresses */}
                    <Link href="/account/addresses" className="block group">
                        <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-primary/50">
                            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Addresses</h2>
                            <p className="text-muted-foreground text-sm">Edit addresses for orders and gifts.</p>
                        </div>
                    </Link>

                    {/* Settings */}
                    <Link href="/account/settings" className="block group">
                        <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all group-hover:border-primary/50">
                            <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 text-gray-600 dark:text-gray-400">
                                <Settings className="h-6 w-6" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Settings</h2>
                            <p className="text-muted-foreground text-sm">Manage password and login details.</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12">
                    <Button variant="destructive" onClick={() => logout()} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sign Out
                    </Button>
                </div>
            </div>
        </div>
    )
}
