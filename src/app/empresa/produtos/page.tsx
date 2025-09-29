'use client'

import { useState, useEffect } from 'react'
import EmpresaLayout from '@/components/EmpresaLayout'
import { Empresa, Produto } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function EmpresaProdutosPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: '',
    preco: '',
    ativo: true
  })

  useEffect(() => {
    // Verificar se a empresa está logada
    const empresaSession = localStorage.getItem('empresa-session')
    console.log('Empresa session from localStorage:', empresaSession)
    
    if (!empresaSession) {
      console.log('No empresa session found, redirecting to login')
      window.location.href = '/login-empresa'
      return
    }

    try {
      const empresaData = JSON.parse(empresaSession)
      console.log('Parsed empresa data:', empresaData)
      setEmpresa(empresaData)
      
      if (empresaData.id) {
        fetchProdutos(empresaData.id)
      } else {
        console.error('Empresa ID not found in session data')
        alert('Erro: ID da empresa não encontrado na sessão')
      }
    } catch (error) {
      console.error('Error parsing empresa session:', error)
      alert('Erro ao carregar dados da empresa')
      window.location.href = '/login-empresa'
    }
  }, [])

  const fetchProdutos = async (empresaId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/produtos?empresaId=${empresaId}`)
      const data = await response.json()
      setProdutos(data)
    } catch (error) {
      console.error('Error fetching produtos:', error)
      alert('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!empresa) {
      console.error('Empresa not found in state:', empresa)
      alert('Erro: empresa não encontrada')
      return
    }
    
    if (!empresa.id) {
      console.error('Empresa ID not found:', empresa)
      alert('Erro: ID da empresa não encontrado')
      return
    }
    
    try {
      // Validar campos obrigatórios
      if (!formData.nome.trim() || !formData.descricao.trim() || !formData.imagem.trim() || !formData.preco) {
        alert('Todos os campos são obrigatórios')
        return
      }

      // Validar preço
      const preco = parseFloat(formData.preco)
      if (isNaN(preco) || preco <= 0) {
        alert('Preço deve ser um número válido maior que zero')
        return
      }

      // Validar se é URL válida ou caminho local
      const isValidImageUrl = formData.imagem.startsWith('http') || formData.imagem.startsWith('/uploads/')
      
      if (!isValidImageUrl) {
        alert('Por favor, selecione uma imagem válida')
        return
      }

      const submitData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim(),
        imagem: formData.imagem.trim(),
        preco: preco,
        empresaId: empresa.id,
        ativo: formData.ativo
      }

      console.log('Submitting produto data:', submitData)

      const url = editingProduto ? `/api/produtos/${editingProduto.id}` : '/api/produtos'
      const method = editingProduto ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Success response:', result)
        await fetchProdutos(empresa.id)
        resetForm()
        alert(editingProduto ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!')
      } else {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
        console.error('Server error:', error)
        alert(`Erro do servidor: ${error.message}`)
      }
    } catch (error: any) {
      console.error('Network error:', error)
      alert(`Erro de conexão: ${error.message}`)
    }
  }

  const handleEdit = (produto: Produto) => {
    setEditingProduto(produto)
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      imagem: produto.imagem,
      preco: produto.preco.toString(),
      ativo: produto.ativo
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchProdutos(empresa!.id)
        alert('Produto excluído com sucesso!')
      } else {
        alert('Erro ao excluir produto')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const toggleActive = async (produto: Produto) => {
    try {
      const response = await fetch(`/api/produtos/${produto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: !produto.ativo }),
      })

      if (response.ok) {
        await fetchProdutos(empresa!.id)
      } else {
        alert('Erro ao alterar status do produto')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduto(null)
    setFormData({
      nome: '',
      descricao: '',
      imagem: '',
      preco: '',
      ativo: true
    })
  }

  if (loading) {
    return (
      <EmpresaLayout title="Gestão de Produtos">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </EmpresaLayout>
    )
  }

  return (
    <EmpresaLayout title="Gestão de Produtos">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Novo Produto
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProduto ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Imagem do Produto"
                  currentUrl={formData.imagem}
                  onUpload={(url) => setFormData({ ...formData, imagem: url })}
                  type="image"
                  maxSize={5}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ativo"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                  />
                  <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
                    Produto ativo
                  </label>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editingProduto ? 'Salvar Alterações' : 'Criar Produto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.length === 0 && !loading ? (
          <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado.</p>
        ) : (
          produtos.map((produto) => (
            <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    produto.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{produto.nome}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{produto.descricao}</p>
                <p className="text-xl font-bold text-green-600 mb-4">R$ {produto.preco.toFixed(2)}</p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleActive(produto)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      produto.ativo 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {produto.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(produto)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium hover:bg-yellow-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </EmpresaLayout>
  )
}
