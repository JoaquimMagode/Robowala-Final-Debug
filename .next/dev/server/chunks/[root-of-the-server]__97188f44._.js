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
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: [
        "query"
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/api/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        // Require authentication
        const { error } = await requireAuth();
        if (error) return error;
        const userId = await getUserId();
        const body = await request.json();
        // Validation schema
        const createOrderSchema = z.object({
            shippingAddress: z.object({
                name: z.string().min(1, "Name is required"),
                address: z.string().min(1, "Address is required"),
                city: z.string().min(1, "City is required"),
                state: z.string().min(1, "State is required"),
                zipCode: z.string().min(1, "Zip code is required"),
                phone: z.string().min(1, "Phone is required")
            })
        });
        const validationResult = createOrderSchema.safeParse(body);
        if (!validationResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Invalid input data",
                details: validationResult.error.flatten().fieldErrors
            }, {
                status: 400
            });
        }
        const { shippingAddress } = validationResult.data;
        // Get user's cart items
        const cartItems = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].cartItem.findMany({
            where: {
                userId
            },
            include: {
                product: true
            }
        });
        if (cartItems.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Cart is empty"
            }, {
                status: 400
            });
        }
        // Validate all products are in stock
        const outOfStockProducts = cartItems.filter((item)=>!item.product.inStock);
        if (outOfStockProducts.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Some products are out of stock",
                details: {
                    outOfStockProducts: outOfStockProducts.map((item)=>item.product.name)
                }
            }, {
                status: 400
            });
        }
        // Calculate totals
        const subtotal = cartItems.reduce((sum, item)=>sum + item.product.originalPrice * item.quantity, 0);
        const discount = cartItems.reduce((sum, item)=>sum + (item.product.originalPrice - item.product.price) * item.quantity, 0);
        const total = cartItems.reduce((sum, item)=>sum + item.product.price * item.quantity, 0);
        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        // Create order with items in a transaction
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    userId,
                    subtotal,
                    discount,
                    total,
                    status: "PENDING",
                    shippingAddress: JSON.stringify(shippingAddress)
                }
            });
            // Create order items
            await tx.orderItem.createMany({
                data: cartItems.map((item)=>({
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    }))
            });
            // Clear user's cart
            await tx.cartItem.deleteMany({
                where: {
                    userId
                }
            });
            // Fetch complete order with items
            return await tx.order.findUnique({
                where: {
                    id: newOrder.id
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });
        });
        if (!order) {
            throw new Error("Failed to create order");
        }
        // Parse shipping address and product specifications
        const orderWithParsedData = {
            ...order,
            shippingAddress: JSON.parse(order.shippingAddress),
            items: order.items.map((item)=>({
                    ...item,
                    product: {
                        ...item.product,
                        specifications: JSON.parse(item.product.specifications)
                    }
                }))
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Order created successfully",
            order: orderWithParsedData
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Order creation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while creating the order"
        }, {
            status: 500
        });
    } finally{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$disconnect();
    }
}
async function GET(request) {
    try {
        // Require authentication
        const { error } = await requireAuth();
        if (error) return error;
        const userId = await getUserId();
        // Get user's orders
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        // Parse shipping address and product specifications
        const ordersWithParsedData = orders.map((order)=>({
                ...order,
                shippingAddress: JSON.parse(order.shippingAddress),
                items: order.items.map((item)=>({
                        ...item,
                        product: {
                            ...item.product,
                            specifications: JSON.parse(item.product.specifications)
                        }
                    }))
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            orders: ordersWithParsedData
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Orders fetch error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while fetching orders"
        }, {
            status: 500
        });
    } finally{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97188f44._.js.map