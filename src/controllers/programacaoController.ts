import { db } from '@/lib/db'
import { ProgramacaoRadio } from '@/types'

export class ProgramacaoController {
  static async getAllProgramacao(): Promise<ProgramacaoRadio[]> {
    try {
      return await db.programacaoRadio.findMany({
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error getting programacao:', error)
      return []
    }
  }

  static async getProgramacaoById(id: string): Promise<ProgramacaoRadio | null> {
    try {
      return await db.programacaoRadio.findUnique({
        where: { id }
      })
    } catch (error) {
      console.error('Error getting programacao:', error)
      return null
    }
  }

  static async createProgramacao(data: Omit<ProgramacaoRadio, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProgramacaoRadio | null> {
    try {
      const programacao = await db.programacaoRadio.create({
        data
      })

      return programacao
    } catch (error) {
      console.error('Error creating programacao:', error)
      return null
    }
  }

  static async updateProgramacao(id: string, data: Partial<Omit<ProgramacaoRadio, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ProgramacaoRadio | null> {
    try {
      const programacao = await db.programacaoRadio.update({
        where: { id },
        data
      })

      return programacao
    } catch (error) {
      console.error('Error updating programacao:', error)
      return null
    }
  }

  static async deleteProgramacao(id: string): Promise<boolean> {
    try {
      await db.programacaoRadio.delete({
        where: { id }
      })
      return true
    } catch (error) {
      console.error('Error deleting programacao:', error)
      return false
    }
  }
}



