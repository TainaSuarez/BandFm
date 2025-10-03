'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Podcast } from '@/types'
import LoginDropdown from '@/components/LoginDropdown'
import PodcastPlayer from '@/components/PodcastPlayer'

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/podcasts?active=true')
      const data = await response.json()
      setPodcasts(data)
    } catch (error) {
      console.error('Error fetching podcasts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-black">Band FM</Link>
              </div>
            </div>

            {/* Desktop Menu */}
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
                <Link href="/podcasts" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Podcasts
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
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Promoções
                </Link>
                <LoginDropdown />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden bg-white border-t border-gray-200">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black hover:text-bandfm-orange-500 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Início
                </Link>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Notícias
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Programação
                </Link>
                <Link href="/podcasts" className="text-black bg-gray-100 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Podcasts
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Clube Ouvintes
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Promoções
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link href="/login" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                    Entrar como Admin
                  </Link>
                  <Link href="/login-empresa" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                    Entrar como Empresa
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-green-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              PODCASTS
            </h1>
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : podcasts.length > 0 ? (
            <div className="space-y-8">
              {podcasts.map((podcast) => (
                <div key={podcast.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    {/* Podcast Image */}
                    <div className="md:w-1/3 lg:w-1/4">
                      <img 
                        src={podcast.imagem} 
                        alt={podcast.titulo}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    
                    {/* Podcast Content */}
                    <div className="md:w-2/3 lg:w-3/4 p-6">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {podcast.titulo}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {podcast.descricao}
                        </p>
                      </div>
                      
                      {/* Podcast Player */}
                      <PodcastPlayer 
                        audioUrl={podcast.audioUrl}
                        title={podcast.titulo}
                        duration={podcast.duracao}
                      />
                      
                      {/* Metadata */}
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Publicado em {new Date(podcast.createdAt).toLocaleDateString('pt-BR')}
                        {podcast.duracao && (
                          <>
                            <span className="mx-2">•</span>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                            </svg>
                            {podcast.duracao}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-helvetica-black text-gray-900 mb-2">
                Nenhum podcast disponível
              </h3>
              <p className="text-gray-500 mb-6">
                Em breve teremos novos episódios para você!
              </p>
              <Link 
                href="/"
                className="bg-purple-600 hover:bg-purple-700 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-200"
              >
                Voltar ao Início
              </Link>
            </div>
          )}
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
