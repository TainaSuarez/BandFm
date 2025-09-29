'use client'

import { useState, useEffect } from 'react'
import EmpresaLayout from '@/components/EmpresaLayout'
import { Empresa } from '@/types'
import FileUpload from '@/components/FileUpload'

export default function EmpresaPerfilPage() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
        return
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Por favor, insira um email válido')
        return
      }

      // Validar URL da foto se fornecida
      if (formData.foto && formData.foto.trim()) {
        const isValidImageUrl = formData.foto.startsWith('http') || formData.foto.startsWith('/uploads/')
        
        if (!isValidImageUrl) {
          alert('Por favor, selecione uma foto válida')
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

  if (loading) {
    return (
      <EmpresaLayout title="Perfil da Empresa">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Informações da Empresa</h2>
            <p className="text-gray-600">Atualize as informações do seu perfil abaixo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto da Empresa */}
            <FileUpload
              accept=".jpg,.jpeg,.png,.gif,.webp"
              label="Foto da Empresa"
              currentUrl={formData.foto}
              onUpload={(url) => setFormData({ ...formData, foto: url })}
              type="image"
              maxSize={5}
            />

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Este email será usado para login
              </p>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Restaurante, Loja de Roupas, Serviços"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Descreva sua empresa, produtos e serviços..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-bandfm-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Informações Importantes
              </h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Suas informações aparecerão na página "Clube Ouvintes"</p>
                <p>• Seus produtos serão listados na página principal</p>
                <p>• Mantenha suas informações sempre atualizadas</p>
                <p>• A alteração do email pode afetar seu login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmpresaLayout>
  )
}

