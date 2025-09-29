import { db } from '@/lib/db'
import { Banner } from '@/types'

export class BannerController {
  static async getAllBanners(): Promise<Banner[]> {
    try {
      return await db.banner.findMany({
        orderBy: { ordem: 'asc' }
      })
    } catch (error) {
      console.error('Error getting banners:', error)
      return []
    }
  }

  static async getActiveBanners(): Promise<Banner[]> {
    try {
      return await db.banner.findMany({
        where: { ativo: true },
        orderBy: { ordem: 'asc' }
      })
    } catch (error) {
      console.error('Error getting active banners:', error)
      return []
    }
  }

  static async getBannerById(id: string): Promise<Banner | null> {
    try {
      return await db.banner.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Error getting banner:', error)
      return null
    }
  }

  static async createBanner(data: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner | null> {
    try {
      const banner = await db.banner.create({
        data
      })

      return banner
    } catch (error) {
      console.error('Error creating banner:', error)
      return null
    }
  }

  static async updateBanner(id: string, data: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Banner | null> {
    try {
      const banner = await db.banner.update({
        where: { id },
        data
      })

      return banner
    } catch (error) {
      console.error('Error updating banner:', error)
      return null
    }
  }

  static async deleteBanner(id: string): Promise<boolean> {
    try {
      await db.banner.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting banner:', error)
      return false
    }
  }
}



