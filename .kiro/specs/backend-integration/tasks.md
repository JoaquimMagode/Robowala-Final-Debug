# Implementation Plan

- [x] 1. Set up database and ORM infrastructure
- [x] 1.1 Install and configure Prisma ORM with SQLite
  - Install prisma, @prisma/client
  - Initialize Prisma with `prisma init`
  - Configure database connection string in .env
  - _Requirements: All (foundational)_

- [x] 1.2 Create Prisma schema with all data models
  - Define User, Product, CartItem, Order, OrderItem models
  - Set up enums for Role and OrderStatus
  - Configure relationships and cascading deletes
  - Add indexes for slug, categorySlug, userId fields
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 1.3 Run initial migration and generate Prisma client
  - Execute `prisma migrate dev` to create database tables
  - Generate Prisma client types
  - _Requirements: All (foundational)_

- [x] 1.4 Create database seed script with existing product data
  - Import product data from lib/products.ts
  - Create seed script to populate database
  - Run seed to initialize product catalog
  - _Requirements: 1.1_

- [x] 2. Implement authentication system
- [x] 2.1 Install and configure NextAuth.js



  - Install next-auth and required dependencies
  - Create auth configuration file
  - Set up JWT strategy for session management
  - Configure environment variables for auth secrets



  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2.2 Create user registration API endpoint

  - Implement POST /api/auth/register
  - Validate email and password with Zod schema
  - Hash password using bcrypt
  - Create user record in database
  - Handle duplicate email errors
  - _Requirements: 5.1_

- [ ]* 2.3 Write property test for user registration
  - **Property 20: Password encryption**
  - **Validates: Requirements 5.1**



- [x] 2.4 Create login API endpoint
  - Implement POST /api/auth/login
  - Validate credentials against database
  - Generate and return JWT token on success
  - Return 401 error for invalid credentials
  - _Requirements: 5.2, 5.3_

- [ ]* 2.5 Write property tests for authentication
  - **Property 21: Successful authentication token generation**
  - **Validates: Requirements 5.2**



  - **Property 22: Failed authentication rejection**
  - **Validates: Requirements 5.3**

- [x] 2.6 Create authentication middleware
  - Implement token validation middleware
  - Extract user from valid tokens
  - Return 401 for missing or invalid tokens
  - Attach user to request object
  - _Requirements: 5.4, 7.5_

- [ ]* 2.7 Write property test for token validation
  - **Property 23: Authentication token validation**
  - **Validates: Requirements 5.4, 7.5**

- [x] 2.8 Implement logout endpoint
  - Create POST /api/auth/logout
  - Invalidate authentication token
  - Clear session data
  - _Requirements: 5.5_

- [ ]* 2.9 Write property test for logout
  - **Property 24: Token invalidation on logout**
  - **Validates: Requirements 5.5**

- [x] 3. Implement product catalog API
- [x] 3.1 Create GET /api/products endpoint
  - Implement product listing with pagination
  - Support category filtering via query parameter
  - Support search functionality via query parameter
  - Return products with inventory status
  - Implement pagination with page and limit parameters
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 7.2_

- [ ]* 3.2 Write property tests for product listing
  - **Property 1: Complete product retrieval**
  - **Validates: Requirements 1.1**
  - **Property 2: Stock status accuracy**



  - **Validates: Requirements 1.2**
  - **Property 29: Pagination correctness**
  - **Validates: Requirements 7.2**

- [ ]* 3.3 Write property test for category filtering
  - **Property 3: Category filtering correctness**
  - **Validates: Requirements 1.3**

- [ ]* 3.4 Write property test for search functionality
  - **Property 5: Search result relevance**



  - **Validates: Requirements 1.5**

- [x] 3.5 Create GET /api/products/[slug] endpoint
  - Implement single product retrieval by slug
  - Return complete product details including specifications
  - Return 404 for non-existent products
  - _Requirements: 1.4, 6.3_

- [ ]* 3.6 Write property tests for product detail retrieval
  - **Property 4: Product detail completeness**
  - **Validates: Requirements 1.4**


  - **Property 27: Not found error status**
  - **Validates: Requirements 6.3**

- [x] 4. Implement admin product management API
- [x] 4.1 Create POST /api/products endpoint (admin only)
  - Implement product creation with authentication check
  - Validate all required fields with Zod schema
  - Generate unique slug from product name
  - Store product in database
  - Return validation errors for invalid data
  - _Requirements: 4.1, 6.1, 6.5_

- [ ]* 4.2 Write property tests for product creation
  - **Property 15: Product creation validation**
  - **Validates: Requirements 4.1**
  - **Property 25: Validation error details**
  - **Validates: Requirements 6.1, 6.5**

- [x] 4.3 Create PUT /api/products/[id] endpoint (admin only)
  - Implement product update with authentication check
  - Support partial updates (only modify specified fields)
  - Validate updated fields
  - Return 404 for non-existent products
  - _Requirements: 4.2, 6.3_

- [ ]* 4.4 Write property test for partial updates
  - **Property 16: Partial update preservation**
  - **Validates: Requirements 4.2**



- [x] 4.5 Create DELETE /api/products/[id] endpoint (admin only)
  - Implement product deletion with authentication check
  - Check for product references in orders
  - Prevent deletion if product exists in orders
  - Return 409 conflict error if deletion blocked
  - _Requirements: 4.3, 4.5_

- [ ]* 4.6 Write property tests for product deletion
  - **Property 17: Product deletion completeness**
  - **Validates: Requirements 4.3**
  - **Property 19: Referential integrity protection**
  - **Validates: Requirements 4.5**

- [x] 4.7 Implement product image upload handling


  - Create image upload endpoint or integrate with product creation
  - Store images in public directory
  - Associate image URL with product
  - _Requirements: 4.4_

- [ ]* 4.8 Write property test for image association
  - **Property 18: Image association persistence**
  - **Validates: Requirements 4.4**



- [x] 5. Implement cart management API
- [x] 5.1 Create GET /api/cart endpoint
  - Implement cart retrieval for authenticated user
  - Return cart items with product details
  - Calculate subtotal, discount, and total
  - Return empty cart for new users
  - _Requirements: 2.1, 2.4_

- [x] 5.2 Create POST /api/cart endpoint
  - Implement add item to cart functionality
  - Validate product exists and is in stock
  - Handle quantity updates for existing items
  - Require authentication
  - _Requirements: 2.1_

- [ ]* 5.3 Write property test for cart persistence
  - **Property 6: Cart persistence round-trip**


  - **Validates: Requirements 2.1, 2.4**

- [x] 5.4 Create PUT /api/cart/[itemId] endpoint
  - Implement cart item quantity update
  - Validate quantity is positive (greater than 0)
  - Return 400 error for invalid quantities
  - Update stored quantity on success
  - _Requirements: 2.2, 6.1_

- [ ]* 5.5 Write property test for quantity validation
  - **Property 7: Quantity validation**
  - **Validates: Requirements 2.2**

- [x] 5.6 Create DELETE /api/cart/[itemId] endpoint
  - Implement remove single item from cart
  - Verify item belongs to authenticated user
  - Preserve other cart items
  - _Requirements: 2.3_

- [ ]* 5.7 Write property test for selective removal
  - **Property 8: Selective item removal**
  - **Validates: Requirements 2.3**

- [x] 5.8 Create DELETE /api/cart endpoint
  - Implement clear entire cart functionality
  - Remove all items for authenticated user
  - Return empty cart confirmation
  - _Requirements: 2.5_

- [ ]* 5.9 Write property test for cart clearing
  - **Property 9: Complete cart clearing**

  - **Validates: Requirements 2.5**

- [x] 6. Implement order management API
- [x] 6.1 Create POST /api/orders endpoint
  - Implement order creation from cart
  - Validate all products are in stock
  - Generate unique order number
  - Create order with all cart items
  - Clear cart after successful order
  - Require authentication and shipping address
  - _Requirements: 3.1, 3.2, 3.3, 3.4_



- [ ]* 6.2 Write property tests for order creation
  - **Property 10: Order creation completeness**
  - **Validates: Requirements 3.1**
  - **Property 11: Order identifier uniqueness**
  - **Validates: Requirements 3.2**
  - **Property 12: Stock validation on order**
  - **Validates: Requirements 3.3**
  - **Property 13: Cart clearing after order**
  - **Validates: Requirements 3.4**


- [x] 6.3 Create GET /api/orders endpoint
  - Implement order history retrieval
  - Filter orders by authenticated user
  - Return orders sorted by creation date (newest first)
  - Include order items and product details
  - _Requirements: 3.5_

- [ ]* 6.4 Write property test for order history isolation
  - **Property 14: Order history isolation**
  - **Validates: Requirements 3.5**

- [x] 6.4 Create GET /api/orders/[id] endpoint
  - Implement single order retrieval
  - Verify order belongs to authenticated user
  - Return complete order details with items
  - Return 404 for non-existent orders
  - _Requirements: 3.5, 6.3_

- [x] 6.5 Create GET /api/admin/orders endpoint (admin only)
  - Implement admin order listing
  - Return all orders across all users
  - Support filtering by status
  - Include pagination
  - _Requirements: 7.2_

- [x] 6.6 Create PUT /api/admin/orders/[id] endpoint (admin only)
  - Implement order status updates
  - Validate status transitions
  - Update order status in database
  - _Requirements: 4.2_

- [x] 7. Implement error handling and validation
- [x] 7.1 Create centralized error handler middleware
  - Implement error classification (validation, auth, not found, server)
  - Format errors with consistent structure
  - Map errors to appropriate HTTP status codes
  - Log server errors for debugging
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 7.2 Write property tests for error handling
  - **Property 26: Authentication error status**
  - **Validates: Requirements 6.2**
  - **Property 28: Server error handling**
  - **Validates: Requirements 6.4**

- [x] 7.3 Create Zod validation schemas for all endpoints
  - Define schemas for product creation/update
  - Define schemas for cart operations
  - Define schemas for order creation
  - Define schemas for user registration/login
  - _Requirements: 4.1, 5.1, 6.1, 6.5_

- [x] 7.4 Implement content-type validation middleware
  - Check content-type header for POST/PUT requests
  - Reject requests with incorrect content-type
  - Return 400 error with appropriate message
  - _Requirements: 7.4_

- [ ]* 7.5 Write property tests for API conventions
  - **Property 30: Response schema consistency**
  - **Validates: Requirements 7.3**
  - **Property 31: Content-type validation**
  - **Validates: Requirements 7.4**

- [ ] 8. Update frontend to use API endpoints
- [x] 8.1 Create API client utility functions


  - Create fetch wrapper with error handling
  - Implement authentication token management
  - Create typed API client functions for all endpoints
  - _Requirements: All_



- [x] 8.2 Update product pages to fetch from API
  - Modify app/page.tsx to fetch products from API
  - Update app/products/page.tsx to use API
  - Update app/products/[slug]/page.tsx to use API
  - Handle loading and error states


  - _Requirements: 1.1, 1.3, 1.4, 1.5_

- [ ] 8.3 Update cart to use API endpoints
  - Modify cart store to call API instead of local state
  - Implement optimistic updates for better UX


  - Handle authentication requirements
  - Sync cart on login/logout
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 8.4 Implement checkout flow with order API
  - Create checkout page with shipping form
  - Call order creation API on checkout
  - Handle stock validation errors
  - Show order confirmation with order number
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 8.5 Create order history page


  - Implement orders page to display user's orders
  - Fetch orders from API
  - Display order details and status
  - Handle authentication requirement
  - _Requirements: 3.5_

- [ ] 8.6 Update admin pages to use API
  - Modify admin product management to use API
  - Implement product creation form
  - Implement product editing
  - Implement product deletion with confirmation
  - Update admin orders page to use API
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8.7 Implement authentication UI
  - Create login page
  - Create registration page
  - Add authentication state management
  - Update header to show login/logout
  - Protect authenticated routes
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Final integration and testing
- [ ] 10.1 Test complete user flows end-to-end
  - Test registration → login → browse → add to cart → checkout flow
  - Test cart persistence across sessions
  - Test admin product management flow
  - Verify error handling in UI
  - _Requirements: All_

- [ ]* 10.2 Run all property-based tests with 100+ iterations
  - Execute all property tests
  - Verify all properties pass consistently
  - Fix any discovered edge cases
  - _Requirements: All_

- [ ] 10.3 Performance testing and optimization
  - Test with large product catalogs
  - Verify pagination performance
  - Check database query efficiency
  - Add indexes if needed
  - _Requirements: 7.2_

- [ ] 11. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
