import { db } from '@/lib/db'
import { Podcast } from '@/types'

export class PodcastController {
  // Crear podcast
  static async createPodcast(data: {
    titulo: string
    descricao: string
    imagem: string
    audioUrl: string
    duracao?: string
    ativo?: boolean
  }): Promise<Podcast | null> {
    try {
      console.log('PodcastController.createPodcast called with:', data)
      
      const podcast = await db.podcast.create({
        data: {
          titulo: data.titulo,
          descricao: data.descricao,
          imagem: data.imagem,
          audioUrl: data.audioUrl,
          duracao: data.duracao || null,
          ativo: data.ativo ?? true
        }
      })
      
      console.log('Podcast created successfully:', podcast)
      return podcast as Podcast
    } catch (error) {
      console.error('Error creating podcast in controller:', error)
      throw error
    }
  }

  // Obtener todos los podcasts
  static async getAllPodcasts(): Promise<Podcast[]> {
    try {
      const podcasts = await db.podcast.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return podcasts as Podcast[]
    } catch (error) {
      console.error('Error getting podcasts:', error)
      return []
    }
  }

  // Obtener podcasts activos
  static async getActivePodcasts(): Promise<Podcast[]> {
    try {
      const podcasts = await db.podcast.findMany({
        where: {
          ativo: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return podcasts as Podcast[]
    } catch (error) {
      console.error('Error getting active podcasts:', error)
      return []
    }
  }

  // Obtener podcast por ID
  static async getPodcastById(id: string): Promise<Podcast | null> {
    try {
      const podcast = await db.podcast.findUnique({
        where: { id }
      })
      
      return podcast as Podcast | null
    } catch (error) {
      console.error('Error getting podcast by id:', error)
      return null
    }
  }

  // Actualizar podcast
  static async updatePodcast(id: string, data: {
    titulo?: string
    descricao?: string
    imagem?: string
    audioUrl?: string
    duracao?: string
    ativo?: boolean
  }): Promise<Podcast | null> {
    try {
      const podcast = await db.podcast.update({
        where: { id },
        data
      })
      
      return podcast as Podcast
    } catch (error) {
      console.error('Error updating podcast:', error)
      return null
    }
  }

  // Eliminar podcast
  static async deletePodcast(id: string): Promise<boolean> {
    try {
      await db.podcast.delete({
        where: { id }
      })
      
      return true
    } catch (error) {
      console.error('Error deleting podcast:', error)
      return false
    }
  }

  // Alternar estado activo/inactivo
  static async togglePodcastStatus(id: string): Promise<Podcast | null> {
    try {
      const podcast = await db.podcast.findUnique({
        where: { id }
      })

      if (!podcast) return null

      const updatedPodcast = await db.podcast.update({
        where: { id },
        data: {
          ativo: !podcast.ativo
        }
      })
      
      return updatedPodcast as Podcast
    } catch (error) {
      console.error('Error toggling podcast status:', error)
      return null
    }
  }
}
