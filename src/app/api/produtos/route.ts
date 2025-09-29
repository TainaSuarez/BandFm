import { NextRequest, NextResponse } from 'next/server'
import { ProdutoController } from '@/controllers/produtoController'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'
    const empresaId = searchParams.get('empresaId')
    
    let produtos
    
    if (empresaId) {
      produtos = await ProdutoController.getProdutosByEmpresa(empresaId)
    } else if (onlyActive) {
      produtos = await ProdutoController.getActiveProdutos()
    } else {
      produtos = await ProdutoController.getAllProdutos()
    }
    
    return NextResponse.json(produtos)
  } catch (error) {
    console.error('Error getting produtos:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received produto data:', data)
    
    const { nome, descricao, imagem, preco, empresaId, ativo } = data

    // Validações
    if (!nome || !descricao || !imagem || !preco || !empresaId) {
      console.log('Missing required fields:', { nome, descricao, imagem, preco, empresaId })
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar preço
    const precoNumber = parseFloat(preco)
    if (isNaN(precoNumber) || precoNumber < 0) {
      return NextResponse.json(
        { message: 'Preço deve ser um número válido maior que zero' },
        { status: 400 }
      )
    }

    const produtoData = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      imagem: imagem.trim(),
      preco: precoNumber,
      empresaId,
      ativo: ativo !== undefined ? ativo : true
    }

    console.log('Creating produto with data:', produtoData)

    const produto = await ProdutoController.createProduto(produtoData)

    if (!produto) {
      return NextResponse.json(
        { message: 'Erro ao criar produto' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Produto criado com sucesso',
      produto
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating produto:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor', 
        error: error.message || 'Erro desconhecido',
        details: error.stack
      },
      { status: 500 }
    )
  }
}
