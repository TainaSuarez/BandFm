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


      {/* Podcasts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
           <div className="max-w-7xl mx-auto mb-12">
             <div className="bg-bandfm-green-500 text-white text-left py-3 px-6 rounded-full">
               <h2 className="text-lg font-helvetica-black font-extrabold uppercase tracking-wider text-white">
                 PODCASTS
               </h2>
             </div>
           </div>
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
