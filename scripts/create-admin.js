const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@bandfm.com' }
    })

    if (existingAdmin) {
      console.log('Admin already exists!')
      return
    }

    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@bandfm.com',
        password: hashedPassword
      }
    })

    console.log('Admin created successfully!')
    console.log('Email: admin@bandfm.com')
    console.log('Password: admin123')
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



