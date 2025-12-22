module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Documents/GitHub/Robowala-Final-Debug/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        // Get query parameters
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        // Validate pagination parameters
        if (page < 1 || limit < 1 || limit > 100) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Invalid pagination parameters"
            }, {
                status: 400
            });
        }
        // Build where clause for filtering
        const where = {};
        if (category) {
            where.categorySlug = category;
        }
        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ];
        }
        // Get total count for pagination
        const total = await prisma.product.count({
            where
        });
        // Get products with pagination
        const products = await prisma.product.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        });
        // Parse specifications from JSON string
        const productsWithParsedSpecs = products.map((product)=>({
                ...product,
                specifications: JSON.parse(product.specifications)
            }));
        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limit);
        const hasMore = page < totalPages;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            products: productsWithParsedSpecs,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Products fetch error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while fetching products"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function POST(request) {
    const { requireAdmin } = await __turbopack_context__.A("[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth-helpers.ts [app-route] (ecmascript, async loader)");
    const { z } = await __turbopack_context__.A("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/zod/index.js [app-route] (ecmascript, async loader)");
    try {
        // Require admin authentication
        const { error, user } = await requireAdmin();
        if (error) return error;
        const body = await request.json();
        // Validation schema for product creation
        const productSchema = z.object({
            name: z.string().min(1, "Name is required"),
            price: z.number().positive("Price must be positive"),
            originalPrice: z.number().positive("Original price must be positive"),
            rating: z.number().min(0).max(5).default(0),
            reviews: z.number().min(0).default(0),
            image: z.string().url("Image must be a valid URL"),
            category: z.string().min(1, "Category is required"),
            categorySlug: z.string().min(1, "Category slug is required"),
            badge: z.string().nullable().optional(),
            inStock: z.boolean().default(true),
            description: z.string().min(1, "Description is required"),
            specifications: z.record(z.string())
        });
        // Validate request body
        const validationResult = productSchema.safeParse(body);
        if (!validationResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Invalid input data",
                details: validationResult.error.flatten().fieldErrors
            }, {
                status: 400
            });
        }
        const data = validationResult.data;
        // Generate slug from name
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        // Check if slug already exists
        const existingProduct = await prisma.product.findUnique({
            where: {
                slug
            }
        });
        if (existingProduct) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ConflictError",
                message: "A product with a similar name already exists"
            }, {
                status: 409
            });
        }
        // Create product
        const product = await prisma.product.create({
            data: {
                ...data,
                slug,
                specifications: JSON.stringify(data.specifications)
            }
        });
        // Parse specifications back to object for response
        const productWithParsedSpecs = {
            ...product,
            specifications: JSON.parse(product.specifications)
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Product created successfully",
            product: productWithParsedSpecs
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Product creation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while creating the product"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3ec071ad._.js.map