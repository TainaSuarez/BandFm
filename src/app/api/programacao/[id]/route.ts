import { NextRequest, NextResponse } from 'next/server'
import { ProgramacaoController } from '@/controllers/programacaoController'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const programacao = await ProgramacaoController.getProgramacaoById(id)
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const programacao = await ProgramacaoController.updateProgramacao(id, data)

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const success = await ProgramacaoController.deleteProgramacao(id)

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



