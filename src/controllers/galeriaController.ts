import { db } from '@/lib/db'
import { GaleriaItem } from '@/types'

export class GaleriaController {
  static async getAllItems(): Promise<GaleriaItem[]> {
    try {
      return await db.galeriaItem.findMany({
        where: { ativo: true },
        orderBy: [
          { ordem: 'asc' },
          { createdAt: 'desc' }
        ]
      }) as GaleriaItem[]
    } catch (error) {
      console.error('Error getting galeria items:', error)
      return []
    }
  }

  static async getItemsByTipo(tipo: 'foto' | 'video'): Promise<GaleriaItem[]> {
    try {
      return await db.galeriaItem.findMany({
        where: { 
          ativo: true,
          tipo 
        },
        orderBy: [
          { ordem: 'asc' },
          { createdAt: 'desc' }
        ]
      }) as GaleriaItem[]
    } catch (error) {
      console.error('Error getting galeria items by type:', error)
      return []
    }
  }

  static async getItemById(id: string): Promise<GaleriaItem | null> {
    try {
      return await db.galeriaItem.findUnique({
        where: { id }
      }) as GaleriaItem | null
    } catch (error) {
      console.error('Error getting galeria item:', error)
      return null
    }
  }

  static async createItem(data: Omit<GaleriaItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<GaleriaItem | null> {
    try {
      const item = await db.galeriaItem.create({
        data
      })
      return item as GaleriaItem
    } catch (error) {
      console.error('Error creating galeria item:', error)
      return null
    }
  }

  static async updateItem(id: string, data: Partial<Omit<GaleriaItem, 'id' | 'createdAt' | 'updatedAt'>>): Promise<GaleriaItem | null> {
    try {
      const item = await db.galeriaItem.update({
        where: { id },
        data
      })
      return item as GaleriaItem
    } catch (error) {
      console.error('Error updating galeria item:', error)
      return null
    }
  }

  static async deleteItem(id: string): Promise<boolean> {
    try {
      await db.galeriaItem.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting galeria item:', error)
      return false
    }
  }
}

