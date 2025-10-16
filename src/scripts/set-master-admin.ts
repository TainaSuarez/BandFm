import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setMasterAdmin() {
  try {
    // Buscar el primer admin o un admin específico por email
    const email = process.argv[2] // Pasar email como argumento

    if (!email) {
      console.log('❌ Por favor, proporcione el email del administrador')
      console.log('Uso: npx ts-node src/scripts/set-master-admin.ts admin@example.com')
      process.exit(1)
    }

    const admin = await prisma.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      console.log(`❌ Administrador con email ${email} no encontrado`)
      process.exit(1)
    }

    // Actualizar admin a master
    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        isMaster: true,
        nome: admin.nome || 'Admin Master',
        ativo: true
      }
    })

    console.log('✅ Administrador actualizado com sucesso!')
    console.log(`📧 Email: ${updatedAdmin.email}`)
    console.log(`👤 Nome: ${updatedAdmin.nome}`)
    console.log(`🔒 Master: ${updatedAdmin.isMaster ? 'Sim' : 'Não'}`)
    console.log(`✔️  Status: ${updatedAdmin.ativo ? 'Ativo' : 'Inativo'}`)
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setMasterAdmin()

