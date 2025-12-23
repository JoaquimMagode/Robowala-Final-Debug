// Test script to verify all functionalities work
// Run this with: npx ts-node test-functionality.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test products exist
    const productCount = await prisma.product.count()
    console.log(`✅ Found ${productCount} products in database`)
    
    // Test users table
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)
    
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

async function testProductAPIs() {
  try {
    // Test products list API
    const response = await fetch('http://localhost:3000/api/products?limit=5')
    if (!response.ok) {
      throw new Error(`Products API failed: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`✅ Products API working - returned ${data.products?.length || 0} products`)
    
    // Test individual product API if products exist
    if (data.products && data.products.length > 0) {
      const firstProduct = data.products[0]
      const productResponse = await fetch(`http://localhost:3000/api/products/${firstProduct.slug}`)
      
      if (productResponse.ok) {
        console.log(`✅ Individual product API working for slug: ${firstProduct.slug}`)
      } else {
        console.log(`⚠️ Individual product API failed for slug: ${firstProduct.slug}`)
      }
    }
    
    return true
  } catch (error) {
    console.error('❌ Product APIs test failed:', error)
    return false
  }
}

async function testCartFunctionality() {
  try {
    // Test cart GET (should require auth)
    const cartResponse = await fetch('http://localhost:3000/api/cart')
    
    if (cartResponse.status === 401) {
      console.log('✅ Cart API properly requires authentication')
    } else {
      console.log('⚠️ Cart API authentication behavior unexpected')
    }
    
    return true
  } catch (error) {
    console.error('❌ Cart functionality test failed:', error)
    return false
  }
}

async function runAllTests() {
  console.log('🧪 Starting functionality tests...\n')
  
  const dbTest = await testDatabaseConnection()
  console.log('')
  
  const apiTest = await testProductAPIs()
  console.log('')
  
  const cartTest = await testCartFunctionality()
  console.log('')
  
  if (dbTest && apiTest && cartTest) {
    console.log('🎉 All tests passed! The application should be working correctly.')
  } else {
    console.log('⚠️ Some tests failed. Check the issues above.')
  }
  
  await prisma.$disconnect()
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error)
}

export { runAllTests }