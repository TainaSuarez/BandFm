'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { GaleriaItem } from '@/types'
import FileUpload from '@/components/FileUpload'
import { useToast } from '@/hooks/useToast'

export default function GaleriaAdminPage() {
  const [items, setItems] = useState<GaleriaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GaleriaItem | null>(null)
  const { success, error, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    tipo: 'foto' as 'foto' | 'video',
    url: '',
    legenda: '',
    ativo: true,
    ordem: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/galeria')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingItem ? `/api/galeria/${editingItem.id}` : '/api/galeria'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchItems()
        resetForm()
        success(editingItem ? 'Item atualizado com sucesso!' : 'Item criado com sucesso!')
      } else {
        const errorData = await response.json()
        error(errorData.message || 'Erro ao salvar item')
      }
    } catch (err) {
      error('Erro de conexão')
    }
  }

  const handleEdit = (item: GaleriaItem) => {
    setEditingItem(item)
    setFormData({
      tipo: item.tipo,
      url: item.url,
      legenda: item.legenda,
      ativo: item.ativo,
      ordem: item.ordem
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return

    try {
      const response = await fetch(`/api/galeria/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchItems()
        success('Item excluído com sucesso!')
      } else {
        error('Erro ao excluir item')
      }
    } catch (err) {
      error('Erro de conexão')
    }
  }

  const resetForm = () => {
    setFormData({
      tipo: 'foto',
      url: '',
      legenda: '',
      ativo: true,
      ordem: 0
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const fotos = items.filter(item => item.tipo === 'foto')
  const videos = items.filter(item => item.tipo === 'video')

  return (
    <AdminLayout title="Galeria">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Galeria</h2>
          <p className="text-gray-600 mt-1">Adicione fotos e vídeos à galeria</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          {showForm ? 'Cancelar' : '+ Novo Item'}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-bandfm-orange-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            {editingItem ? 'Editar Item' : 'Novo Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as 'foto' | 'video' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                  required
                >
                  <option value="foto">Foto</option>
                  <option value="video">Vídeo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Ordem
                </label>
                <input
                  type="number"
                  value={formData.ordem}
                  onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>

            <div>
              <FileUpload
                accept={formData.tipo === 'foto' ? '.jpg,.jpeg,.png,.gif,.webp' : '.mp4,.webm,.mov,.avi'}
                label={formData.tipo === 'foto' ? 'Selecionar Imagem *' : 'Selecionar Vídeo *'}
                currentUrl={formData.url}
                onUpload={(url) => setFormData({ ...formData, url })}
                type={formData.tipo === 'foto' ? 'image' : 'video'}
                maxSize={formData.tipo === 'foto' ? 10 : 100}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Legenda / Pie de {formData.tipo === 'foto' ? 'foto' : 'vídeo'} *
              </label>
              <textarea
                value={formData.legenda}
                onChange={(e) => setFormData({ ...formData, legenda: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                rows={3}
                required
                placeholder="Descreva a foto ou vídeo..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                className="w-4 h-4 text-bandfm-orange-500 border-gray-300 rounded focus:ring-bandfm-orange-500"
              />
              <label htmlFor="ativo" className="ml-2 text-sm font-medium text-gray-700">
                Item ativo (visível na galeria pública)
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                {editingItem ? 'Atualizar Item' : 'Criar Item'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Items */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500 mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Fotos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-bandfm-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Fotos ({fotos.length})
            </h3>
            {fotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {fotos.map((foto) => (
                  <div key={foto.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="aspect-square">
                      <img src={foto.url} alt={foto.legenda} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">{foto.legenda}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(foto)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(foto.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">Nenhuma foto adicionada</p>
            )}
          </div>

          {/* Videos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-bandfm-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Vídeos ({videos.length})
            </h3>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="aspect-video">
                      <iframe
                        src={video.url}
                        title={video.legenda}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">{video.legenda}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">Nenhum vídeo adicionado</p>
            )}
          </div>
        </div>
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
    </AdminLayout>
  )
}

