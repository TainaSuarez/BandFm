const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Creating sample empresa and produtos...')

  try {
    // Create sample empresa
    const hashedPassword = await bcrypt.hash('empresa123', 10)
    
    const empresa = await prisma.empresa.create({
      data: {
        nome: 'Restaurante Sabor da Casa',
        foto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        email: 'contato@sabordacasa.com',
        senha: hashedPassword,
        descricao: 'O melhor da culinária caseira com pratos tradicionais e sabores únicos. Ambiente acolhedor e familiar.',
        categoria: 'Restaurante'
      }
    })

    console.log('Empresa created:', empresa.nome)

    // Create sample produtos for the empresa
    const produtos = [
      {
        nome: 'Feijoada Completa',
        descricao: 'Feijoada tradicional com linguiça, carne seca, bacon e todos os acompanhamentos.',
        imagem: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=400',
        preco: 28.90,
        empresaId: empresa.id
      },
      {
        nome: 'Picanha na Chapa',
        descricao: 'Picanha grelhada na chapa com arroz, feijão, farofa e vinagrete.',
        imagem: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400',
        preco: 35.50,
        empresaId: empresa.id
      },
      {
        nome: 'Peixe Grelhado',
        descricao: 'Peixe fresco grelhado com legumes e arroz de brócolis.',
        imagem: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
        preco: 24.90,
        empresaId: empresa.id
      },
      {
        nome: 'Lasanha da Casa',
        descricao: 'Lasanha de carne com molho especial da casa e queijo gratinado.',
        imagem: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400',
        preco: 22.90,
        empresaId: empresa.id
      }
    ]

    for (const produtoData of produtos) {
      const produto = await prisma.produto.create({
        data: produtoData
      })
      console.log('Produto created:', produto.nome)
    }

    // Create another empresa
    const empresa2 = await prisma.empresa.create({
      data: {
        nome: 'TechStore Livramento',
        foto: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        email: 'vendas@techstore.com',
        senha: hashedPassword,
        descricao: 'Sua loja de tecnologia com os melhores produtos e preços da região.',
        categoria: 'Tecnologia'
      }
    })

    console.log('Empresa 2 created:', empresa2.nome)

    const produtos2 = [
      {
        nome: 'Smartphone Galaxy',
        descricao: 'Smartphone Android com 128GB, câmera tripla e tela de 6.1 polegadas.',
        imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        preco: 899.90,
        empresaId: empresa2.id
      },
      {
        nome: 'Notebook Gamer',
        descricao: 'Notebook para jogos com placa de vídeo dedicada, 16GB RAM e SSD 512GB.',
        imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        preco: 2499.90,
        empresaId: empresa2.id
      },
      {
        nome: 'Fone Bluetooth',
        descricao: 'Fone de ouvido sem fio com cancelamento de ruído e bateria de 30h.',
        imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        preco: 199.90,
        empresaId: empresa2.id
      }
    ]

    for (const produtoData of produtos2) {
      const produto = await prisma.produto.create({
        data: produtoData
      })
      console.log('Produto created:', produto.nome)
    }

    console.log('✅ Sample empresas and produtos created successfully!')
    console.log('\nLogin credentials:')
    console.log('Empresa 1: contato@sabordacasa.com / empresa123')
    console.log('Empresa 2: vendas@techstore.com / empresa123')

  } catch (error) {
    console.error('❌ Error creating sample data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

