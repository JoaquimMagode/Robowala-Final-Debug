"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

export default function BlogListingPage() {
    return (
        <div className="min-h-screen bg-background pb-16">
            <div className="bg-[#1e3a5f] text-white py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">The ROBOWALA Blog</h1>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg">
                        Tutorials, reviews, and project ideas for makers and engineers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-secondary">
                                {/* Placeholder for image if not exists */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    <span className="text-sm">Blog Image</span>
                                </div>
                                {/* <Image src={post.image} alt={post.title} fill className="object-cover" /> */}
                            </div>

                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        {post.author}
                                    </div>
                                    <Button variant="link" className="p-0 h-auto font-semibold" asChild>
                                        <Link href={`/blog/${post.slug}`}>
                                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
