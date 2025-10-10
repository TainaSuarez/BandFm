'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface EmpresaLayoutProps {
  children: ReactNode
  title: string
}

export default function EmpresaLayout({ children, title }: EmpresaLayoutProps) {
  const handleLogout = () => {
    // Remover dados da sessão
    localStorage.removeItem('empresa-session')
    // Redirecionar para login
    window.location.href = '/login-empresa'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Header Blanco con Verde y Naranja */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              {/* Logo simple sin degradado */}
              <div className="flex-shrink-0">
                <Link href="/empresa" className="flex items-center gap-2 group">
                  <span className="text-2xl font-black text-orange-600">
                    Painel Empresa
                  </span>
                </Link>
              </div>
              
              {/* Menú de navegación */}
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-2">
                  <Link
                    href="/empresa"
                    className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-base font-bold transition-all hover:shadow-md border-2 border-transparent hover:border-green-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href="/empresa/produtos"
                    className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-base font-bold transition-all hover:shadow-md border-2 border-transparent hover:border-green-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Produtos
                  </Link>
                  <Link
                    href="/empresa/perfil"
                    className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-base font-bold transition-all hover:shadow-md border-2 border-transparent hover:border-green-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Perfil
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 border-orange-200 hover:border-orange-400 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Ver Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Título mejorado */}
          <div className="mb-8 pb-4 border-b-2 border-gray-200">
            <h1 className="text-4xl font-black text-green-600">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

