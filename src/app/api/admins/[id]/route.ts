import { NextRequest, NextResponse } from 'next/server'
import { adminController } from '@/controllers/adminController'

// GET - Obtener admin por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await adminController.getAdminById(params.id)
    if (!admin) {
      return NextResponse.json(
        { message: 'Administrador não encontrado' },
        { status: 404 }
      )
    }
    return NextResponse.json(admin)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao buscar administrador' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar admin (solo admin master)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { email, password, nome, ativo, requesterId } = body

    if (!requesterId) {
      return NextResponse.json(
        { message: 'ID do solicitante é obrigatório' },
        { status: 400 }
      )
    }

    const admin = await adminController.updateAdmin(
      params.id,
      { email, password, nome, ativo },
      requesterId
    )

    return NextResponse.json({
      message: 'Administrador atualizado com sucesso',
      admin
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao atualizar administrador' },
      { status: 400 }
    )
  }
}

// DELETE - Eliminar admin (solo admin master)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const requesterId = searchParams.get('requesterId')

    if (!requesterId) {
      return NextResponse.json(
        { message: 'ID do solicitante é obrigatório' },
        { status: 400 }
      )
    }

    const result = await adminController.deleteAdmin(params.id, requesterId)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao excluir administrador' },
      { status: 400 }
    )
  }
}

