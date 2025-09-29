const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testando conexão com a base de dados...')
    
    // Test database connection
    const banners = await prisma.banner.findMany()
    console.log(`✅ Conexão OK! Encontrados ${banners.length} banners`)
    
    if (banners.length > 0) {
      console.log('Banners existentes:')
      banners.forEach((banner, index) => {
        console.log(`${index + 1}. ${banner.titulo} (Ordem: ${banner.ordem}, Ativo: ${banner.ativo})`)
      })
    }
  } catch (error) {
    console.error('❌ Erro de conexão:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



