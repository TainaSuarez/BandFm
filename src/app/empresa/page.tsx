'use client'

import { useState, useEffect } from 'react'
import EmpresaLayout from '@/components/EmpresaLayout'
import { Empresa, Produto } from '@/types'

export default function EmpresaDashboard() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProdutos: 0,
    produtosAtivos: 0,
    produtosInativos: 0
  })

  useEffect(() => {
    // Verificar se a empresa está logada
    const empresaSession = localStorage.getItem('empresa-session')
    if (!empresaSession) {
      window.location.href = '/login-empresa'
      return
    }

    const empresaData = JSON.parse(empresaSession)
    setEmpresa(empresaData)
    
    fetchProdutos(empresaData.id)
  }, [])

  const fetchProdutos = async (empresaId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/produtos?empresaId=${empresaId}`)
      const data = await response.json()
      setProdutos(data)
      
      // Calcular estatísticas
      const totalProdutos = data.length
      const produtosAtivos = data.filter((p: Produto) => p.ativo).length
      const produtosInativos = totalProdutos - produtosAtivos
      
      setStats({
        totalProdutos,
        produtosAtivos,
        produtosInativos
      })
    } catch (error) {
      console.error('Error fetching produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <EmpresaLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-orange-500 border-r-green-500 absolute top-0 left-0"></div>
          </div>
        </div>
      </EmpresaLayout>
    )
  }

  if (!empresa) {
    return (
      <EmpresaLayout title="Dashboard">
        <div className="text-center">
          <p className="text-red-600">Erro ao carregar dados da empresa.</p>
        </div>
      </EmpresaLayout>
    )
  }

  return (
    <EmpresaLayout title={`Bem-vinda, ${empresa.nome}!`}>
      {/* Stats Cards - Mejorados con naranja y verde */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total de Produtos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all">
          <div className="flex items-center">
            <div className="p-4 rounded-xl bg-orange-100">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase">Total de Produtos</p>
              <p className="text-3xl font-black text-orange-600">{stats.totalProdutos}</p>
            </div>
          </div>
        </div>

        {/* Produtos Ativos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all">
          <div className="flex items-center">
            <div className="p-4 rounded-xl bg-green-100">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase">Produtos Ativos</p>
              <p className="text-3xl font-black text-green-600">{stats.produtosAtivos}</p>
            </div>
          </div>
        </div>

        {/* Produtos Inativos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-400 hover:shadow-xl transition-all">
          <div className="flex items-center">
            <div className="p-4 rounded-xl bg-gray-100">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase">Produtos Inativos</p>
              <p className="text-3xl font-black text-gray-600">{stats.produtosInativos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mejoradas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-gray-300">
        <h2 className="text-2xl font-black text-green-600 mb-6 flex items-center gap-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/empresa/produtos"
            className="group flex items-center p-5 border-2 border-orange-200 rounded-xl hover:bg-orange-50 transition-all hover:shadow-lg hover:border-orange-400"
          >
            <div className="p-3 bg-orange-500 rounded-xl mr-4 group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg group-hover:text-orange-600 transition-colors">Adicionar Produto</h3>
              <p className="text-sm text-gray-600 font-semibold">Cadastre um novo produto</p>
            </div>
          </a>

          <a
            href="/empresa/perfil"
            className="group flex items-center p-5 border-2 border-green-200 rounded-xl hover:bg-green-50 transition-all hover:shadow-lg hover:border-green-400"
          >
            <div className="p-3 bg-green-500 rounded-xl mr-4 group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg group-hover:text-green-600 transition-colors">Editar Perfil</h3>
              <p className="text-sm text-gray-600 font-semibold">Atualize suas informações</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Products - Mejorado */}
      <div className="bg-white rounded-2xl shadow-lg border-t-4 border-gray-300">
        <div className="px-6 py-5 border-b-2 border-gray-100">
          <h2 className="text-2xl font-black text-green-600 flex items-center gap-2">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Produtos Recentes
          </h2>
        </div>
        <div className="p-6">
          {produtos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-xl text-gray-600 font-bold mb-6">Você ainda não tem produtos cadastrados.</p>
              <a
                href="/empresa/produtos"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Cadastrar Primeiro Produto
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.slice(0, 6).map((produto) => (
                <div key={produto.id} className="group border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-orange-300 transition-all hover:shadow-xl">
                  <div className="relative h-48 w-full bg-gray-100">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{produto.nome}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{produto.descricao}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-orange-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        produto.ativo 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {produto.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-300"></div>
                </div>
              ))}
            </div>
          )}
          
          {produtos.length > 6 && (
            <div className="text-center mt-8">
              <a
                href="/empresa/produtos"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold text-lg hover:underline"
              >
                Ver todos os produtos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </EmpresaLayout>
  )
}
