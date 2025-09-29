import { NextRequest, NextResponse } from 'next/server'
import { EmpresaController } from '@/controllers/empresaController'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const empresa = await EmpresaController.getEmpresaById(id)
    
    if (!empresa) {
      return NextResponse.json(
        { message: 'Empresa não encontrada' },
        { status: 404 }
      )
    }

    // Remove password from response
    const { senha: _, ...empresaData } = empresa

    return NextResponse.json(empresaData)
  } catch (error) {
    console.error('Error getting empresa:', error)
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
    
    const empresa = await EmpresaController.updateEmpresa(id, data)

    if (!empresa) {
      return NextResponse.json(
        { message: 'Empresa não encontrada' },
        { status: 404 }
      )
    }

    // Remove password from response
    const { senha: _, ...empresaData } = empresa

    return NextResponse.json({
      message: 'Empresa atualizada com sucesso',
      empresa: empresaData
    })
  } catch (error) {
    console.error('Error updating empresa:', error)
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
    const success = await EmpresaController.deleteEmpresa(id)

    if (!success) {
      return NextResponse.json(
        { message: 'Empresa não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Empresa excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting empresa:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



