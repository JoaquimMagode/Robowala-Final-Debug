
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function verify() {
    const email = "test@example.com"
    const password = "test123"

    console.log(`Verifying user: ${email}`)

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.error("User not found!")
        return
    }

    console.log("User found:", user.id, user.role)
    console.log("Stored hash:", user.password)

    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {
        console.log("✅ Password match successful!")
    } else {
        console.error("❌ Password match failed!")

        // Debug: Generate what the hash should be
        const newHash = await bcrypt.hash(password, 12)
        console.log("Expected hash format example:", newHash)
    }
}

verify()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
