import { db } from '@/lib/db'
import { Produto } from '@/types'

export class ProdutoController {
  // Crear produto
  static async createProduto(data: {
    nome: string
    descricao: string
    imagem: string
    preco: number
    empresaId: string
    ativo?: boolean
  }): Promise<Produto | null> {
    try {
      console.log('ProdutoController.createProduto called with:', data)
      
      const produto = await db.produto.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          imagem: data.imagem,
          preco: data.preco,
          empresaId: data.empresaId,
          ativo: data.ativo ?? true
        },
        include: {
          empresa: true
        }
      })
      
      console.log('Produto created successfully:', produto)
      return produto as Produto
    } catch (error) {
      console.error('Error creating produto in controller:', error)
      throw error // Re-throw to let the API handle it
    }
  }

  // Obtener todos los produtos
  static async getAllProdutos(): Promise<Produto[]> {
    try {
      const produtos = await db.produto.findMany({
        include: {
          empresa: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return produtos as Produto[]
    } catch (error) {
      console.error('Error getting produtos:', error)
      return []
    }
  }

  // Obtener produtos activos
  static async getActiveProdutos(): Promise<Produto[]> {
    try {
      const produtos = await db.produto.findMany({
        where: {
          ativo: true
        },
        include: {
          empresa: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return produtos as Produto[]
    } catch (error) {
      console.error('Error getting active produtos:', error)
      return []
    }
  }

  // Obtener produtos por empresa
  static async getProdutosByEmpresa(empresaId: string): Promise<Produto[]> {
    try {
      const produtos = await db.produto.findMany({
        where: {
          empresaId: empresaId
        },
        include: {
          empresa: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return produtos as Produto[]
    } catch (error) {
      console.error('Error getting produtos by empresa:', error)
      return []
    }
  }

  // Obtener produto por ID
  static async getProdutoById(id: string): Promise<Produto | null> {
    try {
      const produto = await db.produto.findUnique({
        where: { id },
        include: {
          empresa: true
        }
      })
      
      return produto as Produto | null
    } catch (error) {
      console.error('Error getting produto by id:', error)
      return null
    }
  }

  // Actualizar produto
  static async updateProduto(id: string, data: {
    nome?: string
    descricao?: string
    imagem?: string
    preco?: number
    ativo?: boolean
  }): Promise<Produto | null> {
    try {
      const produto = await db.produto.update({
        where: { id },
        data,
        include: {
          empresa: true
        }
      })
      
      return produto as Produto
    } catch (error) {
      console.error('Error updating produto:', error)
      return null
    }
  }

  // Eliminar produto
  static async deleteProduto(id: string): Promise<boolean> {
    try {
      await db.produto.delete({
        where: { id }
      })
      
      return true
    } catch (error) {
      console.error('Error deleting produto:', error)
      return false
    }
  }

  // Alternar estado activo/inactivo
  static async toggleProdutoStatus(id: string): Promise<Produto | null> {
    try {
      const produto = await db.produto.findUnique({
        where: { id }
      })

      if (!produto) return null

      const updatedProduto = await db.produto.update({
        where: { id },
        data: {
          ativo: !produto.ativo
        },
        include: {
          empresa: true
        }
      })
      
      return updatedProduto as Produto
    } catch (error) {
      console.error('Error toggling produto status:', error)
      return null
    }
  }
}
