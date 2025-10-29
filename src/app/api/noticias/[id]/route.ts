import { NextRequest, NextResponse } from 'next/server'
import { NoticiaController } from '@/controllers/noticiaController'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const noticia = await NoticiaController.getNoticiaById(id)
    
    if (!noticia) {
      return NextResponse.json(
        { message: 'Notícia não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(noticia)
  } catch (error) {
    console.error('Error getting noticia:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const noticia = await NoticiaController.updateNoticia(id, data)

    if (!noticia) {
      return NextResponse.json(
        { message: 'Notícia não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Notícia atualizada com sucesso',
      noticia
    })
  } catch (error) {
    console.error('Error updating noticia:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await NoticiaController.deleteNoticia(id)

    if (!success) {
      return NextResponse.json(
        { message: 'Notícia não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Notícia excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting noticia:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



