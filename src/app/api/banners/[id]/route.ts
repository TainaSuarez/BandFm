import { NextRequest, NextResponse } from 'next/server'
import { BannerController } from '@/controllers/bannerController'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await BannerController.getBannerById(params.id)
    
    if (!banner) {
      return NextResponse.json(
        { message: 'Banner não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(banner)
  } catch (error) {
    console.error('Error getting banner:', error)
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
    
    const banner = await BannerController.updateBanner(id, data)

    if (!banner) {
      return NextResponse.json(
        { message: 'Banner não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Banner atualizado com sucesso',
      banner
    })
  } catch (error) {
    console.error('Error updating banner:', error)
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
    const success = await BannerController.deleteBanner(id)

    if (!success) {
      return NextResponse.json(
        { message: 'Banner não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Banner excluído com sucesso'
    })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



