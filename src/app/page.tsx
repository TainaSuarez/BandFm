'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Noticia, Promocao, Banner } from '@/types'
import BannerCarousel from '@/components/BannerCarousel'

import SiteNavbar from '@/components/SiteNavbar'
import EnqueteMusica from '@/components/EnqueteMusica'
 

export default function HomePage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
 

  const getDescricaoBreve = (descricao: string) => {
    if (!descricao) return ''
    if (descricao.length <= 80) return descricao
    return descricao.substring(0, 80) + '...'
  }

  useEffect(() => {
    // Fetch data from APIs
    fetchNoticias()
    fetchPromocoes()
    fetchBanners()
  }, [])

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/api/noticias')
      const data = await response.json()
      setNoticias(data.slice(0, 3)) // Show only 3 latest news
    } catch (error) {
      console.error('Error fetching noticias:', error)
    }
  }

  const fetchPromocoes = async () => {
    try {
      const response = await fetch('/api/promocoes')
      const data = await response.json()
      setPromocoes(data.slice(0, 2)) // Show only 2 latest promotions
    } catch (error) {
      console.error('Error fetching promocoes:', error)
    }
  }

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners?active=true')
      const data = await response.json()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    }
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <SiteNavbar />

      {/* Banner Carousel */}
      {banners.length > 0 && (
        <BannerCarousel banners={banners} />
      )}

      {/* Spacer between banner and news */}
      <div className="py-8"></div>

      {/* Latest News Section */}
      <section id="noticias" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Orange highlighted title */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-bandfm-orange-500 text-white text-left py-3 px-6 rounded-full">
              <h2 className="text-lg font-helvetica-black font-extrabold uppercase tracking-wider">
                NOTÍCIAS
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.length > 0 ? (
              noticias.map((noticia) => (
                <div key={noticia.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
                  {noticia.imagem && (
                    <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {noticia.descricao}
                    </p>
                    <a 
                      href={noticia.fonte} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bandfm-green-500 hover:text-bandfm-green-600 font-helvetica-black mt-auto self-end"
                    >
                      Ler mais →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                Nenhuma notícia disponível no momento.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enquete de Música */}
      <EnqueteMusica />

      {/* Promotions Section - Featured */}
      <section id="promocoes" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Orange highlighted title */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-bandfm-orange-500 text-white text-left py-3 px-6 rounded-full flex justify-between items-center">
              <h2 className="text-lg font-helvetica-black font-extrabold uppercase tracking-wider">
                PROMOÇÕES DESTACADAS
              </h2>
              <Link 
                href="/promocoes"
                className="text-white hover:text-gray-200 font-helvetica-black flex items-center text-sm"
              >
                Ver todas
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promocoes.length > 0 ? (
              promocoes.slice(0, 2).map((promocao) => (
                <div key={promocao.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full">
                  {promocao.imagem && (
                    <img src={promocao.imagem} alt={promocao.titulo} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {promocao.titulo}
                    </h3>
                    <p className="text-base text-gray-700 mb-4 leading-relaxed flex-grow">
                      {getDescricaoBreve(promocao.descricao)}
                    </p>
                    
                    {/* Botón Saber Mais */}
                    <Link 
                      href="/promocoes"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-bandfm-orange-500 to-orange-600 hover:from-bandfm-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group mt-auto self-end"
                    >
                      Saber Mais
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                <p className="text-lg">Nenhuma promoção ativa no momento.</p>
                <Link 
                  href="/promocoes"
                  className="text-bandfm-orange-600 hover:text-bandfm-orange-700 font-helvetica-black mt-2 inline-block"
                >
                  Acompanhe nossas promoções
                </Link>
              </div>
            )}
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
                <a href="tel:+5532424092" className="inline-flex items-center gap-2 hover:text-bandfm-orange-500 transition-colors" aria-label="Llamar a +55 3242 4092">
                  <svg className="w-4 h-4 text-bandfm-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 3.5A1.5 1.5 0 013.5 2h2A1.5 1.5 0 017 3.5v2A1.5 1.5 0 015.5 7H5.3a11.7 11.7 0 006.9 6.9v-.2A1.5 1.5 0 0114.7 15h2a1.5 1.5 0 011.5 1.5v2A1.5 1.5 0 0116.7 20h-.2C8.4 19.7 0.3 11.6 0 3.5V3.3A1.5 1.5 0 012 3.5z"/></svg>
                  Telefone: +55 3242 4092
                </a>
                <a href="https://wa.me/555532424092" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bandfm-green-500 transition-colors" aria-label="Abrir WhatsApp +55 55 3242-4092">
                  <svg className="w-4 h-4 text-bandfm-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.93 11.93 0 0012.02 0C5.38 0 .02 5.36.02 11.98a11.9 11.9 0 001.63 6.07L0 24l6.12-1.6a12.02 12.02 0 006.02 1.55h.01c6.62 0 11.98-5.36 11.98-12.02a11.93 11.93 0 00-3.61-8.45zm-8.5 19.52h-.01a9.93 9.93 0 01-5.05-1.38l-.36-.22-3.64.95.97-3.55-.24-.37a9.94 9.94 0 01-1.52-5.26c0-5.49 4.47-9.96 9.97-9.96a9.86 9.86 0 016.99 2.9 9.85 9.85 0 012.98 7.06c0 5.49-4.47 9.98-9.99 9.98zm5.48-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.31-.77.96-.95 1.16-.18.2-.35.22-.66.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.09-.17-.31-.02-.48.13-.63.13-.12.3-.31.45-.47.15-.16.2-.27.3-.45.1-.18.05-.34-.02-.48-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.34.98 2.64 1.12 2.82.13.18 1.94 2.96 4.72 4.03.66.29 1.18.46 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.21-.57-.36z"/></svg>
                  WhatsApp: +55 55 3242-4092
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
