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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/GitHub/Robowala-Final-Debug/auth.config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authConfig",
    ()=>authConfig
]);
const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized ({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/admin");
            const isOnOrders = nextUrl.pathname.startsWith("/orders");
            const isOnCheckout = nextUrl.pathname.startsWith("/checkout");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false // Redirect unauthenticated users to login page
                ;
            }
            if ((isOnOrders || isOnCheckout) && !isLoggedIn) {
                return false;
            }
            return true;
        },
        jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    providers: []
};
}),
"[project]/Documents/GitHub/Robowala-Final-Debug/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/next-auth/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/@auth/core/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$auth$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/auth.config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
;
;
const { handlers, signIn, signOut, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$auth$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authConfig"],
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            async authorize (credentials) {
                try {
                    const parsedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                        email: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
                        password: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
                    }).safeParse(credentials);
                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                            where: {
                                email
                            }
                        });
                        if (!user) return null;
                        const passwordsMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
                        if (passwordsMatch) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            };
                        }
                    }
                    console.log("Invalid credentials");
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ]
});
}),
"[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth-helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthUser",
    ()=>getAuthUser,
    "getUserId",
    ()=>getUserId,
    "requireAdmin",
    ()=>requireAdmin,
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function getAuthUser() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    return session?.user || null;
}
async function requireAuth() {
    const user = await getAuthUser();
    if (!user) {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "AuthenticationError",
                message: "Authentication required. Please log in."
            }, {
                status: 401
            }),
            user: null
        };
    }
    return {
        error: null,
        user
    };
}
async function requireAdmin() {
    const { error, user } = await requireAuth();
    if (error) {
        return {
            error,
            user: null
        };
    }
    if (user.role !== "ADMIN") {
        return {
            error: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "AuthorizationError",
                message: "Admin access required."
            }, {
                status: 403
            }),
            user: null
        };
    }
    return {
        error: null,
        user
    };
}
async function getUserId() {
    const user = await getAuthUser();
    if (!user || !user.id) {
        throw new Error("User not authenticated");
    }
    return user.id;
}
}),
"[project]/Documents/GitHub/Robowala-Final-Debug/app/api/cart/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth-helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/Robowala-Final-Debug/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET(request) {
    try {
        // Require authentication
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])();
        if (error) return error;
        const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserId"])();
        // Get cart items with product details
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId
            },
            include: {
                product: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        // Parse specifications and calculate totals
        const items = cartItems.map((item)=>({
                id: item.id,
                productId: item.productId,
                quantity: item.quantity,
                product: {
                    ...item.product,
                    specifications: JSON.parse(item.product.specifications)
                }
            }));
        // Calculate cart totals
        const subtotal = items.reduce((sum, item)=>sum + item.product.originalPrice * item.quantity, 0);
        const discount = items.reduce((sum, item)=>sum + (item.product.originalPrice - item.product.price) * item.quantity, 0);
        const total = items.reduce((sum, item)=>sum + item.product.price * item.quantity, 0);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items,
            subtotal,
            discount,
            total
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Cart fetch error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while fetching the cart"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function POST(request) {
    try {
        // Require authentication
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])();
        if (error) return error;
        const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserId"])();
        const body = await request.json();
        // Validation schema
        const addToCartSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            productId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Product ID is required"),
            quantity: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive("Quantity must be positive").default(1)
        });
        const validationResult = addToCartSchema.safeParse(body);
        if (!validationResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Invalid input data",
                details: validationResult.error.flatten().fieldErrors
            }, {
                status: 400
            });
        }
        const { productId, quantity } = validationResult.data;
        // Check if user exists in database, create if not
        let user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            // Get user info from session to create database record
            const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
            if (!session?.user) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "AuthenticationError",
                    message: "Invalid session"
                }, {
                    status: 401
                });
            }
            // Create user record in database
            user = await prisma.user.create({
                data: {
                    id: userId,
                    email: session.user.email,
                    name: session.user.name || session.user.email,
                    role: "USER"
                }
            });
        }
        // Check if product exists and is in stock
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "NotFoundError",
                message: "Product not found"
            }, {
                status: 404
            });
        }
        if (!product.inStock) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Product is out of stock"
            }, {
                status: 400
            });
        }
        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });
        let cartItem;
        if (existingItem) {
            // Update quantity
            cartItem = await prisma.cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    quantity: existingItem.quantity + quantity
                },
                include: {
                    product: true
                }
            });
        } else {
            // Create new cart item
            cartItem = await prisma.cartItem.create({
                data: {
                    userId,
                    productId,
                    quantity
                },
                include: {
                    product: true
                }
            });
        }
        // Parse specifications
        const itemWithParsedSpecs = {
            ...cartItem,
            product: {
                ...cartItem.product,
                specifications: JSON.parse(cartItem.product.specifications)
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Item added to cart successfully",
            item: itemWithParsedSpecs
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Add to cart error:", error);
        // Handle Prisma foreign key constraint errors
        if (error instanceof Error && error.message.includes('Foreign key constraint')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ValidationError",
                message: "Invalid user or product reference. Please ensure you are logged in and the product exists."
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while adding to cart"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
async function DELETE(request) {
    try {
        // Require authentication
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])();
        if (error) return error;
        const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$lib$2f$auth$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserId"])();
        // Clear all cart items for user
        await prisma.cartItem.deleteMany({
            where: {
                userId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Cart cleared successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Clear cart error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$Robowala$2d$Final$2d$Debug$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ServerError",
            message: "An unexpected error occurred while clearing the cart"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2c56ca90._.js.map