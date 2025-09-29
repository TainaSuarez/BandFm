import { NextRequest, NextResponse } from 'next/server'
import { AdminController } from '@/controllers/adminController'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const admin = await AdminController.login({ email, password })

    if (!admin) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...adminData } = admin

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      admin: adminData
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



