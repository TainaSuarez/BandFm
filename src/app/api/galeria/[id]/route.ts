import { NextRequest, NextResponse } from 'next/server'
import { GaleriaController } from '@/controllers/galeriaController'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await GaleriaController.getItemById(params.id)
    
    if (!item) {
      return NextResponse.json(
        { message: 'Item não encontrado' },
        { status: 404 }
      )
    }

    const itemSerializado = {
      ...item,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt
    }

    return NextResponse.json(itemSerializado)
  } catch (error) {
    console.error('Error getting galeria item:', error)
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
    
    const item = await GaleriaController.updateItem(params.id, data)

    if (!item) {
      return NextResponse.json(
        { message: 'Item não encontrado' },
        { status: 404 }
      )
    }

    const itemSerializado = {
      ...item,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt
    }

    return NextResponse.json({
      message: 'Item atualizado com sucesso',
      item: itemSerializado
    })
  } catch (error) {
    console.error('Error updating galeria item:', error)
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
    const success = await GaleriaController.deleteItem(params.id)

    if (!success) {
      return NextResponse.json(
        { message: 'Item não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Item excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting galeria item:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

