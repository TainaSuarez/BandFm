import { db } from '@/lib/db'
import { Noticia } from '@/types'

export class NoticiaController {
  static async getAllNoticias(): Promise<Noticia[]> {
    try {
      return await db.noticia.findMany({
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error getting noticias:', error)
      return []
    }
  }

  static async getNoticiaById(id: string): Promise<Noticia | null> {
    try {
      return await db.noticia.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Error getting noticia:', error)
      return null
    }
  }

  static async createNoticia(data: Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>): Promise<Noticia | null> {
    try {
      const noticia = await db.noticia.create({
        data
      })

      return noticia
    } catch (error) {
      console.error('Error creating noticia:', error)
      return null
    }
  }

  static async updateNoticia(id: string, data: Partial<Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Noticia | null> {
    try {
      const noticia = await db.noticia.update({
        where: { id },
        data
      })

      return noticia
    } catch (error) {
      console.error('Error updating noticia:', error)
      return null
    }
  }

  static async deleteNoticia(id: string): Promise<boolean> {
    try {
      await db.noticia.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting noticia:', error)
      return false
    }
  }
}



