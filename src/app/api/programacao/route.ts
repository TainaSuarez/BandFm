import { NextRequest, NextResponse } from 'next/server'
import { ProgramacaoController } from '@/controllers/programacaoController'

export async function GET() {
  try {
    const programacao = await ProgramacaoController.getAllProgramacao()
    return NextResponse.json(programacao)
  } catch (error) {
    console.error('Error getting programacao:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { diasSemana, horarios, nomePrograma, nomeApresentador } = data

    if (!diasSemana || !horarios || !nomePrograma || !nomeApresentador) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const programacao = await ProgramacaoController.createProgramacao({
      diasSemana,
      horarios,
      nomePrograma,
      nomeApresentador
    })

    if (!programacao) {
      return NextResponse.json(
        { message: 'Erro ao criar programação' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Programação criada com sucesso',
      programacao
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating programacao:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



