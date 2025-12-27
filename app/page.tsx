import { HeroBanner } from "@/components/home/hero-banner"
import { CategoryGrid } from "@/components/home/category-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { TrustBadges } from "@/components/home/trust-badges"
import { Newsletter } from "@/components/home/newsletter"
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <HeroScrollDemo />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBadges />
      <Newsletter />
    </>
  )
}
