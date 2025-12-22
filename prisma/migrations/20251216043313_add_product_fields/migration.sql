-- AlterTable
ALTER TABLE "Product" ADD COLUMN "brand" TEXT;
ALTER TABLE "Product" ADD COLUMN "datasheet" TEXT;
ALTER TABLE "Product" ADD COLUMN "relatedProducts" TEXT;
ALTER TABLE "Product" ADD COLUMN "subcategory" TEXT;
ALTER TABLE "Product" ADD COLUMN "subcategorySlug" TEXT;

-- CreateIndex
CREATE INDEX "Product_subcategorySlug_idx" ON "Product"("subcategorySlug");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");
