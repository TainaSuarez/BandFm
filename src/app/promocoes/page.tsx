'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Promocao } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'

export default function PromocoesPage() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPromocao, setSelectedPromocao] = useState<Promocao | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  useEffect(() => {
    fetchPromocoes()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageZoomed) {
          setIsImageZoomed(false)
        } else if (isModalOpen) {
          closeModal()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isImageZoomed, isModalOpen])

  const fetchPromocoes = async () => {
    try {
      const response = await fetch('/api/promocoes')
      if (!response.ok) {
        throw new Error('Error fetching promocoes')
      }
      const data = await response.json()
      
      // Asegurarnos de que las fechas sean objetos Date válidos
      const promocoesWithDates = data.map((promocao: any) => ({
        ...promocao,
        createdAt: new Date(promocao.createdAt),
        updatedAt: new Date(promocao.updatedAt)
      }))
      
      setPromocoes(promocoesWithDates)
    } catch (error) {
      console.error('Error fetching promocoes:', error)
      setPromocoes([])
    } finally {
      setLoading(false)
    }
  }

  const openModal = (promocao: Promocao) => {
    setSelectedPromocao(promocao)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsImageZoomed(false)
    setTimeout(() => setSelectedPromocao(null), 300)
  }

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed)
  }

  const getDescricaoBreve = (descricao: string) => {
    if (!descricao) return ''
    if (descricao.length <= 100) return descricao
    return descricao.substring(0, 100) + '...'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <SiteNavbar />

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-white py-3 px-6 rounded-full w-full shadow-lg text-left">
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
                    <div key={promocao.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                      {/* Imagen */}
                      {promocao.imagem && (
                        <div className="w-full">
                          <img 
                            src={promocao.imagem} 
                            alt={promocao.titulo}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          {promocao.titulo}
                        </h3>
                        <p className="text-base mb-6 leading-relaxed text-gray-700 flex-grow">
                          {getDescricaoBreve(promocao.descricao)}
                        </p>
                        
                        {/* Botón Ver Mais */}
                        <button
                          onClick={() => openModal(promocao)}
                          className="inline-flex items-center justify-center bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white font-bold py-2.5 px-5 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg mt-auto self-end whitespace-nowrap"
                        >
                          Ver Mais
                        </button>
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
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Ver Programação
            </Link>
            <Link 
              href="/clube-ouvintes"
              className="inline-flex items-center px-6 py-3 border border-green-600 text-base font-helvetica-black rounded-md text-green-600 hover:bg-green-50 transition-colors"
            >
              Clube Ouvintes
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de Zoom de Imagen */}
      {isImageZoomed && selectedPromocao?.imagem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsImageZoomed(false)}
        >
          <button
            onClick={() => setIsImageZoomed(false)}
            className="absolute top-4 right-4 z-10 bg-white text-gray-900 rounded-full p-3 shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label="Cerrar zoom"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img 
              src={selectedPromocao.imagem} 
              alt={selectedPromocao.titulo}
              className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Indicador de scroll si la imagen es muy grande */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Presione ESC o haga clic fuera para cerrar
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedPromocao && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar Mejorado */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-2.5 shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              aria-label="Cerrar modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen con efecto gradiente y zoom */}
            {selectedPromocao.imagem && (
              <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8 rounded-t-2xl overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-bandfm-orange-500/5 to-transparent"></div>
                
                {/* Contenedor de imagen con efecto hover */}
                <div 
                  className="relative group cursor-zoom-in"
                  onClick={toggleImageZoom}
                >
                  <img 
                    src={selectedPromocao.imagem} 
                    alt={selectedPromocao.titulo}
                    className="relative max-w-full h-auto max-h-72 md:max-h-[500px] lg:max-h-[600px] object-contain rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                  
                  {/* Indicador de zoom - solo visible en desktop */}
                  <div className="hidden md:flex absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-semibold items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Clique para ampliar
                  </div>
                </div>
              </div>
            )}

            {/* Contenido con diseño mejorado */}
            <div className="p-8 sm:p-10">
              {/* Badge decorativo */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-bandfm-orange-500 to-orange-600 text-white text-xs font-bold rounded-full mb-4 shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                PROMOÇÃO ESPECIAL
              </div>

              {/* Título con estilo moderno */}
              <h2 className="text-4xl font-black mb-6 text-gray-900 leading-tight">
                {selectedPromocao.titulo}
              </h2>
              
              {/* Fecha con diseño mejorado */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg mb-6 w-fit border border-gray-200">
                <svg className="w-5 h-5 text-bandfm-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Publicado em {new Date(selectedPromocao.createdAt).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>

              {/* Separador decorativo */}
              <div className="h-1 w-20 bg-gradient-to-r from-bandfm-orange-500 to-orange-600 rounded-full mb-6"></div>

              {/* Descripción con mejor tipografía */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                  {selectedPromocao.descricao}
                </p>
              </div>

              {/* Botón Quero Participar con diseño moderno */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                <p className="text-center text-sm font-semibold text-gray-600 mb-4">
                  Participe agora mesmo!
                </p>
                <a
                  href={`https://wa.me/555532424092?text=${encodeURIComponent(`Quero participar "${selectedPromocao.titulo}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-bandfm-orange-500 to-orange-600 hover:from-bandfm-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group"
                >
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-lg">Quero Participar</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
