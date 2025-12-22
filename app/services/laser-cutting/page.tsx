import { Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LaserServicePage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Zap className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold">Laser Cutting & Engraving</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6 text-muted-foreground text-lg">
                        <p>
                            Precision laser cutting service for acrylic, MDF, wood, and other non-metal materials.
                            Perfect for robot chassis, custom enclosures, and artistic projects.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Materials: Acrylic (up to 10mm), MDF, Plywood",
                                "Bed Size: 1200mm x 900mm",
                                "High Precision (+/- 0.1mm)",
                                "Custom engraving on metal/wood"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" asChild className="mt-4">
                            <Link href="/contact">Upload DXF/SVG</Link>
                        </Button>
                    </div>
                    <div className="bg-secondary rounded-xl min-h-[300px] flex items-center justify-center text-muted-foreground">
                        Laser Cutting Image
                    </div>
                </div>
            </div>
        </div>
    )
}
