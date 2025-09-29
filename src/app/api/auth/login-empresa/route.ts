import { NextRequest, NextResponse } from 'next/server'
import { EmpresaController } from '@/controllers/empresaController'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Find empresa by email
    const empresa = await EmpresaController.getEmpresaByEmail(email)

    if (!empresa) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, empresa.senha)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Remove password from response
    const { senha: _, ...empresaData } = empresa

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      empresa: empresaData
    })
  } catch (error) {
    console.error('Empresa login error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



