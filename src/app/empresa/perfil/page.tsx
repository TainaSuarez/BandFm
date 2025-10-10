'use client'

import { useState, useEffect } from 'react'
import EmpresaLayout from '@/components/EmpresaLayout'
import { Empresa } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function EmpresaPerfilPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    foto: '',
    email: '',
    descricao: '',
    categoria: ''
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
    
    // Buscar dados completos da empresa
    fetchEmpresaData(empresaData.id)
  }, [])

  const fetchEmpresaData = async (empresaId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/empresas/${empresaId}`)
      if (response.ok) {
        const data = await response.json()
        setEmpresa(data)
        setFormData({
          nome: data.nome || '',
          foto: data.foto || '',
          email: data.email || '',
          descricao: data.descricao || '',
          categoria: data.categoria || ''
        })
      } else {
        throw new Error('Erro ao carregar dados da empresa')
      }
    } catch (error) {
      console.error('Error fetching empresa data:', error)
      alert('Erro ao carregar dados da empresa.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!empresa) {
      alert('Erro: empresa não encontrada')
      return
    }
    
    setSaving(true)
    
    try {
      // Validar campos obrigatórios
      if (!formData.nome.trim() || !formData.email.trim() || !formData.descricao.trim() || !formData.categoria.trim()) {
        alert('Nome, email, descrição e categoria são obrigatórios')
        setSaving(false)
        return
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Por favor, insira um email válido')
        setSaving(false)
        return
      }

      // Validar URL da foto se fornecida
      if (formData.foto && formData.foto.trim()) {
        const isValidImageUrl = formData.foto.startsWith('http') || formData.foto.startsWith('/uploads/')
        
        if (!isValidImageUrl) {
          alert('Por favor, selecione uma foto válida')
          setSaving(false)
          return
        }
      }

      const submitData = {
        nome: formData.nome.trim(),
        foto: formData.foto.trim() || null,
        email: formData.email.trim(),
        descricao: formData.descricao.trim(),
        categoria: formData.categoria.trim()
      }

      console.log('Updating empresa data:', submitData)

      const response = await fetch(`/api/empresas/${empresa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Success response:', result)
        
        // Atualizar dados na sessão
        const updatedEmpresa = { ...empresa, ...submitData }
        setEmpresa(updatedEmpresa)
        localStorage.setItem('empresa-session', JSON.stringify(updatedEmpresa))
        
        setIsEditing(false)
        alert('Perfil atualizado com sucesso!')
      } else {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
        console.error('Server error:', error)
        alert(`Erro do servidor: ${error.message}`)
      }
    } catch (error: any) {
      console.error('Network error:', error)
      alert(`Erro de conexão: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    if (empresa) {
      setFormData({
        nome: empresa.nome || '',
        foto: empresa.foto || '',
        email: empresa.email || '',
        descricao: empresa.descricao || '',
        categoria: empresa.categoria || ''
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <EmpresaLayout title="Perfil da Empresa">
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
      <EmpresaLayout title="Perfil da Empresa">
        <div className="text-center">
          <p className="text-red-600">Erro ao carregar dados da empresa.</p>
        </div>
      </EmpresaLayout>
    )
  }

  return (
    <EmpresaLayout title="Perfil da Empresa">
      <div className="max-w-4xl mx-auto">
        {!isEditing ? (
          /* Vista de visualización */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header con foto de portada */}
            <div className="h-32 bg-gradient-to-r from-orange-500 to-green-500"></div>
            
            <div className="px-8 pb-8">
              {/* Foto de perfil */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
                <div className="relative">
                  {empresa.foto ? (
                    <img
                      src={empresa.foto}
                      alt={empresa.nome}
                      className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                  <h2 className="text-3xl font-black text-gray-900">{empresa.nome}</h2>
                  <p className="text-orange-600 font-semibold">{empresa.categoria}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </button>
              </div>

              {/* Información detallada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Email */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Email</p>
                      <p className="text-gray-900 font-medium">{empresa.email}</p>
                    </div>
                  </div>
                </div>

                {/* Categoria */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Categoria</p>
                      <p className="text-gray-900 font-medium">{empresa.categoria}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Descrição</p>
                    <p className="text-gray-700 leading-relaxed">{empresa.descricao}</p>
                  </div>
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-blue-900 mb-2">
                      Informações Importantes
                    </h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Suas informações aparecerão na página "Clube Ouvintes"</p>
                      <p>• Seus produtos serão listados na página principal</p>
                      <p>• Mantenha suas informações sempre atualizadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vista de edición */
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Editar Informações</h2>
                <p className="text-gray-600">Atualize as informações do seu perfil</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Foto da Empresa */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Foto da Empresa
                </label>
                <FileUpload
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  label=""
                  currentUrl={formData.foto}
                  onUpload={(url) => setFormData({ ...formData, foto: url })}
                  type="image"
                  maxSize={5}
                />
              </div>

              {/* Nome */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Este email será usado para login
                </p>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Categoria *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Restaurante, Loja de Roupas, Serviços"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Descreva sua empresa, produtos e serviços..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </EmpresaLayout>
  )
}
