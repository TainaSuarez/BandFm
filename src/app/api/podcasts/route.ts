import { NextRequest, NextResponse } from 'next/server'
import { PodcastController } from '@/controllers/podcastController'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'
    
    const podcasts = onlyActive 
      ? await PodcastController.getActivePodcasts()
      : await PodcastController.getAllPodcasts()
    
    return NextResponse.json(podcasts)
  } catch (error) {
    console.error('Error getting podcasts:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received podcast data:', data)
    
    const { titulo, descricao, imagem, audioUrl, duracao, ativo } = data

    // Validações
    if (!titulo || !descricao || !imagem || !audioUrl) {
      console.log('Missing required fields:', { titulo, descricao, imagem, audioUrl })
      return NextResponse.json(
        { message: 'Título, descrição, imagem e áudio são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar se são URLs válidas ou caminhos locais
    const isValidImageUrl = imagem.startsWith('http') || imagem.startsWith('/uploads/')
    const isValidAudioUrl = audioUrl.startsWith('http') || audioUrl.startsWith('/uploads/')
    
    if (!isValidImageUrl || !isValidAudioUrl) {
      return NextResponse.json(
        { message: 'URLs da imagem e áudio devem ser válidas ou arquivos locais' },
        { status: 400 }
      )
    }

    const podcastData = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      imagem: imagem.trim(),
      audioUrl: audioUrl.trim(),
      duracao: duracao?.trim() || undefined,
      ativo: ativo !== undefined ? ativo : true
    }

    console.log('Creating podcast with data:', podcastData)

    const podcast = await PodcastController.createPodcast(podcastData)

    if (!podcast) {
      return NextResponse.json(
        { message: 'Erro ao criar podcast' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Podcast criado com sucesso',
      podcast
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating podcast:', error)
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
