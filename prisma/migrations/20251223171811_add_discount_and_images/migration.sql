-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL NOT NULL,
    "discountPercent" REAL,
    "discountAmount" REAL,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "images" TEXT,
    "category" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "subcategory" TEXT,
    "subcategorySlug" TEXT,
    "brand" TEXT,
    "badge" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "specifications" TEXT NOT NULL,
    "datasheet" TEXT,
    "relatedProducts" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("badge", "brand", "category", "categorySlug", "createdAt", "datasheet", "description", "id", "image", "inStock", "name", "originalPrice", "price", "rating", "relatedProducts", "reviews", "slug", "specifications", "subcategory", "subcategorySlug", "updatedAt") SELECT "badge", "brand", "category", "categorySlug", "createdAt", "datasheet", "description", "id", "image", "inStock", "name", "originalPrice", "price", "rating", "relatedProducts", "reviews", "slug", "specifications", "subcategory", "subcategorySlug", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
CREATE INDEX "Product_categorySlug_idx" ON "Product"("categorySlug");
CREATE INDEX "Product_subcategorySlug_idx" ON "Product"("subcategorySlug");
CREATE INDEX "Product_brand_idx" ON "Product"("brand");
CREATE INDEX "Product_inStock_idx" ON "Product"("inStock");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
