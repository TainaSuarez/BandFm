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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Band FM Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, {admin.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="bg-gray-800 w-64 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/empresas"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/noticias"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/promocoes"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Promoções
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/programacao"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Programação
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/banners"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Banners
                </Link>
              </li>
              <li className="pt-4 border-t border-gray-700">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                >
                  Ver Site Público
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
