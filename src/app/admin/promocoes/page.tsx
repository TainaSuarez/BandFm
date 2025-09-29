'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Promocao } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function PromocoesPage() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPromocao, setEditingPromocao] = useState<Promocao | null>(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    imagem: ''
  })

  useEffect(() => {
    fetchPromocoes()
  }, [])

  const fetchPromocoes = async () => {
    try {
      const response = await fetch('/api/promocoes')
      const data = await response.json()
      setPromocoes(data)
    } catch (error) {
      console.error('Error fetching promocoes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingPromocao ? `/api/promocoes/${editingPromocao.id}` : '/api/promocoes'
      const method = editingPromocao ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchPromocoes()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao salvar promoção')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const handleEdit = (promocao: Promocao) => {
    setEditingPromocao(promocao)
    setFormData({
      titulo: promocao.titulo,
      descricao: promocao.descricao,
      imagem: promocao.imagem || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta promoção?')) return

    try {
      const response = await fetch(`/api/promocoes/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchPromocoes()
      } else {
        alert('Erro ao excluir promoção')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingPromocao(null)
    setFormData({
      titulo: '',
      descricao: '',
      imagem: ''
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Promoções">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Promoções">
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Nova Promoção
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPromocao ? 'Editar Promoção' : 'Nova Promoção'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Imagem da Promoção (Opcional)"
                  currentUrl={formData.imagem}
                  onUpload={(url) => setFormData({ ...formData, imagem: url })}
                  type="image"
                  maxSize={5}
                />
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
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editingPromocao ? 'Atualizar' : 'Publicar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Promocoes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promocoes.length > 0 ? (
          promocoes.map((promocao) => (
            <div key={promocao.id} className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-3">
                  {promocao.titulo}
                </h3>
                <p className="text-lg mb-4">
                  {promocao.descricao}
                </p>
                {promocao.imagem && (
                  <img 
                    src={promocao.imagem} 
                    alt={promocao.titulo}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(promocao)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(promocao.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500 py-12">
            Nenhuma promoção ativa no momento.
          </div>
        )}
      </div>
    </AdminLayout>
  )
}



