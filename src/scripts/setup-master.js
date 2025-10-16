const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupMasterAdmin() {
  try {
    console.log('🔧 Configurando administrador master...\n')

    // Buscar todos los admins
    const admins = await prisma.admin.findMany()

    if (admins.length === 0) {
      console.log('❌ No hay administradores en la base de datos')
      console.log('💡 Cree un administrador primero en /login\n')
      return
    }

    // Actualizar todos los admins para tener los nuevos campos
    console.log(`📋 Encontrados ${admins.length} administrador(es)\n`)

    for (const admin of admins) {
      const isMaster = admins.indexOf(admin) === 0 // El primero será master
      
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          nome: admin.nome || 'Admin',
          isMaster: isMaster,
          ativo: true
        }
      })

      console.log(`${isMaster ? '🔒' : '👤'} ${admin.email} - ${isMaster ? 'MASTER' : 'Admin'}`)
    }

    console.log('\n✅ Configuração concluída com sucesso!')
    console.log('\n📝 Detalhes:')
    console.log(`   - Admin Master: ${admins[0].email}`)
    console.log(`   - Outros admins: ${admins.length - 1}`)
    console.log('\n🚀 Reinicie o servidor e faça login novamente\n')

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupMasterAdmin()

