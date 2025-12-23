import { PrismaClient as SQLiteClient } from '@prisma/client'
import { PrismaClient as PostgresClient } from '@prisma/client'

// SQLite client (local)
const sqlite = new SQLiteClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
})

// PostgreSQL client (production)
const postgres = new PostgresClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_URL // Your Vercel Postgres URL
    }
  }
})

async function migrateData() {
  try {
    console.log('🔄 Starting data migration...')

    // Export users
    const users = await sqlite.user.findMany()
    console.log(`📤 Exporting ${users.length} users...`)
    
    for (const user of users) {
      await postgres.user.upsert({
        where: { email: user.email },
        update: user,
        create: user
      })
    }

    // Export products
    const products = await sqlite.product.findMany()
    console.log(`📤 Exporting ${products.length} products...`)
    
    for (const product of products) {
      await postgres.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product
      })
    }

    // Export orders
    const orders = await sqlite.order.findMany({
      include: { items: true }
    })
    console.log(`📤 Exporting ${orders.length} orders...`)
    
    for (const order of orders) {
      const { items, ...orderData } = order
      
      await postgres.order.upsert({
        where: { orderNumber: order.orderNumber },
        update: orderData,
        create: orderData
      })

      // Export order items
      for (const item of items) {
        await postgres.orderItem.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
      }
    }

    console.log('✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await sqlite.$disconnect()
    await postgres.$disconnect()
  }
}

migrateData()