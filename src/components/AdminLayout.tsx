'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [admin, setAdmin] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (!adminData) {
      router.push('/login')
    } else {
      setAdmin(JSON.parse(adminData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin')
    router.push('/login')
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-3 text-gray-700 hover:text-orange-500 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Band FM Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-700 hidden sm:block">
                Olá, {admin.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <nav className={`
          bg-white border-r border-gray-200 shadow-lg
          fixed lg:static inset-y-0 left-0 z-30
          w-64 min-h-screen
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/empresas"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/noticias"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/promocoes"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Promoções
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/programacao"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Programação
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/banners"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Banners
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/galeria"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Galeria
                </Link>
              </li>
              <li className="pt-4 border-t border-gray-200">
                <Link
                  href="/admin/administradores"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  👥 Administradores
                </Link>
              </li>
              <li className="border-t border-gray-200">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="block px-4 py-2 text-black font-bold hover:bg-orange-500 hover:text-white rounded-md transition-colors"
                >
                  Ver Site Público
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
