'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Empresa, Produto } from '@/types'

import SiteNavbar from '@/components/SiteNavbar'

export default function EmpresaPublicPage() {
  const params = useParams()
  const empresaId = params.id as string
  
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (empresaId) {
      fetchEmpresa()
      fetchProdutos()
    }
  }, [empresaId])

  const fetchEmpresa = async () => {
    try {
      const response = await fetch(`/api/empresas/${empresaId}`)
      if (response.ok) {
        const data = await response.json()
        setEmpresa(data)
      } else {
        console.error('Empresa not found')
      }
    } catch (error) {
      console.error('Error fetching empresa:', error)
    }
  }

  const fetchProdutos = async () => {
    try {
      const response = await fetch(`/api/produtos?empresaId=${empresaId}&active=true`)
      const data = await response.json()
      setProdutos(data)
    } catch (error) {
      console.error('Error fetching produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
      </div>
    )
  }

  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa não encontrada</h1>
          <Link 
            href="/clube-ouvintes"
            className="bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Voltar ao Clube Ouvintes
          </Link>
        </div>
      </div>
    )
  }

  const handleWhatsAppContact = (produtoNome: string) => {
    const telefone = empresa.telefono?.replace(/\D/g, '') || ''
    const mensagem = `Olá, gostaria de saber mais sobre este produto "${produtoNome}"`
    const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <SiteNavbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 sm:space-x-4 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Início
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/clube-ouvintes" className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-500">
                    Clube Ouvintes
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 sm:ml-4 text-gray-500 truncate">{empresa.nome}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Empresa Header - Fondo Naranja */}
      <section className="bg-bandfm-orange-500 text-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botón Voltar */}
          <div className="mb-4 sm:mb-6">
            <Link 
              href="/clube-ouvintes"
              className="text-white hover:text-gray-100 font-bold flex items-center transition-colors duration-200 text-sm sm:text-base"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Clube Ouvintes
            </Link>
          </div>

          {/* Empresa Info */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start p-6 sm:p-8 lg:p-10 gap-6">
              {/* Foto da Empresa */}
              {empresa.foto && (
                <div className="flex-shrink-0">
                  <img 
                    src={empresa.foto} 
                    alt={empresa.nome}
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-xl sm:rounded-2xl object-cover shadow-lg border-3 sm:border-4 border-bandfm-orange-500"
                  />
                </div>
              )}
              
              {/* Información */}
              <div className="flex-1 text-center md:text-left w-full">
                {/* Nombre y Categoría */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-3 mb-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 break-words">
                    {empresa.nome}
                  </h1>
                  <span className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-bold bg-bandfm-green-500 text-white shadow-md mx-auto md:mx-0 w-fit">
                    {empresa.categoria}
                  </span>
                </div>
                
                {/* Descripción de la Empresa */}
                <div className="mb-5 sm:mb-6">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {empresa.descricao}
                  </p>
                </div>
                
                {/* Contacto */}
                <div className="flex flex-col items-center md:items-start space-y-3">
                  {/* Email */}
                  <a 
                    href={`mailto:${empresa.email}`} 
                    className="flex items-center text-gray-600 hover:text-bandfm-orange-500 transition-colors group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 group-hover:bg-bandfm-orange-100 flex items-center justify-center mr-3 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-sm sm:text-base break-all">{empresa.email}</span>
                  </a>
                  
                  {/* Telefone */}
                  {empresa.telefono && (
                    <a 
                      href={`https://wa.me/${empresa.telefono.replace(/\D/g, '')}?text=${encodeURIComponent('Olá, gostaria de obter informações sobre os produtos oferecidos...')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-bandfm-green-500 transition-colors group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 group-hover:bg-bandfm-green-100 flex items-center justify-center mr-3 transition-colors flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{empresa.telefono}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-6 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-8 lg:mb-12">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900 mb-1 sm:mb-2">
              Nossos Produtos
            </h2>
            {produtos.length > 0 && (
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                {produtos.length} {produtos.length === 1 ? 'produto disponível' : 'produtos disponíveis'}
              </p>
            )}
          </div>
          
          {produtos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {produtos.map((produto) => (
                <div 
                  key={produto.id} 
                  className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Imagen del Produto (click para mostrar descrição) */}
                  <div 
                    onClick={() => setExpandedDesc(prev => ({ ...prev, [produto.id]: !prev[produto.id] }))}
                    className="relative overflow-hidden bg-gray-100 cursor-pointer group"
                  >
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome} 
                      className="w-full h-40 sm:h-52 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-bandfm-green-500 text-white shadow-lg">
                        ✓ Disponível
                      </span>
                    </div>
                    {/* Indicador de click */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs sm:text-sm font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full">
                        Clique para ver descrição
                      </div>
                    </div>
                  </div>
                  {/* Descrição expandida abaixo da imagem */}
                  {expandedDesc[produto.id] && (
                    <div className="px-3 sm:px-4 lg:px-5 pt-3 pb-2">
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {produto.descricao}
                      </p>
                    </div>
                  )}
                  
                  {/* Info del Producto */}
                  <div className="p-3 sm:p-4 lg:p-5">
                    <h3 className="text-sm sm:text-base lg:text-lg font-black text-gray-900 mb-1.5 sm:mb-2 line-clamp-2">
                      {produto.nome}
                    </h3>
                    {/* Ocultamos la descripción del card principal; se muestra al hacer click en la foto */}
                    
                    {/* Precio */}
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Preço</p>
                          <span className="text-lg sm:text-xl lg:text-2xl font-black text-bandfm-green-500">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleWhatsAppContact(produto.nome)
                          }}
                          className="bg-bandfm-green-500 hover:bg-bandfm-green-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md whitespace-nowrap flex items-center gap-1.5 transition-all duration-100 active:scale-95"
                        >
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Consultar produto
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-md px-4">
              <div className="text-gray-300 mb-4 sm:mb-6">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-2 sm:mb-3">
                Nenhum produto disponível
              </h3>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-4">
                Esta empresa ainda não cadastrou produtos em nosso sistema.
              </p>
              <Link 
                href="/clube-ouvintes"
                className="inline-block bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Explorar outras empresas
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Imagen */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 group"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div 
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Produto em destaque"
                className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
              
              {/* Indicador de toque para cerrar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 font-medium shadow-lg">
                Clique fora para fechar
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
