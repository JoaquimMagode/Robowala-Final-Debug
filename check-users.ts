import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true
      }
    })
    
    console.log('Users in database:')
    users.forEach(user => {
      console.log(`- Email: ${user.email}`)
      console.log(`  Name: ${user.name}`)
      console.log(`  Role: ${user.role}`)
      console.log(`  Password hash: ${user.password?.substring(0, 20)}...`)
      console.log('')
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()