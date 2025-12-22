"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Electronics Engineer",
    avatar: "/indian-man-professional-portrait.jpg",
    content:
      "ROBO WALA has been my go-to store for all IoT components. The quality is consistently excellent, and shipping is always on time. Their ESP32 boards are genuine and work perfectly.",
    rating: 5,
    location: "Bangalore",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Robotics Student",
    avatar: "/indian-woman-student-portrait.jpg",
    content:
      "As a robotics student, I need reliable components for my projects. ROBO WALA's sensor kits are perfect for learning and prototyping. Great prices and amazing customer support!",
    rating: 5,
    location: "Mumbai",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Maker & Hobbyist",
    avatar: "/indian-man-maker-hobbyist-portrait.jpg",
    content:
      "I've built over 20 IoT projects using components from ROBO WALA. The product descriptions are accurate, and the components are always well-packaged. Highly recommended!",
    rating: 5,
    location: "Delhi",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Startup Founder",
    avatar: "/indian-woman-entrepreneur-portrait.jpg",
    content:
      "For our IoT startup, we needed a reliable supplier. ROBO WALA provides bulk orders at competitive prices with excellent quality. They're a true partner for our business.",
    rating: 5,
    location: "Hyderabad",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">What Our Makers Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join thousands of satisfied customers who trust ROBO WALA for their IoT needs
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:-left-12 md:flex bg-transparent"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:-right-12 md:flex bg-transparent"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Testimonial Card */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Quote Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Quote className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <p className="mb-8 text-lg text-foreground md:text-xl">{testimonials[currentIndex].content}</p>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === currentIndex ? "w-6 bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="mt-6 flex justify-center gap-4 md:hidden">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
