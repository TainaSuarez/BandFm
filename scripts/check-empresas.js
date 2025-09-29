const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Checking empresas in database...')

  try {
    const empresas = await prisma.empresa.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        categoria: true
      }
    })

    console.log(`Found ${empresas.length} empresas:`)
    empresas.forEach((empresa, index) => {
      console.log(`${index + 1}. ID: ${empresa.id}`)
      console.log(`   Nome: ${empresa.nome}`)
      console.log(`   Email: ${empresa.email}`)
      console.log(`   Categoria: ${empresa.categoria}`)
      console.log('---')
    })

    if (empresas.length === 0) {
      console.log('❌ No empresas found in database!')
      console.log('Run: node scripts/create-sample-empresa-produtos.js')
    } else {
      console.log('✅ Empresas found successfully!')
    }

  } catch (error) {
    console.error('❌ Error checking empresas:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

