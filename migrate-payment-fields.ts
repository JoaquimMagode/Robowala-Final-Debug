import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Running migration to add payment fields...')
    
    // Add payment fields to existing orders
    await prisma.$executeRaw`
      ALTER TABLE "Order" 
      ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT NOT NULL DEFAULT 'COD',
      ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING'
    `
    
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})