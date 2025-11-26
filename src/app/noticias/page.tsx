'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Noticia } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'
 

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
 

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/api/noticias')
      const data = await response.json()
      setNoticias(data)
    } catch (error) {
      console.error('Error fetching noticias:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNoticias = searchTerm 
    ? noticias.filter(noticia => 
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : noticias

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <SiteNavbar />

      {/* Hero Section moved below to News Section */}

      {/* Search Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-bandfm-orange-500 focus:border-bandfm-orange-500"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Title moved below count and above cards */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
            </div>
          ) : (
            <>
              {filteredNoticias.length > 0 ? (
                <>
                  {/* Results count */}
                  <div className="mb-8">
                    <p className="text-gray-600">
                      {searchTerm ? (
                        <>Encontradas <span className="font-semibold">{filteredNoticias.length}</span> notícias para "{searchTerm}"</>
                      ) : (
                        <>Total de <span className="font-semibold">{filteredNoticias.length}</span> notícias</>
                      )}
                    </p>
                  </div>

                  {/* Title above cards, full-width left-aligned */}
                  <div className="bg-bandfm-orange-500 text-white py-3 px-6 rounded-full w-full shadow-lg mb-6 text-left">
                    <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
                      NOTÍCIAS
                    </h1>
                  </div>

                  {/* News Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNoticias.map((noticia) => (
                      <Link 
                        key={noticia.id} 
                        href={`/noticias/${noticia.id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                      >
                        {noticia.imagem && (
                          <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                            <img 
                              src={noticia.imagem} 
                              alt={noticia.titulo}
                              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            {new Date(noticia.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                          <h2 className="text-xl font-bold text-bandfm-orange-700 mb-3 group-hover:text-bandfm-orange-600 transition-colors">
                            {noticia.titulo}
                          </h2>
                          <p className="text-gray-700 mb-4 flex-grow text-base leading-relaxed line-clamp-3">
                            {noticia.descricao}
                          </p>
                          
                          {/* Chamada para ação */}
                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center text-bandfm-orange-600 group-hover:text-bandfm-orange-700 font-bold transition-colors duration-200 text-sm">
                              Ler mais
                              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-20 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                    <h3 className="text-2xl font-helvetica-black text-gray-900 mb-2">
                      {searchTerm ? 'Nenhuma notícia encontrada' : 'Nenhuma notícia disponível'}
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      {searchTerm 
                        ? `Não encontramos notícias para "${searchTerm}". Tente uma busca diferente.`
                        : 'No momento não temos notícias publicadas. Volte em breve para conferir as novidades!'
                      }
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-helvetica-black rounded-full text-white bg-bandfm-orange-500 hover:bg-bandfm-orange-600 transition-colors"
                      >
                        Ver todas as notícias
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-green-900 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fique sempre informado!
          </h2>
          <p className="text-xl mb-8">
            Acompanhe a Band FM e não perca nenhuma notícia importante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programacao"
              className="inline-flex items-center px-6 py-3 border border-green-700 text-base font-helvetica-black rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
            >
              Ver Programação
            </Link>
            <Link 
              href="/promocoes"
              className="inline-flex items-center px-6 py-3 border border-green-700 text-base font-helvetica-black rounded-md text-green-700 hover:bg-green-50 transition-colors"
            >
              Ver Promoções
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
              <div className="text-black text-sm space-y-2">
                <p>Email: bandfm@bandfmfronteira.com.br</p>
                <a href="tel:+5532424092" className="inline-flex items-center gap-2 hover:text-bandfm-orange-500 transition-colors" aria-label="Ligar para +55 3242 4092">
                  <svg className="w-4 h-4 text-bandfm-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 3.5A1.5 1.5 0 013.5 2h2A1.5 1.5 0 017 3.5v2A1.5 1.5 0 015.5 7H5.3a11.7 11.7 0 006.9 6.9v-.2A1.5 1.5 0 0114.7 15h2a1.5 1.5 0 011.5 1.5v2A1.5 1.5 0 0116.7 20h-.2C8.4 19.7 0.3 11.6 0 3.5V3.3A1.5 1.5 0 012 3.5z"/></svg>
                  Telefone: +55 3242 4092
                </a>
                <a href="https://wa.me/551137431313" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bandfm-green-500 transition-colors" aria-label="Abrir WhatsApp +11 3743 1313">
                  <svg className="w-4 h-4 text-bandfm-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.93 11.93 0 0012.02 0C5.38 0 .02 5.36.02 11.98a11.9 11.9 0 001.63 6.07L0 24l6.12-1.6a12.02 12.02 0 006.02 1.55h.01c6.62 0 11.98-5.36 11.98-12.02a11.93 11.93 0 00-3.61-8.45zm-8.5 19.52h-.01a9.93 9.93 0 01-5.05-1.38l-.36-.22-3.64.95.97-3.55-.24-.37a9.94 9.94 0 01-1.52-5.26c0-5.49 4.47-9.96 9.97-9.96a9.86 9.86 0 016.99 2.9 9.85 9.85 0 012.98 7.06c0 5.49-4.47 9.98-9.99 9.98zm5.48-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.31-.77.96-.95 1.16-.18.2-.35.22-.66.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.09-.17-.31-.02-.48.13-.63.13-.12.3-.31.45-.47.15-.16.2-.27.3-.45.1-.18.05-.34-.02-.48-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.34.98 2.64 1.12 2.82.13.18 1.94 2.96 4.72 4.03.66.29 1.18.46 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.21-.57-.36z"/></svg>
                  WhatsApp: +11 3743 1313
                </a>
              </div>
              
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



