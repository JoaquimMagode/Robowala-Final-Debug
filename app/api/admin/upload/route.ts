import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const { error } = await requireAdmin()
    if (error) return error

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "No file provided",
        },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid file type. Only JPEG, PNG, and WebP images are allowed",
        },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "File size exceeds 5MB limit",
        },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split(".").pop()
    const filename = `product-${timestamp}.${extension}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save file to public directory
    const publicPath = join(process.cwd(), "public", "products", filename)
    await writeFile(publicPath, buffer)

    // Return the URL path
    const imageUrl = `/products/${filename}`

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        url: imageUrl,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Image upload error:", error)
    return NextResponse.json(
      {
        error: "ServerError",
        message: "An unexpected error occurred while uploading the image",
      },
      { status: 500 }
    )
  }
}
