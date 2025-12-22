import { Truck, Shield, RefreshCw, Headphones } from "lucide-react"

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹499",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% protected transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.title} className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1e3a5f]/10">
                  <Icon className="h-6 w-6 text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
