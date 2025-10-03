'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Noticia } from '@/types'
import LoginDropdown from '@/components/LoginDropdown'

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
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                Band FM
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  HOME
                </Link>
                <Link href="/noticias" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  NOTÍCIAS
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  PROGRAMAÇÃO
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  EQUIPE
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  A RÁDIO
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  CLUBE OUVINTES
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black uppercase tracking-wider">
                  PROMOÇÕES
                </Link>
                <LoginDropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-green-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              NOTÍCIAS
            </h1>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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

                  {/* News Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNoticias.map((noticia) => (
                      <article key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {noticia.imagem && (
                          <div className="aspect-w-16 aspect-h-9">
                            <img 
                              src={noticia.imagem} 
                              alt={noticia.titulo}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            {new Date(noticia.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {noticia.titulo}
                          </h2>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {noticia.descricao}
                          </p>
                          <div className="flex items-center justify-between">
                            <a 
                              href={noticia.fonte} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-green-600 hover:text-green-800 font-helvetica-black transition-colors duration-200"
                            >
                              Ler notícia completa
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </article>
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
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-black bg-green-600 hover:bg-green-700 transition-colors"
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
      <section className="bg-green-900 text-black py-16">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fique sempre informado!
          </h2>
          <p className="text-xl mb-8">
            Acompanhe a Band FM e não perca nenhuma notícia importante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programacao"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-green-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Ver Programação
            </Link>
            <Link 
              href="/promocoes"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-helvetica-black rounded-md text-black hover:bg-green-800 transition-colors"
            >
              Ver Promoções
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
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



