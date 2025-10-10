'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Empresa } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'

export default function ClubeOuvintesPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriaFilter, setCategoriaFilter] = useState<string>('')

  useEffect(() => {
    fetchEmpresas()
  }, [])

  const fetchEmpresas = async () => {
    try {
      const response = await fetch('/api/empresas')
      const data = await response.json()
      setEmpresas(data)
    } catch (error) {
      console.error('Error fetching empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categorias = Array.from(new Set(empresas.map(empresa => empresa.categoria)))

  const filteredEmpresas = categoriaFilter 
    ? empresas.filter(empresa => empresa.categoria === categoriaFilter)
    : empresas

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <SiteNavbar />

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-green-500 text-white py-3 px-6 rounded-full text-left">
            <h1 className="text-lg font-helvetica-black uppercase tracking-wider">
              CLUBE OUVINTES
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-helvetica-black">Filtrar por categoria:</span>
            <button
              onClick={() => setCategoriaFilter('')}
              className={`px-4 py-2 rounded-md text-sm font-helvetica-black transition-colors ${
                categoriaFilter === '' 
                  ? 'bg-bandfm-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaFilter(categoria)}
                className={`px-4 py-2 rounded-md text-sm font-helvetica-black transition-colors ${
                  categoriaFilter === categoria 
                    ? 'bg-bandfm-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredEmpresas.length > 0 ? (
                filteredEmpresas.map((empresa) => (
                  <div key={empresa.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {empresa.foto && (
                      <img 
                        src={empresa.foto} 
                        alt={empresa.nome}
                        className="w-full h-44 sm:h-48 object-cover"
                      />
                    )}
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                        <h3 className="text-lg sm:text-xl font-black text-gray-900">
                          {empresa.nome}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-bandfm-green-500 text-white shadow-sm w-fit">
                          {empresa.categoria}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span className="truncate">{empresa.email}</span>
                      </div>
                      
                      <Link
                        href={`/empresa/${empresa.id}`}
                        className="block w-full bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white font-bold py-2.5 sm:py-3 px-6 rounded-full transition-all duration-200 text-center shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        Ver Produtos
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-lg font-helvetica-black">Nenhuma empresa encontrada</p>
                    <p className="text-sm">
                      {categoriaFilter ? `Não há empresas na categoria "${categoriaFilter}"` : 'Nenhuma empresa cadastrada ainda.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Band FM</h3>
              <p className="text-black text-sm">
                A sua rádio do seu jeito. Conectando você com o melhor da música e informação.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Contato</h3>
              <p className="text-black text-sm">Email: bandfm@bandfmfronteira.com.br</p>
              <p className="text-black text-sm">Telefone: +55 3242 4092</p>
              <p className="text-black text-sm">WhatsApp: +11 3743 1313</p>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 text-center">
            <p className="text-sm text-black">&copy; {new Date().getFullYear()} Band FM 96.1 Livramento. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
