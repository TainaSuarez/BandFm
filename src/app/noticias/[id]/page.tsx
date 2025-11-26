'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SiteNavbar from '@/components/SiteNavbar'
import { Noticia } from '@/types'
import Link from 'next/link'
 

export default function NoticiaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
 

  useEffect(() => {
    if (params.id) {
      fetchNoticia(params.id as string)
    }
  }, [params.id])

  const fetchNoticia = async (id: string) => {
    try {
      const response = await fetch(`/api/noticias/${id}`)
      if (response.ok) {
        const data = await response.json()
        setNoticia(data)
      } else {
        console.error('Noticia no encontrada')
      }
    } catch (error) {
      console.error('Error fetching noticia:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteNavbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
        </div>
      </div>
    )
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteNavbar />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
          <Link 
            href="/noticias"
            className="inline-flex items-center px-6 py-3 bg-bandfm-orange-500 text-white font-bold rounded-lg hover:bg-bandfm-orange-600 transition-colors"
          >
            ← Voltar para notícias
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-bandfm-orange-600 hover:text-bandfm-orange-700">
              Início
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/noticias" className="text-bandfm-orange-600 hover:text-bandfm-orange-700">
              Notícias
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{noticia.titulo}</span>
          </nav>
        </div>
      </div>

      {/* Conteúdo da notícia */}
      <article className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-bandfm-orange-600 hover:text-bandfm-orange-700 font-semibold mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para notícias
        </button>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {noticia.titulo}
        </h1>

        {/* Data */}
        <div className="flex items-center text-gray-500 mb-8">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
          </svg>
          {new Date(noticia.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </div>

        {/* Imagem */}
        {noticia.imagem && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={noticia.imagem} 
              alt={noticia.titulo}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Descrição */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {noticia.descricao}
          </p>
        </div>

        {/* Fonte original */}
        <div className="bg-bandfm-orange-50 border-l-4 border-bandfm-orange-500 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-bandfm-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Fonte original
              </h3>
              <p className="text-gray-700 mb-3">
                Para ler a notícia completa e mais informações, visite a fonte original:
              </p>
              <a 
                href={noticia.fonte} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-bandfm-orange-500 text-white font-bold rounded-lg hover:bg-bandfm-orange-600 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ler notícia completa
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6 mt-12">
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

