import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="relative h-[400px] w-full overflow-hidden bg-[#1e3a5f]">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Empowering Innovation</h1>
                    <p className="text-xl max-w-2xl text-white/90">
                        ROBOWALA is India's leading destination for robotics, IoT, and embedded systems,
                        fueling the dreams of makers, engineers, and students since 2020.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-foreground">A Passion for Electronics</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Founded by a team of avid electronics enthusiasts, ROBOWALA started with a simple mission:
                                to make high-quality electronic components accessible to everyone in India.
                            </p>
                            <p>
                                We understand the frustration of sourcing authentic parts, dealing with long shipping times,
                                and lack of technical support. That's why we built ROBOWALA – a one-stop shop that combines
                                a vast inventory with expert technical assistance.
                            </p>
                            <p>
                                Whether you're a student building your first line-follower robot or a startup prototyping
                                the next big IoT device, we're here to support your journey from concept to reality.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl bg-secondary mx-auto w-full max-w-md md:max-w-full">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
                            Marketplace / Team Image
                        </div>
                        {/* <Image src="/images/about/team.jpg" alt="Team" fill className="object-cover" /> */}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <h3 className="text-4xl font-bold text-primary mb-2">5000+</h3>
                        <p className="font-semibold mb-2">Products</p>
                        <p className="text-sm text-muted-foreground">From resistors to specialized sensors, we have it all.</p>
                    </div>
                    <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <h3 className="text-4xl font-bold text-primary mb-2">50k+</h3>
                        <p className="font-semibold mb-2">Happy Customers</p>
                        <p className="text-sm text-muted-foreground">Trusted by students, hobbyists, and professionals.</p>
                    </div>
                    <div className="p-8 bg-card border border-border rounded-xl text-center">
                        <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
                        <p className="font-semibold mb-2">Support</p>
                        <p className="text-sm text-muted-foreground">Technical assistance whenever you're stuck.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
