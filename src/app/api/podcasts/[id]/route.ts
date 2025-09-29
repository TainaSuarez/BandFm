import { NextRequest, NextResponse } from 'next/server'
import { PodcastController } from '@/controllers/podcastController'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const podcast = await PodcastController.getPodcastById(id)
    
    if (!podcast) {
      return NextResponse.json(
        { message: 'Podcast não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(podcast)
  } catch (error) {
    console.error('Error getting podcast:', error)
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
    console.log('Updating podcast:', id, data)
    
    const { titulo, descricao, imagem, audioUrl, duracao, ativo } = data

    // Validações opcionais
    const updateData: any = {}
    
    if (titulo !== undefined) {
      if (!titulo.trim()) {
        return NextResponse.json(
          { message: 'Título não pode estar vazio' },
          { status: 400 }
        )
      }
      updateData.titulo = titulo.trim()
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
      const isValidImageUrl = imagem.trim().startsWith('http') || imagem.trim().startsWith('/uploads/')
      if (!isValidImageUrl) {
        return NextResponse.json(
          { message: 'URL da imagem deve ser válida ou arquivo local' },
          { status: 400 }
        )
      }
      updateData.imagem = imagem.trim()
    }
    
    if (audioUrl !== undefined) {
      if (!audioUrl.trim()) {
        return NextResponse.json(
          { message: 'URL do áudio não pode estar vazia' },
          { status: 400 }
        )
      }
      const isValidAudioUrl = audioUrl.trim().startsWith('http') || audioUrl.trim().startsWith('/uploads/')
      if (!isValidAudioUrl) {
        return NextResponse.json(
          { message: 'URL do áudio deve ser válida ou arquivo local' },
          { status: 400 }
        )
      }
      updateData.audioUrl = audioUrl.trim()
    }
    
    if (duracao !== undefined) {
      updateData.duracao = duracao?.trim() || null
    }
    
    if (ativo !== undefined) {
      updateData.ativo = Boolean(ativo)
    }

    const podcast = await PodcastController.updatePodcast(id, updateData)

    if (!podcast) {
      return NextResponse.json(
        { message: 'Podcast não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Podcast atualizado com sucesso',
      podcast
    })
  } catch (error) {
    console.error('Error updating podcast:', error)
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
    const success = await PodcastController.deletePodcast(id)

    if (!success) {
      return NextResponse.json(
        { message: 'Podcast não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Podcast excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting podcast:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
