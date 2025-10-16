import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const adminController = {
  // Login de admin
  async login(credentials: { email: string; password: string }) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email: credentials.email }
      })

      if (!admin) {
        return null
      }

      // Verificar si está activo
      if (!admin.ativo) {
        throw new Error('Administrador inativo')
      }

      const isPasswordValid = await bcrypt.compare(credentials.password, admin.password)

      if (!isPasswordValid) {
        return null
      }

      return admin
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login')
    }
  },

  // Obtener todos los admins (solo admin master)
  async getAllAdmins() {
    try {
      const admins = await prisma.admin.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          isMaster: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
          // NO incluir password
        },
        orderBy: [
          { isMaster: 'desc' }, // Master primero
          { createdAt: 'desc' }
        ]
      })
      return admins
    } catch (error) {
      throw new Error('Erro ao buscar administradores')
    }
  },

  // Obtener admin por ID
  async getAdminById(id: string) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          nome: true,
          isMaster: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        }
      })
      return admin
    } catch (error) {
      throw new Error('Erro ao buscar administrador')
    }
  },

  // Crear nuevo admin (solo admin master)
  async createAdmin(data: { email: string; password: string; nome: string }) {
    try {
      // Verificar si el email ya existe
      const existingAdmin = await prisma.admin.findUnique({
        where: { email: data.email }
      })

      if (existingAdmin) {
        throw new Error('Este email já está cadastrado')
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10)

      const admin = await prisma.admin.create({
        data: {
          email: data.email,
          password: hashedPassword,
          nome: data.nome,
          isMaster: false, // Los nuevos admins nunca son master
          ativo: true
        },
        select: {
          id: true,
          email: true,
          nome: true,
          isMaster: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      return admin
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar administrador')
    }
  },

  // Actualizar admin (solo admin master, y no puede editar a otro master)
  async updateAdmin(id: string, data: { email?: string; password?: string; nome?: string; ativo?: boolean }, requesterId: string) {
    try {
      // Verificar que el admin a editar exista
      const adminToUpdate = await prisma.admin.findUnique({
        where: { id }
      })

      if (!adminToUpdate) {
        throw new Error('Administrador não encontrado')
      }

      // Verificar que el requester sea master
      const requester = await prisma.admin.findUnique({
        where: { id: requesterId }
      })

      if (!requester?.isMaster) {
        throw new Error('Apenas o administrador master pode editar outros administradores')
      }

      // NO permitir editar a otro master
      if (adminToUpdate.isMaster && adminToUpdate.id !== requesterId) {
        throw new Error('Não é possível editar outro administrador master')
      }

      // Preparar datos para actualizar
      const updateData: any = {}
      
      if (data.email) {
        // Verificar que el email no esté en uso por otro admin
        const existingEmail = await prisma.admin.findUnique({
          where: { email: data.email }
        })
        if (existingEmail && existingEmail.id !== id) {
          throw new Error('Este email já está em uso')
        }
        updateData.email = data.email
      }

      if (data.nome) updateData.nome = data.nome
      if (data.ativo !== undefined) updateData.ativo = data.ativo
      
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10)
      }

      const admin = await prisma.admin.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          nome: true,
          isMaster: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      return admin
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao atualizar administrador')
    }
  },

  // Eliminar admin (solo admin master, y nunca puede eliminar a otro master)
  async deleteAdmin(id: string, requesterId: string) {
    try {
      // Verificar que el admin a eliminar exista
      const adminToDelete = await prisma.admin.findUnique({
        where: { id }
      })

      if (!adminToDelete) {
        throw new Error('Administrador não encontrado')
      }

      // Verificar que el requester sea master
      const requester = await prisma.admin.findUnique({
        where: { id: requesterId }
      })

      if (!requester?.isMaster) {
        throw new Error('Apenas o administrador master pode excluir outros administradores')
      }

      // NO permitir eliminar a un master
      if (adminToDelete.isMaster) {
        throw new Error('Não é possível excluir um administrador master')
      }

      await prisma.admin.delete({
        where: { id }
      })

      return { message: 'Administrador excluído com sucesso' }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao excluir administrador')
    }
  }
}
