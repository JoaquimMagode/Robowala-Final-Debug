import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateImages() {
  try {
    console.log('Updating all product images to placeholder...')
    
    await prisma.product.updateMany({
      data: {
        image: '/placeholder.jpg'
      }
    })
    
    console.log('✅ All product images updated to placeholder')
  } catch (error) {
    console.error('❌ Error updating images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateImages()