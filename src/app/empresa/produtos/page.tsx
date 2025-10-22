'use client'

import { useState, useEffect } from 'react'
import EmpresaLayout from '@/components/EmpresaLayout'
import { Empresa, Produto } from '@/types'
import FileUpload from '@/components/FileUpload'
import { useToast } from '@/hooks/useToast'

export default function EmpresaProdutosPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { success, error, warning, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: '',
    preco: '',
    ativo: true
  })

  const fetchProdutos = async (empresaId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/produtos?empresaId=${empresaId}`)
      const data = await response.json()
      setProdutos(data)
    } catch (err) {
      console.error('Error fetching produtos:', err)
      error('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

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
        error('Erro: ID da empresa não encontrado na sessão')
      }
    } catch (err) {
      console.error('Error parsing empresa session:', err)
      error('Erro ao carregar dados da empresa')
      window.location.href = '/login-empresa'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!empresa) {
      console.error('Empresa not found in state:', empresa)
      error('Erro: empresa não encontrada')
      return
    }
    
    if (!empresa.id) {
      console.error('Empresa ID not found:', empresa)
      error('Erro: ID da empresa não encontrado')
      return
    }
    
    try {
      // Validar campos obrigatórios
      if (!formData.nome.trim() || !formData.descricao.trim() || !formData.imagem.trim() || !formData.preco) {
        warning('Todos os campos são obrigatórios')
        return
      }

      // Validar preço
      const preco = parseFloat(formData.preco)
      if (isNaN(preco) || preco <= 0) {
        warning('Preço deve ser um número válido maior que zero')
        return
      }

      // Validar se é URL válida ou caminho local
      const isValidImageUrl = formData.imagem.startsWith('http') || formData.imagem.startsWith('/uploads/')
      
      if (!isValidImageUrl) {
        warning('Por favor, selecione uma imagem válida')
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
        success(editingProduto ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!')
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
        console.error('Server error:', errorData)
        error(`Erro do servidor: ${errorData.message}`)
      }
    } catch (err: any) {
      console.error('Network error:', err)
      error(`Erro de conexão: ${err.message}`)
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
        success('Produto excluído com sucesso!')
      } else {
        error('Erro ao excluir produto')
      }
    } catch (err) {
      error('Erro de conexão')
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
        error('Erro ao alterar status do produto')
      }
    } catch (err) {
      error('Erro de conexão')
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

  // Filtrar produtos por búsqueda
  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <EmpresaLayout title="Gestão de Produtos">
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-orange-500 border-r-green-500 absolute top-0 left-0"></div>
          </div>
        </div>
      </EmpresaLayout>
    )
  }

  return (
    <EmpresaLayout title="Meus Produtos">
      {/* Barra de búsqueda y botón */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Produto
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative mx-auto w-full max-w-2xl transform transition-all">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header del modal */}
              <div className="bg-white border-b-2 border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {editingProduto ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                    {editingProduto ? 'Editar Produto' : 'Novo Produto'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Produto Incrível"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descreva seu produto..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Imagem do Produto
                  </label>
                  <FileUpload
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    label=""
                    currentUrl={formData.imagem}
                    onUpload={(url) => setFormData({ ...formData, imagem: url })}
                    type="image"
                    maxSize={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preço (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="ativo"
                      className="w-5 h-5 text-green-600 focus:ring-green-500 border-2 border-gray-300 rounded"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                    />
                    <span className="ml-3 text-sm font-bold text-gray-700">
                      Produto ativo e visível no catálogo
                    </span>
                  </label>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t-2 border-gray-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold transition-all hover:shadow-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold transition-all hover:shadow-lg"
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
      {filteredProdutos.length === 0 && !loading ? (
        <div className="col-span-full text-center py-16">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-2xl text-gray-400 font-bold mb-2">
            {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
          </p>
          <p className="text-gray-500">
            {searchTerm ? 'Tente buscar com outros termos' : 'Comece adicionando seu primeiro produto!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProdutos.map((produto) => (
            <div 
              key={produto.id} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-orange-200"
            >
              {/* Imagen del producto */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                    produto.ativo 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {produto.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>

              {/* Contenido del producto */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {produto.descricao}
                </p>
                
                {/* Precio */}
                <div className="mb-5">
                  <p className="text-2xl font-black text-orange-600">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
                
                {/* Botones de acción */}
                <div className="space-y-3">
                  {/* Toggle activo/inactivo */}
                  <button
                    onClick={() => toggleActive(produto)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      produto.ativo 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200' 
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                    }`}
                  >
                    {produto.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  
                  {/* Editar y Eliminar */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(produto)}
                      className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all border-2 border-gray-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
    </EmpresaLayout>
  )
}
