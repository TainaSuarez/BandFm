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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-bandfm-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProdutos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.produtosAtivos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produtos Inativos</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.produtosInativos}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/empresa/produtos"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-bandfm-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Adicionar Produto</h3>
              <p className="text-sm text-gray-600">Cadastre um novo produto</p>
            </div>
          </a>

          <a
            href="/empresa/perfil"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Editar Perfil</h3>
              <p className="text-sm text-gray-600">Atualize suas informações</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Produtos Recentes</h2>
        </div>
        <div className="p-6">
          {produtos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Você ainda não tem produtos cadastrados.</p>
              <a
                href="/empresa/produtos"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Cadastrar Primeiro Produto
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.slice(0, 6).map((produto) => (
                <div key={produto.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{produto.nome}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{produto.descricao}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        produto.ativo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {produto.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {produtos.length > 6 && (
            <div className="text-center mt-6">
              <a
                href="/empresa/produtos"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Ver todos os produtos →
              </a>
            </div>
          )}
        </div>
      </div>
    </EmpresaLayout>
  )
}

