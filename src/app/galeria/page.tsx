'use client'

import { useState, useEffect } from 'react'
import { GaleriaItem } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'

export default function GaleriaPage() {
  const [fotos, setFotos] = useState<GaleriaItem[]>([])
  const [videos, setVideos] = useState<GaleriaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GaleriaItem | null>(null)

  useEffect(() => {
    fetchGaleria()
  }, [])

  const fetchGaleria = async () => {
    try {
      const response = await fetch('/api/galeria')
      const data = await response.json()
      
      const fotosData = data.filter((item: GaleriaItem) => item.tipo === 'foto')
      const videosData = data.filter((item: GaleriaItem) => item.tipo === 'video')
      
      setFotos(fotosData)
      setVideos(videosData)
    } catch (error) {
      console.error('Error fetching galeria:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavbar />

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-white py-3 px-6 rounded-full w-full shadow-lg text-left">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              GALERIA
            </h1>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
        </div>
      ) : (
        <>
          {/* Sección de Fotos */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-bandfm-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-3xl font-black text-gray-900 uppercase">Fotos</h2>
                <span className="bg-bandfm-orange-100 text-bandfm-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                  {fotos.length}
                </span>
              </div>

              {fotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {fotos.map((foto) => (
                    <div
                      key={foto.id}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() => setSelectedImage(foto)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={foto.url}
                          alt={foto.legenda}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-semibold text-sm line-clamp-2">
                            {foto.legenda}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-bandfm-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Nenhuma foto disponível no momento</p>
                </div>
              )}
            </div>
          </section>

          {/* Sección de Videos */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-bandfm-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <h2 className="text-3xl font-black text-gray-900 uppercase">Vídeos</h2>
                <span className="bg-bandfm-orange-100 text-bandfm-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                  {videos.length}
                </span>
              </div>

              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="aspect-video bg-black">
                        <video
                          src={video.url}
                          controls
                          className="w-full h-full object-contain"
                          preload="metadata"
                        />
                      </div>
                      <div className="p-4 border-t border-gray-100">
                        <p className="text-gray-900 font-semibold">{video.legenda}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Nenhum vídeo disponível no momento</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Modal para ver imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 bg-white text-gray-900 rounded-full p-3 shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-6xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.legenda}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-slideUp"
            />
            <div className="mt-4 bg-white/90 rounded-lg px-6 py-3 max-w-2xl">
              <p className="text-gray-900 font-semibold text-center">{selectedImage.legenda}</p>
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
              <p className="text-black text-sm">WhatsApp: +55 55 3242-4092</p>
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

