'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Podcast } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'
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
      <SiteNavbar />

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
