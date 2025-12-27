import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function addStockField() {
  await prisma.product.updateMany({
    data: {
      stock: 25
    }
  })
  console.log("✅ Added stock field to all products")
}

addStockField()
  .catch(console.error)
  .finally(() => prisma.$disconnect())