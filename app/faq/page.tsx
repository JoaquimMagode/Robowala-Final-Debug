import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
    const faqs = [
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days across India. Express shipping is available for major metro cities (1-2 days)."
        },
        {
            question: "Do you offer Cash on Delivery (COD)?",
            answer: "Yes, COD is available for orders up to ₹5,000. For orders above this amount, we require online payment for security reasons."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day replacement policy for defective items. If you receive a damaged product, please contact support within 48 hours of delivery."
        },
        {
            question: "Do you provide technical support?",
            answer: "Absolutely! Our team of engineers is available to help you with basic troubleshooting and product selection queries via email or phone."
        },
        {
            question: "Are these components original?",
            answer: "Yes, we source directly from manufacturers and authorized distributors. We guarantee the authenticity of brands like Arduino, Raspberry Pi, and SparkFun."
        }
    ]

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
                <p className="text-center text-muted-foreground mb-12">
                    Find answers to common questions about our products, shipping, and services.
                </p>

                <div className="bg-card border border-border rounded-xl p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-lg">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
