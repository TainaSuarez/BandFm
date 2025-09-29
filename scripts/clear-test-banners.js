const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Delete all banners
    const deleted = await prisma.banner.deleteMany({})
    
    console.log(`${deleted.count} banners de teste removidos com sucesso!`)
  } catch (error) {
    console.error('Erro ao remover banners de teste:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



