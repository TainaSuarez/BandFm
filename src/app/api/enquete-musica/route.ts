import { NextRequest, NextResponse } from 'next/server'
import { EnqueteMusicaController } from '@/controllers/enqueteMusicaController'

// GET - Obtener resultados de la encuesta
export async function GET() {
  try {
    const resultados = await EnqueteMusicaController.getResultados()
    return NextResponse.json(resultados)
  } catch (error) {
    console.error('Error getting poll results:', error)
    return NextResponse.json(
      { message: 'Erro ao obter resultados' },
      { status: 500 }
    )
  }
}

// POST - Votar
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { genero } = data

    if (!genero) {
      return NextResponse.json(
        { message: 'Gênero é obrigatório' },
        { status: 400 }
      )
    }

    // Obtener IP del cliente
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Verificar si ya votó
    const jaVotou = await EnqueteMusicaController.verificarJaVotou(ip)
    if (jaVotou) {
      return NextResponse.json(
        { message: 'Você já votou nesta enquete', jaVotou: true },
        { status: 400 }
      )
    }

    const voto = await EnqueteMusicaController.votar(genero, ip)

    if (!voto) {
      return NextResponse.json(
        { message: 'Erro ao registrar voto' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Voto registrado com sucesso!',
      voto
    }, { status: 201 })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json(
      { message: 'Erro ao registrar voto' },
      { status: 500 }
    )
  }
}

