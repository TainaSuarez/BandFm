import { NextRequest, NextResponse } from 'next/server'
import { PromocaoController } from '@/controllers/promocaoController'

export async function GET() {
  try {
    const promocoes = await PromocaoController.getAllPromocoes()
    return NextResponse.json(promocoes)
  } catch (error) {
    console.error('Error getting promocoes:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { titulo, descricao, imagem } = data

    if (!titulo || !descricao) {
      return NextResponse.json(
        { message: 'Título e descrição são obrigatórios' },
        { status: 400 }
      )
    }

    const promocao = await PromocaoController.createPromocao({
      titulo,
      descricao,
      imagem
    })

    if (!promocao) {
      return NextResponse.json(
        { message: 'Erro ao criar promoção' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Promoção criada com sucesso',
      promocao
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating promocao:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



