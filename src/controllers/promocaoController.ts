import { db } from '@/lib/db'
import { Promocao } from '@/types'

export class PromocaoController {
  static async getAllPromocoes(): Promise<Promocao[]> {
    try {
      return await db.promocao.findMany({
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error getting promocoes:', error)
      return []
    }
  }

  static async getPromocaoById(id: string): Promise<Promocao | null> {
    try {
      return await db.promocao.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Error getting promocao:', error)
      return null
    }
  }

  static async createPromocao(data: Omit<Promocao, 'id' | 'createdAt' | 'updatedAt'>): Promise<Promocao | null> {
    try {
      const promocao = await db.promocao.create({
        data
      })

      return promocao
    } catch (error) {
      console.error('Error creating promocao:', error)
      return null
    }
  }

  static async updatePromocao(id: string, data: Partial<Omit<Promocao, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Promocao | null> {
    try {
      const promocao = await db.promocao.update({
        where: { id },
        data
      })

      return promocao
    } catch (error) {
      console.error('Error updating promocao:', error)
      return null
    }
  }

  static async deletePromocao(id: string): Promise<boolean> {
    try {
      await db.promocao.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting promocao:', error)
      return false
    }
  }
}



