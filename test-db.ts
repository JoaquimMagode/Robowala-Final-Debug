import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testAndSeed() {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    
    console.log(`Users: ${userCount}, Products: ${productCount}`)
    
    if (productCount === 0) {
      console.log('No products found, running seed...')
      
      // Import and run seed
      const { execSync } = require('child_process')
      execSync('npx prisma db seed', { stdio: 'inherit' })
    }
    
  } catch (error) {
    console.error('Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAndSeed()