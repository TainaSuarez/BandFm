'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Podcast } from '@/types'
import PodcastPlayer from '@/components/PodcastPlayer'
import FileUpload from '@/components/FileUpload'

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    imagem: '',
    audioUrl: '',
    duracao: '',
    ativo: true
  })

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/podcasts')
      const data = await response.json()
      setPodcasts(data)
    } catch (error) {
      console.error('Error fetching podcasts:', error)
      alert('Erro ao carregar podcasts.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validar campos obrigatórios
      if (!formData.titulo.trim() || !formData.descricao.trim() || !formData.imagem.trim() || !formData.audioUrl.trim()) {
        alert('Título, descrição, imagem e áudio são obrigatórios')
        return
      }

      // Validar se são URLs válidas ou caminhos locais
      const isValidImageUrl = formData.imagem.startsWith('http') || formData.imagem.startsWith('/uploads/')
      const isValidAudioUrl = formData.audioUrl.startsWith('http') || formData.audioUrl.startsWith('/uploads/')
      
      if (!isValidImageUrl || !isValidAudioUrl) {
        alert('Por favor, selecione arquivos válidos para imagem e áudio')
        return
      }

      const submitData = {
        titulo: formData.titulo.trim(),
        descricao: formData.descricao.trim(),
        imagem: formData.imagem.trim(),
        audioUrl: formData.audioUrl.trim(),
        duracao: formData.duracao.trim() || undefined,
        ativo: formData.ativo
      }

      console.log('Submitting podcast data:', submitData)

      const url = editingPodcast ? `/api/podcasts/${editingPodcast.id}` : '/api/podcasts'
      const method = editingPodcast ? 'PUT' : 'POST'
      
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
        await fetchPodcasts()
        resetForm()
        alert(editingPodcast ? 'Podcast atualizado com sucesso!' : 'Podcast criado com sucesso!')
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

  const handleEdit = (podcast: Podcast) => {
    setEditingPodcast(podcast)
    setFormData({
      titulo: podcast.titulo,
      descricao: podcast.descricao,
      imagem: podcast.imagem,
      audioUrl: podcast.audioUrl,
      duracao: podcast.duracao || '',
      ativo: podcast.ativo
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este podcast?')) return

    try {
      const response = await fetch(`/api/podcasts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchPodcasts()
        alert('Podcast excluído com sucesso!')
      } else {
        alert('Erro ao excluir podcast')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const toggleActive = async (podcast: Podcast) => {
    try {
      const response = await fetch(`/api/podcasts/${podcast.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: !podcast.ativo }),
      })

      if (response.ok) {
        await fetchPodcasts()
      } else {
        alert('Erro ao alterar status do podcast')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingPodcast(null)
    setFormData({
      titulo: '',
      descricao: '',
      imagem: '',
      audioUrl: '',
      duracao: '',
      ativo: true
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Podcasts">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Podcasts">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Novo Podcast
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPodcast ? 'Editar Podcast' : 'Novo Podcast'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label="Imagem do Podcast"
                  currentUrl={formData.imagem}
                  onUpload={(url) => setFormData({ ...formData, imagem: url })}
                  type="image"
                  maxSize={10}
                />
                <FileUpload
                  accept=".mp3,.wav,.m4a"
                  label="Arquivo de Áudio"
                  currentUrl={formData.audioUrl}
                  onUpload={(url) => setFormData({ ...formData, audioUrl: url })}
                  type="audio"
                  maxSize={50}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duração (opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: 25:30"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.duracao}
                    onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Formato: MM:SS (ex: 25:30)
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ativo"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                  />
                  <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
                    Podcast ativo
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    {editingPodcast ? 'Salvar Alterações' : 'Criar Podcast'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Podcasts List */}
      <div className="space-y-6">
        {podcasts.length === 0 && !loading ? (
          <p className="text-center text-gray-500">Nenhum podcast encontrado.</p>
        ) : (
          podcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Podcast Image */}
                <div className="md:w-1/4">
                  <img
                    src={podcast.imagem}
                    alt={podcast.titulo}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                
                {/* Podcast Content */}
                <div className="md:w-3/4 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{podcast.titulo}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{podcast.descricao}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                          podcast.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {podcast.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                        <span>Criado em {new Date(podcast.createdAt).toLocaleDateString('pt-BR')}</span>
                        {podcast.duracao && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{podcast.duracao}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Audio Player */}
                  <div className="mb-4">
                    <PodcastPlayer 
                      audioUrl={podcast.audioUrl}
                      title={podcast.titulo}
                      duration={podcast.duracao}
                    />
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleActive(podcast)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        podcast.ativo 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {podcast.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(podcast)}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium hover:bg-yellow-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(podcast.id)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  )
}
