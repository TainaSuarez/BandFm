'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Noticia } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null)
  const [formData, setFormData] = useState({
    titulo: '',
    imagem: '',
    descricao: '',
    fonte: ''
  })

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/api/noticias')
      const data = await response.json()
      setNoticias(data)
    } catch (error) {
      console.error('Error fetching noticias:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingNoticia ? `/api/noticias/${editingNoticia.id}` : '/api/noticias'
      const method = editingNoticia ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchNoticias()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao salvar notícia')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const handleEdit = (noticia: Noticia) => {
    setEditingNoticia(noticia)
    setFormData({
      titulo: noticia.titulo,
      imagem: noticia.imagem || '',
      descricao: noticia.descricao,
      fonte: noticia.fonte
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return

    try {
      const response = await fetch(`/api/noticias/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchNoticias()
      } else {
        alert('Erro ao excluir notícia')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingNoticia(null)
    setFormData({
      titulo: '',
      imagem: '',
      descricao: '',
      fonte: ''
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Notícias">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Notícias">
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Nova Notícia
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 px-4">
          <div className="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-md shadow-lg rounded-md bg-white my-8">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingNoticia ? 'Editar Notícia' : 'Nova Notícia'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  />
                </div>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Imagem da Notícia"
                  currentUrl={formData.imagem}
                  onUpload={(url) => setFormData({ ...formData, imagem: url })}
                  type="image"
                  maxSize={5}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fonte (Link)</label>
                  <input
                    type="url"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={formData.fonte}
                    onChange={(e) => setFormData({ ...formData, fonte: e.target.value })}
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
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editingNoticia ? 'Atualizar' : 'Publicar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Noticias List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {noticias.length > 0 ? (
          noticias.map((noticia) => (
            <div key={noticia.id} className="bg-white overflow-hidden shadow rounded-lg">
              {noticia.imagem && (
                <img 
                  src={noticia.imagem} 
                  alt={noticia.titulo}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              )}
              <div className="px-4 py-4 sm:py-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  {noticia.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {noticia.descricao}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <a 
                    href={noticia.fonte} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Ver fonte →
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(noticia)}
                      className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(noticia.id)}
                      className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            Nenhuma notícia publicada ainda.
          </div>
        )}
      </div>
    </AdminLayout>
  )
}



