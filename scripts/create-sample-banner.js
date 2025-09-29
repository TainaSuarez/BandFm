const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Create sample banner
    const banner = await prisma.banner.create({
      data: {
        titulo: 'Banner de Teste - Band FM',
        imagem: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
        link: 'https://bandfm.com',
        ativo: true,
        ordem: 1
      }
    })

    console.log('Banner de teste criado com sucesso!')
    console.log('ID:', banner.id)
    console.log('Título:', banner.titulo)
  } catch (error) {
    console.error('Erro ao criar banner de teste:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



