'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Promocao } from '@/types'
import LoginDropdown from '@/components/LoginDropdown'

export default function PromocoesPage() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPromocoes()
  }, [])

  const fetchPromocoes = async () => {
    try {
      const response = await fetch('/api/promocoes')
      const data = await response.json()
      setPromocoes(data)
    } catch (error) {
      console.error('Error fetching promocoes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                Band FM
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Início
                </Link>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Notícias
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Programação
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Clube Ouvintes
                </Link>
                <Link href="/promocoes" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Promoções
                </Link>
                <LoginDropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              PROMOÇÕES
            </h1>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
          ) : (
            <>
              {promocoes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {promocoes.map((promocao) => (
                    <div key={promocao.id} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <div className="p-8 text-black">
                        <h3 className="text-2xl font-bold mb-4">
                          {promocao.titulo}
                        </h3>
                        <p className="text-lg mb-6 leading-relaxed">
                          {promocao.descricao}
                        </p>
                        {promocao.imagem && (
                          <div className="mb-4">
                            <img 
                              src={promocao.imagem} 
                              alt={promocao.titulo}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex items-center text-sm text-black/80">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                          </svg>
                          Publicado em {new Date(promocao.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-20 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <h3 className="text-2xl font-helvetica-black text-gray-900 mb-2">
                      Nenhuma promoção ativa
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      No momento não temos promoções ativas. Fique ligado na programação para não perder as próximas!
                    </p>
                    <Link 
                      href="/"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-black bg-yellow-600 hover:bg-yellow-700 transition-colors"
                    >
                      Voltar ao Início
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não perca nenhuma promoção!
          </h2>
          <p className="text-xl mb-8">
            Fique sempre ligado na Band FM e acompanhe nossa programação para não perder as melhores promoções.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programacao"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-blue-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Ver Programação
            </Link>
            <Link 
              href="/clube-ouvintes"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-helvetica-black rounded-md text-black hover:bg-gray-100 transition-colors"
            >
              Clube Ouvintes
            </Link>
          </div>
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
