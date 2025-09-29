import { NextRequest, NextResponse } from 'next/server'
import { NoticiaController } from '@/controllers/noticiaController'

export async function GET() {
  try {
    const noticias = await NoticiaController.getAllNoticias()
    return NextResponse.json(noticias)
  } catch (error) {
    console.error('Error getting noticias:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { titulo, imagem, descricao, fonte } = data

    if (!titulo || !descricao || !fonte) {
      return NextResponse.json(
        { message: 'Título, descrição e fonte são obrigatórios' },
        { status: 400 }
      )
    }

    const noticia = await NoticiaController.createNoticia({
      titulo,
      imagem,
      descricao,
      fonte
    })

    if (!noticia) {
      return NextResponse.json(
        { message: 'Erro ao criar notícia' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Notícia criada com sucesso',
      noticia
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating noticia:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



