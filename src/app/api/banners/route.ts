import { NextRequest, NextResponse } from 'next/server'
import { BannerController } from '@/controllers/bannerController'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'
    
    const banners = onlyActive 
      ? await BannerController.getActiveBanners()
      : await BannerController.getAllBanners()
      
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error getting banners:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received banner data:', data) // Debug log
    
    const { titulo, imagem, link, ativo, ordem } = data

    if (!imagem) {
      console.log('Missing required field: imagem')
      return NextResponse.json(
        { message: 'Imagem é obrigatória' },
        { status: 400 }
      )
    }

    const bannerData = {
      titulo: titulo || `Banner ${Date.now()}`,
      imagem,
      link: null, // Always null since we removed the link field
      ativo: ativo !== undefined ? ativo : true,
      ordem: Number(ordem) || 0
    }

    console.log('Creating banner with data:', bannerData) // Debug log

    const banner = await BannerController.createBanner(bannerData)

    if (!banner) {
      return NextResponse.json(
        { message: 'Erro ao criar banner' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Banner criado com sucesso',
      banner
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor', error: error.message },
      { status: 500 }
    )
  }
}
