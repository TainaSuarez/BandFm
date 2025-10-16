import { db } from '@/lib/db'
import { EnqueteMusicaVoto, EnqueteResultado } from '@/types'

const GENEROS_VALIDOS = ['Sertanejo', 'Pagode', 'MBP', 'Gaúcha', 'Latina', 'Rock']

export class EnqueteMusicaController {
  static async votar(genero: string, ipAddress?: string): Promise<EnqueteMusicaVoto | null> {
    try {
      if (!GENEROS_VALIDOS.includes(genero)) {
        throw new Error('Gênero inválido')
      }

      const voto = await db.enqueteMusicaVoto.create({
        data: {
          genero,
          ipAddress
        }
      })

      return voto as EnqueteMusicaVoto
    } catch (error) {
      console.error('Error creating vote:', error)
      return null
    }
  }

  static async getResultados(): Promise<EnqueteResultado[]> {
    try {
      // Contar votos por género
      const votos = await db.enqueteMusicaVoto.groupBy({
        by: ['genero'],
        _count: {
          id: true
        }
      })

      // Calcular total de votos
      const totalVotos = votos.reduce((acc, curr) => acc + curr._count.id, 0)

      // Crear resultado para todos los géneros, incluso los que no tienen votos
      const resultados: EnqueteResultado[] = GENEROS_VALIDOS.map(genero => {
        const votoGenero = votos.find(v => v.genero === genero)
        const quantidade = votoGenero ? votoGenero._count.id : 0
        const porcentagem = totalVotos > 0 ? (quantidade / totalVotos) * 100 : 0

        return {
          genero,
          votos: quantidade,
          porcentagem: Math.round(porcentagem * 10) / 10 // Redondear a 1 decimal
        }
      })

      return resultados
    } catch (error) {
      console.error('Error getting results:', error)
      return GENEROS_VALIDOS.map(genero => ({
        genero,
        votos: 0,
        porcentagem: 0
      }))
    }
  }

  static async verificarJaVotou(ipAddress: string): Promise<boolean> {
    try {
      const voto = await db.enqueteMusicaVoto.findFirst({
        where: {
          ipAddress
        }
      })

      return voto !== null
    } catch (error) {
      console.error('Error checking vote:', error)
      return false
    }
  }
}

