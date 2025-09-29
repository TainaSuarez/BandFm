import { NextRequest, NextResponse } from 'next/server'
import { EmpresaController } from '@/controllers/empresaController'

export async function GET() {
  try {
    const empresas = await EmpresaController.getAllEmpresas()
    return NextResponse.json(empresas)
  } catch (error) {
    console.error('Error getting empresas:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { nome, foto, email, senha, descricao, categoria } = data

    if (!nome || !email || !senha || !descricao || !categoria) {
      return NextResponse.json(
        { message: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    const empresa = await EmpresaController.createEmpresa({
      nome,
      foto,
      email,
      senha,
      descricao,
      categoria
    })

    if (!empresa) {
      return NextResponse.json(
        { message: 'Erro ao criar empresa' },
        { status: 500 }
      )
    }

    // Remove password from response
    const { senha: _, ...empresaData } = empresa

    return NextResponse.json({
      message: 'Empresa criada com sucesso',
      empresa: empresaData
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating empresa:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



