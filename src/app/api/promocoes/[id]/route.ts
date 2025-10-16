import { NextRequest, NextResponse } from 'next/server'
import { PromocaoController } from '@/controllers/promocaoController'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const promocao = await PromocaoController.getPromocaoById(params.id)
    
    if (!promocao) {
      return NextResponse.json(
        { message: 'Promoção não encontrada' },
        { status: 404 }
      )
    }

    // Convertir fechas a strings ISO
    const promocaoSerializada = {
      ...promocao,
      createdAt: promocao.createdAt instanceof Date ? promocao.createdAt.toISOString() : promocao.createdAt,
      updatedAt: promocao.updatedAt instanceof Date ? promocao.updatedAt.toISOString() : promocao.updatedAt
    }

    return NextResponse.json(promocaoSerializada)
  } catch (error) {
    console.error('Error getting promocao:', error)
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
    
    const promocao = await PromocaoController.updatePromocao(params.id, data)

    if (!promocao) {
      return NextResponse.json(
        { message: 'Promoção não encontrada' },
        { status: 404 }
      )
    }

    // Convertir fechas a strings ISO
    const promocaoSerializada = {
      ...promocao,
      createdAt: promocao.createdAt instanceof Date ? promocao.createdAt.toISOString() : promocao.createdAt,
      updatedAt: promocao.updatedAt instanceof Date ? promocao.updatedAt.toISOString() : promocao.updatedAt
    }

    return NextResponse.json({
      message: 'Promoção atualizada com sucesso',
      promocao: promocaoSerializada
    })
  } catch (error) {
    console.error('Error updating promocao:', error)
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
    const success = await PromocaoController.deletePromocao(params.id)

    if (!success) {
      return NextResponse.json(
        { message: 'Promoção não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Promoção excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting promocao:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



