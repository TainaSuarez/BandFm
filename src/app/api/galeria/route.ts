import { NextRequest, NextResponse } from 'next/server'
import { GaleriaController } from '@/controllers/galeriaController'

// GET - Obtener items de galería
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tipo = searchParams.get('tipo') as 'foto' | 'video' | null

    const items = tipo 
      ? await GaleriaController.getItemsByTipo(tipo)
      : await GaleriaController.getAllItems()

    // Serializar fechas
    const itemsSerializados = items.map(item => ({
      ...item,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt
    }))

    return NextResponse.json(itemsSerializados)
  } catch (error) {
    console.error('Error getting galeria:', error)
    return NextResponse.json(
      { message: 'Erro ao obter galeria' },
      { status: 500 }
    )
  }
}

// POST - Crear item de galería
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { tipo, url, legenda, ativo, ordem } = data

    if (!tipo || !url || !legenda) {
      return NextResponse.json(
        { message: 'Tipo, URL e legenda são obrigatórios' },
        { status: 400 }
      )
    }

    if (tipo !== 'foto' && tipo !== 'video') {
      return NextResponse.json(
        { message: 'Tipo deve ser "foto" ou "video"' },
        { status: 400 }
      )
    }

    const item = await GaleriaController.createItem({
      tipo,
      url,
      legenda,
      ativo: ativo !== undefined ? ativo : true,
      ordem: ordem || 0
    })

    if (!item) {
      return NextResponse.json(
        { message: 'Erro ao criar item' },
        { status: 500 }
      )
    }

    // Serializar fechas
    const itemSerializado = {
      ...item,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt
    }

    return NextResponse.json({
      message: 'Item criado com sucesso',
      item: itemSerializado
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating galeria item:', error)
    return NextResponse.json(
      { message: 'Erro ao criar item' },
      { status: 500 }
    )
  }
}

