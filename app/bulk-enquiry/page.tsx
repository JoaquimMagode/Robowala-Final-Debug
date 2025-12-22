"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function BulkEnquiryPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">Enquiry Sent!</h1>
                    <p className="text-muted-foreground mb-8">
                        Thank you for your interest. Our B2B team will review your requirements and get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="w-full">
                        Submit Another Enquiry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Bulk Order Enquiry</h1>
                    <p className="text-lg text-muted-foreground">
                        Get exclusive pricing for bulk orders, educational institutions, and corporate requirements.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" required placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" required placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" required placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="organization">Organization / Institute</Label>
                                <Input id="organization" placeholder="Company or College Name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Product Category Interest</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="development-boards">Development Boards</SelectItem>
                                    <SelectItem value="sensors">Sensors</SelectItem>
                                    <SelectItem value="motors">Motors & Drivers</SelectItem>
                                    <SelectItem value="kits">Educational Kits</SelectItem>
                                    <SelectItem value="components">Electronic Components</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Requirements & Quantity</Label>
                            <Textarea
                                id="message"
                                required
                                placeholder="Please describe your requirements, expected quantity, and any specific models you are looking for..."
                                className="min-h-[150px]"
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Sending..." : (
                                <span className="flex items-center gap-2">
                                    Send Enquiry <Send className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
