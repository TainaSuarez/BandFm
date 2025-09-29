'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Empresa } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    foto: '',
    email: '',
    senha: '',
    descricao: '',
    categoria: ''
  })

  useEffect(() => {
    fetchEmpresas()
  }, [])

  const fetchEmpresas = async () => {
    try {
      const response = await fetch('/api/empresas')
      const data = await response.json()
      setEmpresas(data)
    } catch (error) {
      console.error('Error fetching empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingEmpresa ? `/api/empresas/${editingEmpresa.id}` : '/api/empresas'
      const method = editingEmpresa ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchEmpresas()
        setShowForm(false)
        setEditingEmpresa(null)
        setFormData({
          nome: '',
          foto: '',
          email: '',
          senha: '',
          descricao: '',
          categoria: ''
        })
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao salvar empresa')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const handleEdit = (empresa: Empresa) => {
    setEditingEmpresa(empresa)
    setFormData({
      nome: empresa.nome,
      foto: empresa.foto || '',
      email: empresa.email,
      senha: '', // Don't prefill password
      descricao: empresa.descricao,
      categoria: empresa.categoria
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return

    try {
      const response = await fetch(`/api/empresas/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchEmpresas()
      } else {
        alert('Erro ao excluir empresa')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingEmpresa(null)
    setFormData({
      nome: '',
      foto: '',
      email: '',
      senha: '',
      descricao: '',
      categoria: ''
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Empresas">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Empresas">
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Nova Empresa
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingEmpresa ? 'Editar Empresa' : 'Nova Empresa'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Foto da Empresa"
                  currentUrl={formData.foto}
                  onUpload={(url) => setFormData({ ...formData, foto: url })}
                  type="image"
                  maxSize={5}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {editingEmpresa ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha'}
                  </label>
                  <input
                    type="password"
                    required={!editingEmpresa}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editingEmpresa ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Empresas List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {empresas.length > 0 ? (
            empresas.map((empresa) => (
              <li key={empresa.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {empresa.foto && (
                        <img 
                          src={empresa.foto} 
                          alt={empresa.nome}
                          className="h-10 w-10 rounded-full mr-4 object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {empresa.nome}
                        </p>
                        <p className="text-sm text-gray-500">
                          {empresa.email} • {empresa.categoria}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(empresa)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(empresa.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {empresa.descricao}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              Nenhuma empresa cadastrada ainda.
            </li>
          )}
        </ul>
      </div>
    </AdminLayout>
  )
}



