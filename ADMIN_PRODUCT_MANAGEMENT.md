# Admin Product Management System

## Overview
A complete admin interface for managing products in the Robowala e-commerce platform with support for pricing, discounts, and multiple product images.

## Database Schema Updates

### Product Model Enhancements
- **discountPercent**: Optional field for percentage-based discounts (0-100%)
- **discountAmount**: Optional field for fixed amount discounts
- **images**: JSON array field for storing multiple product images
- **stock**: Integer field for inventory management

## API Endpoints

### Admin Products API (`/api/admin/products`)
- **POST**: Create new product with full validation
- **GET**: List products with pagination, search, and filtering

### Individual Product API (`/api/admin/products/[id]`)
- **GET**: Fetch single product details
- **PUT**: Update product with partial data support
- **DELETE**: Remove product (with order validation)

### File Upload API (`/api/admin/upload`)
- **POST**: Upload product images with validation
- Supports JPEG, PNG, WebP formats
- 5MB file size limit
- Automatic filename generation

## Admin Interface Components

### ProductForm Component (`/components/admin/product-form.tsx`)
**Features:**
- Complete product information form
- Primary and additional image upload
- Discount management (percentage or fixed amount)
- Inventory tracking
- Dynamic specifications management
- Real-time validation

**Form Sections:**
1. **Basic Information**: Name, pricing, category, brand
2. **Inventory**: Stock status, quantity, datasheet
3. **Images**: Primary image + multiple additional images
4. **Description**: Rich text description
5. **Specifications**: Key-value pairs for technical details

### Admin Pages
- **Product List** (`/admin/products`): View all products with search/filter
- **Add Product** (`/admin/products/new`): Create new products
- **Edit Product** (`/admin/products/[id]/edit`): Update existing products

## Key Features

### Discount Management
- **Percentage Discounts**: 0-100% off original price
- **Fixed Amount Discounts**: Specific rupee amount off
- **Visual Indicators**: Shows original price, current price, and discount percentage

### Image Management
- **Primary Image**: Main product display image (required)
- **Additional Images**: Up to multiple supplementary images
- **Upload Validation**: File type and size restrictions
- **Automatic Storage**: Files saved to `/public/products/`

### Inventory Control
- **Stock Tracking**: Numerical inventory count
- **Availability Status**: In stock/out of stock toggle
- **Visual Indicators**: Color-coded stock status

### Search & Filter
- **Text Search**: Search by product name or description
- **Category Filter**: Filter by product category
- **Pagination**: Efficient loading of large product catalogs

## Security Features
- **Admin Authentication**: All endpoints require admin role
- **Input Validation**: Comprehensive validation using Zod schemas
- **File Upload Security**: Type and size validation for images
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## Usage Instructions

### Adding a New Product
1. Navigate to `/admin/products`
2. Click "Add Product" button
3. Fill in required fields (name, price, category, description, primary image)
4. Add optional fields (discounts, additional images, specifications)
5. Submit form

### Managing Discounts
- **Percentage Discount**: Enter value 0-100 in "Discount %" field
- **Fixed Discount**: Enter rupee amount in "Discount Amount" field
- System automatically calculates and displays savings

### Image Upload Process
1. Click upload button for primary or additional images
2. Select image file (JPEG, PNG, or WebP)
3. File is automatically uploaded and URL is stored
4. Images can be removed using the X button

### Specifications Management
1. Enter specification name and value
2. Click "Add" to include in product
3. Remove specifications using the X button
4. Specifications are stored as key-value pairs

## Testing
The system includes comprehensive tests (`test-admin-products.ts`) that verify:
- Product creation with all fields
- Product updates and modifications
- Search functionality
- Data integrity and cleanup

## File Structure
```
app/
├── admin/products/
│   ├── page.tsx (Product list)
│   ├── new/page.tsx (Add product)
│   └── [id]/edit/page.tsx (Edit product)
├── api/admin/
│   ├── products/route.ts (CRUD operations)
│   ├── products/[id]/route.ts (Individual product)
│   └── upload/route.ts (Image upload)
components/admin/
└── product-form.tsx (Main form component)
```

## Dependencies
- **Prisma**: Database ORM and migrations
- **Zod**: Input validation and type safety
- **Sonner**: Toast notifications
- **Radix UI**: Form components and interactions
- **Lucide React**: Icons and visual elements

The admin product management system is now fully functional and ready for production use.