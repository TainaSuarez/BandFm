import { NextRequest } from 'next/server'
import { EmpresaController } from '@/controllers/empresaController'

export interface EmpresaSession {
  id: string
  email: string
  nome: string
}

// Simular sesión de empresa usando cookies o headers
export async function getEmpresaFromRequest(request: NextRequest): Promise<EmpresaSession | null> {
  try {
    // En un escenario real, esto vendría de un JWT o sesión
    // Por simplicidad, usaremos un header personalizado
    const empresaEmail = request.headers.get('x-empresa-email')
    
    if (!empresaEmail) {
      return null
    }
    
    const empresa = await EmpresaController.getEmpresaByEmail(empresaEmail)
    
    if (!empresa) {
      return null
    }
    
    return {
      id: empresa.id,
      email: empresa.email,
      nome: empresa.nome
    }
  } catch (error) {
    console.error('Error getting empresa from request:', error)
    return null
  }
}

// Middleware de autenticación para rutas de empresa
export async function requireEmpresaAuth(request: NextRequest): Promise<EmpresaSession | Response> {
  const empresa = await getEmpresaFromRequest(request)
  
  if (!empresa) {
    return new Response(
      JSON.stringify({ message: 'Acesso negado. Faça login como empresa.' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
  
  return empresa
}

