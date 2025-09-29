import { NextRequest, NextResponse } from 'next/server'
import { ProdutoController } from '@/controllers/produtoController'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await ProdutoController.getProdutoById(params.id)
    
    if (!produto) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(produto)
  } catch (error) {
    console.error('Error getting produto:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    console.log('Updating produto:', params.id, data)
    
    const { nome, descricao, imagem, preco, ativo } = data

    // Validações opcionais
    const updateData: any = {}
    
    if (nome !== undefined) {
      if (!nome.trim()) {
        return NextResponse.json(
          { message: 'Nome não pode estar vazio' },
          { status: 400 }
        )
      }
      updateData.nome = nome.trim()
    }
    
    if (descricao !== undefined) {
      if (!descricao.trim()) {
        return NextResponse.json(
          { message: 'Descrição não pode estar vazia' },
          { status: 400 }
        )
      }
      updateData.descricao = descricao.trim()
    }
    
    if (imagem !== undefined) {
      if (!imagem.trim()) {
        return NextResponse.json(
          { message: 'URL da imagem não pode estar vazia' },
          { status: 400 }
        )
      }
      updateData.imagem = imagem.trim()
    }
    
    if (preco !== undefined) {
      const precoNumber = parseFloat(preco)
      if (isNaN(precoNumber) || precoNumber < 0) {
        return NextResponse.json(
          { message: 'Preço deve ser um número válido maior que zero' },
          { status: 400 }
        )
      }
      updateData.preco = precoNumber
    }
    
    if (ativo !== undefined) {
      updateData.ativo = Boolean(ativo)
    }

    const produto = await ProdutoController.updateProduto(params.id, updateData)

    if (!produto) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Produto atualizado com sucesso',
      produto
    })
  } catch (error) {
    console.error('Error updating produto:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await ProdutoController.deleteProduto(params.id)

    if (!success) {
      return NextResponse.json(
        { message: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Produto excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting produto:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

