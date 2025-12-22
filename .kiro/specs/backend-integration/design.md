# Backend Integration Design Document

## Overview

This design document outlines the architecture for integrating a backend API with the ROBOWALA e-commerce frontend. The solution uses Next.js API Routes as the backend layer, with a database for persistence. The design focuses on creating RESTful endpoints that replace the current static data with dynamic, database-backed operations while maintaining the existing frontend interface contracts.

## Architecture

### Technology Stack

- **Backend Framework**: Next.js 16 API Routes (serverless functions)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js for session management
- **File Storage**: Local filesystem for product images (can be upgraded to cloud storage)
- **Validation**: Zod for request/response validation
- **API Design**: RESTful conventions with JSON responses

### System Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React/Next)   │
└────────┬────────┘
         │
         │ HTTP/JSON
         │
┌────────▼────────┐
│   API Routes    │
│  (Next.js API)  │
└────────┬────────┘
         │
         ├──────────┐
         │          │
┌────────▼────┐  ┌─▼──────────┐
│  Database   │  │   Auth     │
│ (PostgreSQL)│  │(NextAuth)  │
└─────────────┘  └────────────┘
```

### Data Flow

1. Frontend makes HTTP request to API route
2. API route validates authentication (if required)
3. API route validates request data using Zod schemas
4. API route performs database operations via Prisma
5. API route returns JSON response with appropriate status code
6. Frontend updates UI based on response

## Components and Interfaces

### API Endpoints

#### Products API

```typescript
GET    /api/products              - List all products (with pagination)
GET    /api/products?category=X   - Filter products by category
GET    /api/products?search=X     - Search products
GET    /api/products/[slug]       - Get single product by slug
POST   /api/products              - Create product (admin only)
PUT    /api/products/[id]         - Update product (admin only)
DELETE /api/products/[id]         - Delete product (admin only)
```

#### Cart API

```typescript
GET    /api/cart                  - Get user's cart
POST   /api/cart                  - Add item to cart
PUT    /api/cart/[itemId]         - Update cart item quantity
DELETE /api/cart/[itemId]         - Remove item from cart
DELETE /api/cart                  - Clear entire cart
```

#### Orders API

```typescript
GET    /api/orders                - Get user's order history
GET    /api/orders/[id]           - Get specific order details
POST   /api/orders                - Create new order from cart
GET    /api/admin/orders          - Get all orders (admin only)
PUT    /api/admin/orders/[id]     - Update order status (admin only)
```

#### Authentication API

```typescript
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
POST   /api/auth/logout           - Logout user
GET    /api/auth/session          - Get current session
```

### Request/Response Formats

#### Product Response

```typescript
{
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  categorySlug: string
  badge: string | null
  inStock: boolean
  description: string
  specifications: Record<string, string>
  createdAt: string
  updatedAt: string
}
```

#### Cart Response

```typescript
{
  items: [
    {
      id: string
      productId: string
      product: Product
      quantity: number
    }
  ]
  subtotal: number
  discount: number
  total: number
}
```

#### Order Response

```typescript
{
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: string
  updatedAt: string
}
```

#### Error Response

```typescript
{
  error: string
  message: string
  details?: Record<string, string[]>  // Field-level validation errors
}
```

## Data Models

### Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          Role      @default(USER)
  cart          CartItem[]
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  USER
  ADMIN
}

model Product {
  id              String    @id @default(cuid())
  name            String
  slug            String    @unique
  price           Float
  originalPrice   Float
  rating          Float     @default(0)
  reviews         Int       @default(0)
  image           String
  category        String
  categorySlug    String
  badge           String?
  inStock         Boolean   @default(true)
  description     String
  specifications  Json
  cartItems       CartItem[]
  orderItems      OrderItem[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model CartItem {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId   String
  product     Product   @relation(fields: [productId], references: [id])
  quantity    Int
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@unique([userId, productId])
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
  subtotal        Float
  discount        Float
  total           Float
  status          OrderStatus @default(PENDING)
  shippingAddress Json
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id          String    @id @default(cuid())
  orderId     String
  order       Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product   @relation(fields: [productId], references: [id])
  quantity    Int
  price       Float     // Snapshot of price at time of order
  createdAt   DateTime  @default(now())
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Product Catalog Properties

**Property 1: Complete product retrieval**
*For any* set of products in the database, calling the GET /api/products endpoint should return all products with their current inventory status.
**Validates: Requirements 1.1**

**Property 2: Stock status accuracy**
*For any* product in the database, the inStock field in the API response should match the inStock value stored in the database.
**Validates: Requirements 1.2**

**Property 3: Category filtering correctness**
*For any* category filter applied to GET /api/products, all returned products should have a categorySlug matching the requested category, and no products from that category should be omitted.
**Validates: Requirements 1.3**

**Property 4: Product detail completeness**
*For any* product slug, calling GET /api/products/[slug] should return the product with all fields including specifications populated.
**Validates: Requirements 1.4**

**Property 5: Search result relevance**
*For any* search query, all returned products should contain the search term in either their name or description.
**Validates: Requirements 1.5**

### Cart Management Properties

**Property 6: Cart persistence round-trip**
*For any* product added to a user's cart, retrieving the cart should return that product with the correct quantity.
**Validates: Requirements 2.1, 2.4**

**Property 7: Quantity validation**
*For any* cart item quantity update, if the quantity is less than or equal to zero, the API should reject the request; if positive, the stored quantity should match the requested value.
**Validates: Requirements 2.2**

**Property 8: Selective item removal**
*For any* cart with multiple items, removing one item should delete only that item while preserving all other items.
**Validates: Requirements 2.3**

**Property 9: Complete cart clearing**
*For any* user cart with items, calling the clear cart endpoint should result in an empty cart with zero items.
**Validates: Requirements 2.5**

### Order Processing Properties

**Property 10: Order creation completeness**
*For any* cart with items, creating an order should produce an order record containing all cart items with matching quantities and product details.
**Validates: Requirements 3.1**

**Property 11: Order identifier uniqueness**
*For any* set of orders created, all order numbers should be unique across the entire system.
**Validates: Requirements 3.2**

**Property 12: Stock validation on order**
*For any* order attempt where at least one product is out of stock, the API should reject the order and return an error.
**Validates: Requirements 3.3**

**Property 13: Cart clearing after order**
*For any* successful order creation, the user's cart should be empty immediately after.
**Validates: Requirements 3.4**

**Property 14: Order history isolation**
*For any* user requesting order history, the returned orders should only include orders belonging to that user and no other users.
**Validates: Requirements 3.5**

### Product Management Properties

**Property 15: Product creation validation**
*For any* product creation request missing required fields, the API should return a validation error; for complete requests, the product should be stored and retrievable.
**Validates: Requirements 4.1**

**Property 16: Partial update preservation**
*For any* product update request, only the fields specified in the request should change, while all other fields should retain their original values.
**Validates: Requirements 4.2**

**Property 17: Product deletion completeness**
*For any* product deletion request, after successful deletion, attempting to retrieve that product should return a 404 error.
**Validates: Requirements 4.3**

**Property 18: Image association persistence**
*For any* product image upload, retrieving the product should return the correct image URL.
**Validates: Requirements 4.4**

**Property 19: Referential integrity protection**
*For any* product that exists in at least one order, attempting to delete that product should fail and return an error.
**Validates: Requirements 4.5**

### Authentication Properties

**Property 20: Password encryption**
*For any* user registration, the password stored in the database should not match the plain text password provided (should be hashed).
**Validates: Requirements 5.1**

**Property 21: Successful authentication token generation**
*For any* user login with correct credentials, the API should return an authentication token.
**Validates: Requirements 5.2**

**Property 22: Failed authentication rejection**
*For any* login attempt with incorrect credentials, the API should return a 401 error and no authentication token.
**Validates: Requirements 5.3**

**Property 23: Authentication token validation**
*For any* protected endpoint request, requests with valid tokens should succeed while requests with invalid or missing tokens should return 401 errors.
**Validates: Requirements 5.4, 7.5**

**Property 24: Token invalidation on logout**
*For any* user session, after logout, the authentication token should be invalid and subsequent requests using that token should fail.
**Validates: Requirements 5.5**

### Error Handling Properties

**Property 25: Validation error details**
*For any* request with invalid data, the API should return a 400 status code with field-specific error messages indicating which fields failed validation.
**Validates: Requirements 6.1, 6.5**

**Property 26: Authentication error status**
*For any* request to a protected endpoint without valid authentication, the API should return a 401 status code.
**Validates: Requirements 6.2**

**Property 27: Not found error status**
*For any* request for a non-existent resource (product, order, etc.), the API should return a 404 status code.
**Validates: Requirements 6.3**

**Property 28: Server error handling**
*For any* request that causes a server error, the API should return a 500 status code and log the error details.
**Validates: Requirements 6.4**

### API Convention Properties

**Property 29: Pagination correctness**
*For any* collection endpoint with pagination parameters (page, limit), the returned items should be the correct subset based on the page number and limit, and the total count should be accurate.
**Validates: Requirements 7.2**

**Property 30: Response schema consistency**
*For any* API endpoint, the response structure should match the defined schema for that endpoint type.
**Validates: Requirements 7.3**

**Property 31: Content-type validation**
*For any* POST or PUT request with an incorrect content-type header, the API should reject the request with a 400 error.
**Validates: Requirements 7.4**

## Error Handling

### Error Response Strategy

All API errors will follow a consistent format:

```typescript
{
  error: string,           // Error type (e.g., "ValidationError", "AuthenticationError")
  message: string,         // Human-readable error message
  details?: object         // Optional additional context (e.g., field errors)
}
```

### Error Categories

1. **Validation Errors (400)**
   - Missing required fields
   - Invalid data types
   - Business rule violations
   - Returns field-level error details

2. **Authentication Errors (401)**
   - Missing authentication token
   - Invalid or expired token
   - Insufficient permissions

3. **Not Found Errors (404)**
   - Resource doesn't exist
   - Invalid slug or ID

4. **Conflict Errors (409)**
   - Duplicate entries (e.g., email already exists)
   - Referential integrity violations

5. **Server Errors (500)**
   - Database connection failures
   - Unexpected exceptions
   - Logged for debugging

### Error Handling Middleware

```typescript
// Centralized error handler
export function errorHandler(error: Error, req: Request, res: Response) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: 'ValidationError',
      message: error.message,
      details: error.fields
    })
  }
  
  if (error instanceof AuthenticationError) {
    return res.status(401).json({
      error: 'AuthenticationError',
      message: error.message
    })
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', error)
  
  return res.status(500).json({
    error: 'ServerError',
    message: 'An unexpected error occurred'
  })
}
```

## Testing Strategy

### Unit Testing

Unit tests will verify specific functionality of individual API endpoints and database operations:

- **Endpoint handlers**: Test each API route handler with various inputs
- **Database operations**: Test Prisma queries and mutations
- **Validation logic**: Test Zod schemas with valid and invalid data
- **Authentication middleware**: Test token validation and session management
- **Error handlers**: Test error formatting and status codes

Example unit tests:
- Test that GET /api/products returns 200 with product array
- Test that POST /api/cart with missing productId returns 400
- Test that authentication middleware rejects requests without tokens
- Test that order creation fails when cart is empty

### Property-Based Testing

Property-based tests will verify universal properties across many randomly generated inputs using **fast-check** (JavaScript/TypeScript property testing library):

- **Minimum 100 iterations** per property test to ensure thorough coverage
- Each property test will be tagged with: `**Feature: backend-integration, Property {number}: {property_text}**`
- Tests will generate random valid and invalid inputs to verify properties hold across all cases

Property test examples:
- Generate random products and verify category filtering returns only matching products
- Generate random cart operations and verify cart state consistency
- Generate random order data and verify order numbers are always unique
- Generate random authentication attempts and verify token validation is consistent

### Integration Testing

Integration tests will verify end-to-end workflows:

- Complete user registration → login → add to cart → checkout flow
- Admin product creation → customer purchase → order fulfillment flow
- Cart persistence across multiple sessions
- Order history retrieval with multiple orders

### Test Database Strategy

- Use a separate test database to avoid affecting production data
- Reset database state between test suites
- Seed test data for consistent test scenarios
- Use transactions for test isolation where possible

## Implementation Notes

### Migration from Static Data

The current frontend uses static product data from `lib/products.ts`. The migration strategy:

1. **Database Seeding**: Create a seed script that imports the existing product data into the database
2. **API Layer**: Implement API routes that match the current data structure
3. **Frontend Updates**: Update frontend components to fetch from API routes instead of importing static data
4. **Gradual Migration**: Can be done incrementally, starting with read-only operations (products) before implementing write operations (cart, orders)

### Authentication Implementation

Using NextAuth.js provides:
- Built-in session management
- Secure token handling
- Easy integration with Next.js API routes
- Support for multiple authentication providers (can add OAuth later)

### Performance Considerations

- **Database Indexing**: Add indexes on frequently queried fields (slug, categorySlug, userId)
- **Caching**: Consider implementing Redis caching for product catalog
- **Pagination**: Implement cursor-based pagination for large collections
- **Image Optimization**: Use Next.js Image component for automatic optimization

### Security Considerations

- **Password Hashing**: Use bcrypt with appropriate salt rounds
- **SQL Injection**: Prisma provides protection through parameterized queries
- **XSS Protection**: Sanitize user inputs, especially in product descriptions
- **Rate Limiting**: Implement rate limiting on authentication endpoints
- **CORS**: Configure appropriate CORS policies for API routes
