'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Empresa, Produto } from '@/types'
import LoginDropdown from '@/components/LoginDropdown'

export default function EmpresaPublicPage() {
  const params = useParams()
  const empresaId = params.id as string
  
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            className="bg-blue-600 hover:bg-gray-600 text-black font-semibold py-2 px-4 rounded-md"
          >
            Voltar ao Clube Ouvintes
          </Link>
        </div>
      </div>
    )
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
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
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
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black bg-gray-100 block px-3 py-2 rounded-md text-base font-helvetica-black">
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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Início
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/clube-ouvintes" className="ml-4 text-gray-400 hover:text-gray-500">
                    Clube Ouvintes
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-500">{empresa.nome}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Empresa Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-black py-16">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-8">
            {empresa.foto && (
              <div className="flex-shrink-0">
                <img 
                  src={empresa.foto} 
                  alt={empresa.nome}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-bold">{empresa.nome}</h1>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-helvetica-black bg-white bg-opacity-20">
                  {empresa.categoria}
                </span>
              </div>
              <p className="text-xl text-blue-100 mb-4">
                {empresa.descricao}
              </p>
              <div className="flex items-center text-blue-100">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href={`mailto:${empresa.email}`} className="hover:text-bandfm-orange-500 transition-colors">
                  {empresa.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Nossos Produtos {produtos.length > 0 && `(${produtos.length})`}
            </h2>
            <Link 
              href="/clube-ouvintes"
              className="text-bandfm-green-500 hover:text-blue-700 font-helvetica-black flex items-center"
            >
              ← Voltar ao Clube Ouvintes
            </Link>
          </div>
          
          {produtos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {produtos.map((produto) => (
                <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {produto.nome}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {produto.descricao}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">
                        ✓ Disponível
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-helvetica-black text-gray-900 mb-2">
                Nenhum produto disponível
              </h3>
              <p className="text-gray-500 mb-6">
                Esta empresa ainda não cadastrou produtos em nosso sistema.
              </p>
              <Link 
                href="/clube-ouvintes"
                className="bg-blue-600 hover:bg-gray-600 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-200"
              >
                Explorar outras empresas
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-12">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Band FM</h3>
              <p className="text-gray-400">
                A sua rádio do seu jeito. Conectando você com o melhor da música e informação.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-bandfm-orange-500">Início</Link></li>
                <li><Link href="/noticias" className="text-gray-400 hover:text-bandfm-orange-500">Notícias</Link></li>
                <li><Link href="/programacao" className="text-gray-400 hover:text-bandfm-orange-500">Programação</Link></li>
                <li><Link href="/equipe" className="text-gray-400 hover:text-bandfm-orange-500">Equipe</Link></li>
                <li><Link href="/sobre" className="text-gray-400 hover:text-bandfm-orange-500">Sobre</Link></li>
                <li><Link href="/clube-ouvintes" className="text-gray-400 hover:text-bandfm-orange-500">Clube Ouvintes</Link></li>
                <li><Link href="/promocoes" className="text-gray-400 hover:text-bandfm-orange-500">Promoções</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <p className="text-gray-400">Email: bandfm@bandfmfronteira.com.br</p>
              <p className="text-gray-400">Telefone: +55 3242 4092</p>
              <p className="text-gray-400">WhatsApp: +11 3743 1313</p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Band FM 96.1 Livramento. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
