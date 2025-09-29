import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { Empresa } from '@/types'

export class EmpresaController {
  static async getAllEmpresas(): Promise<Empresa[]> {
    try {
      return await db.empresa.findMany({
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error getting empresas:', error)
      return []
    }
  }

  static async getEmpresaById(id: string): Promise<Empresa | null> {
    try {
      return await db.empresa.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Error getting empresa:', error)
      return null
    }
  }

  static async getEmpresaByEmail(email: string): Promise<Empresa | null> {
    try {
      return await db.empresa.findUnique({
        where: { email }
      })
    } catch (error) {
      console.error('Error getting empresa by email:', error)
      return null
    }
  }

  static async createEmpresa(data: Omit<Empresa, 'id' | 'createdAt' | 'updatedAt'>): Promise<Empresa | null> {
    try {
      const hashedPassword = await hashPassword(data.senha)
      
      const empresa = await db.empresa.create({
        data: {
          ...data,
          senha: hashedPassword
        }
      })

      return empresa
    } catch (error) {
      console.error('Error creating empresa:', error)
      return null
    }
  }

  static async updateEmpresa(id: string, data: Partial<Omit<Empresa, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Empresa | null> {
    try {
      const updateData = { ...data }
      
      // Hash password if it's being updated
      if (data.senha) {
        updateData.senha = await hashPassword(data.senha)
      }

      const empresa = await db.empresa.update({
        where: { id },
        data: updateData
      })

      return empresa
    } catch (error) {
      console.error('Error updating empresa:', error)
      return null
    }
  }

  static async deleteEmpresa(id: string): Promise<boolean> {
    try {
      await db.empresa.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting empresa:', error)
      return false
    }
  }
}
