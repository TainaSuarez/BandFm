import { NextRequest, NextResponse } from 'next/server'
import { adminController } from '@/controllers/adminController'

// GET - Obtener todos los admins
export async function GET(request: NextRequest) {
  try {
    const admins = await adminController.getAllAdmins()
    return NextResponse.json(admins)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao buscar administradores' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo admin (solo admin master)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, nome } = body

    if (!email || !password || !nome) {
      return NextResponse.json(
        { message: 'Email, senha e nome são obrigatórios' },
        { status: 400 }
      )
    }

    const admin = await adminController.createAdmin({ email, password, nome })
    return NextResponse.json(
      { message: 'Administrador criado com sucesso', admin },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao criar administrador' },
      { status: 400 }
    )
  }
}

