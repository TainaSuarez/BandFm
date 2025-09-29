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
      {/* Navigation */}
      <nav className="bg-green-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/empresa" className="text-2xl font-bold text-white">
                  🏢 Painel Empresa
                </Link>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link
                    href="/empresa"
                    className="text-green-100 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/empresa/produtos"
                    className="text-green-100 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Produtos
                  </Link>
                  <Link
                    href="/empresa/perfil"
                    className="text-green-100 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Perfil
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-green-100 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Ver Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

