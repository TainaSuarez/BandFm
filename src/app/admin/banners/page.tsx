'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Banner } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    imagem: '',
    ativo: true,
    ordem: 0
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners')
      const data = await response.json()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate required fields
      const imagemUrl = formData.imagem.trim()
      if (!imagemUrl) {
        alert('Imagem é obrigatória')
        return
      }

      // Validar se é URL válida ou caminho local
      const isValidImageUrl = imagemUrl.startsWith('http') || imagemUrl.startsWith('/uploads/')
      
      if (!isValidImageUrl) {
        alert('Por favor, selecione uma imagem válida')
        return
      }

      // Prepare data with proper validation
      const submitData = {
        titulo: `Banner ${Date.now()}`, // Auto-generate title
        imagem: imagemUrl,
        link: null,
        ativo: Boolean(formData.ativo),
        ordem: parseInt(formData.ordem.toString()) || 0
      }

      console.log('Submitting banner data:', submitData) // Debug log

      const url = editingBanner ? `/api/banners/${editingBanner.id}` : '/api/banners'
      const method = editingBanner ? 'PUT' : 'POST'
      
      console.log('Making request to:', url, 'with method:', method)
      console.log('Request data:', submitData)

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log('Success response:', result)
        await fetchBanners()
        resetForm()
        alert('Banner criado com sucesso!')
      } else {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
        console.error('Server error:', error)
        alert(`Erro do servidor: ${error.message}`)
      }
    } catch (error) {
      console.error('Network error:', error)
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        alert('Erro de conexão: Verifique se o servidor está executando em http://localhost:3000')
      } else {
        alert(`Erro de conexão: ${error.message}`)
      }
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      imagem: banner.imagem,
      ativo: banner.ativo,
      ordem: banner.ordem
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este banner?')) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchBanners()
      } else {
        alert('Erro ao excluir banner')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const toggleActive = async (banner: Banner) => {
    try {
      const response = await fetch(`/api/banners/${banner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...banner, ativo: !banner.ativo }),
      })

      if (response.ok) {
        await fetchBanners()
      } else {
        alert('Erro ao alterar status do banner')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingBanner(null)
    setFormData({
      imagem: '',
      ativo: true,
      ordem: 0
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Banners">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Banners">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Novo Banner
        </button>
        <button
          onClick={async () => {
            try {
              const response = await fetch('/api/test')
              const data = await response.json()
              alert(`API Test: ${data.message}`)
            } catch (error) {
              alert(`Erro de conectividade: ${error.message}`)
            }
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Testar API
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingBanner ? 'Editar Banner' : 'Novo Banner'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Imagem do Banner"
                  currentUrl={formData.imagem}
                  onUpload={(url) => setFormData({ ...formData, imagem: url })}
                  type="image"
                  maxSize={10}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ordem</label>
                  <input
                    type="number"
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.ordem.toString()}
                    onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ativo"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                  />
                  <label htmlFor="ativo" className="ml-2 block text-sm text-gray-700">
                    Banner ativo
                  </label>
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editingBanner ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Banners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={banner.imagem} 
                  alt={banner.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    banner.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {banner.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <span className="bg-blue-100 text-bandfm-green-600 px-2 py-1 rounded-full text-xs font-medium">
                    #{banner.ordem}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Banner #{banner.ordem} - {banner.ativo ? 'Ativo' : 'Inativo'}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      banner.ativo 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {banner.ativo ? 'Desativar' : 'Ativar'}
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-12">
            Nenhum banner criado ainda.
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
