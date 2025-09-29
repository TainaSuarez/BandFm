import { NextRequest, NextResponse } from 'next/server'
import { ProgramacaoController } from '@/controllers/programacaoController'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programacao = await ProgramacaoController.getProgramacaoById(params.id)
    
    if (!programacao) {
      return NextResponse.json(
        { message: 'Programação não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(programacao)
  } catch (error) {
    console.error('Error getting programacao:', error)
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
    
    const programacao = await ProgramacaoController.updateProgramacao(params.id, data)

    if (!programacao) {
      return NextResponse.json(
        { message: 'Programação não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Programação atualizada com sucesso',
      programacao
    })
  } catch (error) {
    console.error('Error updating programacao:', error)
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
    const success = await ProgramacaoController.deleteProgramacao(params.id)

    if (!success) {
      return NextResponse.json(
        { message: 'Programação não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Programação excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting programacao:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



