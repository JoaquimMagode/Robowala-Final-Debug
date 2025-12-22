import { Cpu, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PCBServicePage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Cpu className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold">PCB Manufacturing Service</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6 text-muted-foreground text-lg">
                        <p>
                            Get high-quality PCBs manufactured and assembled at competitive prices. Whether you need a single prototype
                            or mass production, we have you covered.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "FR4, Aluminum, and Flexible PCBs",
                                "1 to 16 Layers",
                                "Quick Turnaround (24-48 hours)",
                                "SMT In-house Assembly"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" asChild className="mt-4">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                    </div>
                    <div className="bg-secondary rounded-xl min-h-[300px] flex items-center justify-center text-muted-foreground">
                        PCB Service Image
                    </div>
                </div>
            </div>
        </div>
    )
}
