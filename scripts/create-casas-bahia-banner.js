const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Create banner with Casas Bahia image
    const banner = await prisma.banner.create({
      data: {
        titulo: 'Banner Casas Bahia',
        imagem: 'https://www.caruarushopping.com/wp-content/uploads/2019/09/Casas-Bahia.jpg',
        link: null,
        ativo: true,
        ordem: 1
      }
    })

    console.log('Banner Casas Bahia criado com sucesso!')
    console.log('ID:', banner.id)
    console.log('Imagem:', banner.imagem)
  } catch (error) {
    console.error('Erro ao criar banner:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



