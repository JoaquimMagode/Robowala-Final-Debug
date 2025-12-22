"use client"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Calendar, User, ChevronLeft } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

export default function BlogPostPage() {
    const params = useParams()
    const slug = params.slug as string
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <article className="container mx-auto px-4 max-w-3xl">
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/blog">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>

                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                        </span>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3 border-y border-border py-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{post.author}</p>
                            <p className="text-xs text-muted-foreground">Author</p>
                        </div>
                    </div>
                </header>

                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </article>
        </div>
    )
}
