import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryGrid } from "@/components/home/category-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TrustBadges } from "@/components/home/trust-badges"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBadges />
      <Newsletter />
    </>
  )
}
