import { Printer, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThreeDPrintingServicePage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Printer className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold">3D Printing Service</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6 text-muted-foreground text-lg">
                        <p>
                            Turn your digital designs into physical objects with our professional 3D printing service.
                            We offer FDM and SLA printing with high precision.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "PLA, ABS, PETG, and Resin materials",
                                "High resolution prints (up to 50 microns)",
                                "Large build volume support",
                                "Post-processing available"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" asChild className="mt-4">
                            <Link href="/contact">Upload Model</Link>
                        </Button>
                    </div>
                    <div className="bg-secondary rounded-xl min-h-[300px] flex items-center justify-center text-muted-foreground">
                        3D Printer Image
                    </div>
                </div>
            </div>
        </div>
    )
}
