'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Noticia, Promocao, Banner } from '@/types'
import BannerCarousel from '@/components/BannerCarousel'
import LoginDropdown from '@/components/LoginDropdown'
import BandFMLogo from '@/components/BandFMLogo'

export default function HomePage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

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
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <BandFMLogo size="sm" showFrequency={false} className="" />
                </Link>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <a href="#inicio" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  HOME
                </a>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  NOTÍCIAS
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  PROGRAMAÇÃO
                </Link>
                <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  PODCASTS
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  EQUIPE
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  A RÁDIO
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  CLUBE OUVINTES
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                  PROMOÇÕES
                </Link>
                <LoginDropdown />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden bg-white border-t border-gray-200">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#inicio" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                  HOME
                </a>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                  NOTÍCIAS
                </Link>
                  <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                    PROGRAMAÇÃO
                  </Link>
                  <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                    PODCASTS
                  </Link>
                  <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                    EQUIPE
                  </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                  A RÁDIO
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                  CLUBE OUVINTES
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                  PROMOÇÕES
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
                <div key={noticia.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  {noticia.imagem && (
                    <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {noticia.descricao}
                    </p>
                    <a 
                      href={noticia.fonte} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bandfm-green-500 hover:text-bandfm-green-600 font-helvetica-black"
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
                <div key={promocao.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  {promocao.imagem && (
                    <img src={promocao.imagem} alt={promocao.titulo} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-bandfm-orange-700">
                      {promocao.titulo}
                    </h3>
                    <p className="text-lg text-bandfm-orange-600">
                      {promocao.descricao}
                    </p>
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
