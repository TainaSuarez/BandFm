'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SiteNavbar from '@/components/SiteNavbar'
import { Noticia } from '@/types'
import Link from 'next/link'
import FooterQuickAccess from '@/components/FooterQuickAccess'

export default function NoticiaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [noticia, setNoticia] = useState<Noticia | null>(null)
  const [loading, setLoading] = useState(true)
  const bandUrl = process.env.NEXT_PUBLIC_BAND_URL || '/'

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
              <p className="text-black text-sm">Email: bandfm@bandfmfronteira.com.br</p>
              <p className="text-black text-sm">Telefone: +55 3242 4092</p>
              <p className="text-black text-sm">WhatsApp: +11 3743 1313</p>
              <div className="mt-3 flex justify-end">
                <FooterQuickAccess linkUrl={bandUrl} label="Acessar página" />
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

