'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Admin } from '@/types'
import { useToast } from '@/hooks/useToast'

export default function AdministradoresPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)
  const { success, error, warning, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    ativo: true
  })

  useEffect(() => {
    // Obtener admin actual del localStorage
    const adminData = localStorage.getItem('admin')
    if (adminData) {
      const admin = JSON.parse(adminData)
      setCurrentAdmin(admin)
      
      // Si no es master, redirigir
      if (!admin.isMaster) {
        error('Apenas administradores master podem acessar esta página')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
        return
      }
    }

    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admins')
      const data = await response.json()
      setAdmins(data)
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentAdmin) {
      error('Você precisa estar logado')
      return
    }

    try {
      if (editingAdmin) {
        // Editar admin existente
        const response = await fetch(`/api/admins/${editingAdmin.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            requesterId: currentAdmin.id,
            password: formData.password || undefined // Solo enviar si hay nueva contraseña
          }),
        })

        const result = await response.json()

        if (response.ok) {
          await fetchAdmins()
          resetForm()
          success('Administrador atualizado com sucesso')
        } else {
          error(result.message || 'Erro ao atualizar administrador')
        }
      } else {
        // Crear nuevo admin
        if (!formData.password) {
          warning('Senha é obrigatória para novo administrador')
          return
        }

        const response = await fetch('/api/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (response.ok) {
          await fetchAdmins()
          resetForm()
          success('Administrador criado com sucesso')
        } else {
          error(result.message || 'Erro ao criar administrador')
        }
      }
    } catch (err) {
      error('Erro de conexão')
    }
  }

  const handleEdit = (admin: Admin) => {
    if (admin.isMaster && admin.id !== currentAdmin?.id) {
      warning('Você não pode editar outro administrador master')
      return
    }

    setEditingAdmin(admin)
    setFormData({
      nome: admin.nome,
      email: admin.email,
      password: '', // Deixar vazio, opcional para edição
      ativo: admin.ativo
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const adminToDelete = admins.find(a => a.id === id)
    
    if (adminToDelete?.isMaster) {
      warning('Não é possível excluir um administrador master')
      return
    }

    if (!confirm('Tem certeza que deseja excluir este administrador?')) return

    if (!currentAdmin) {
      error('Você precisa estar logado')
      return
    }

    try {
      const response = await fetch(`/api/admins/${id}?requesterId=${currentAdmin.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (response.ok) {
        await fetchAdmins()
        success('Administrador excluído com sucesso')
      } else {
        error(result.message || 'Erro ao excluir administrador')
      }
    } catch (err) {
      error('Erro de conexão')
    }
  }

  const resetForm = () => {
    setEditingAdmin(null)
    setFormData({
      nome: '',
      email: '',
      password: '',
      ativo: true
    })
    setShowForm(false)
  }

  // Se no es master, no mostrar nada
  if (currentAdmin && !currentAdmin.isMaster) {
    return null
  }

  return (
    <AdminLayout title="Gerenciar Administradores">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Importante:</strong> Apenas administradores master podem criar, editar ou excluir outros administradores. Nenhum administrador pode remover ou editar outro master.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-3 bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white rounded-lg shadow-md transition-colors font-bold"
      >
        {showForm ? 'Ocultar Formulário' : '+ Novo Administrador'}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editingAdmin ? 'Editar Administrador' : 'Novo Administrador'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Senha {editingAdmin ? '(deixe vazio para não alterar)' : '*'}
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bandfm-orange-500 focus:border-transparent"
                required={!editingAdmin}
              />
            </div>

            <div className="flex items-center">
              <input
                id="ativo"
                type="checkbox"
                checked={formData.ativo}
                onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                className="h-4 w-4 text-bandfm-orange-600 focus:ring-bandfm-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900 font-bold">
                Ativo
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-bandfm-orange-500 hover:bg-bandfm-orange-600 text-white rounded-lg shadow-md transition-colors font-bold"
              >
                {editingAdmin ? 'Salvar Alterações' : 'Criar Administrador'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md transition-colors font-bold"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Administradores Cadastrados</h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bandfm-orange-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className={admin.isMaster ? 'bg-orange-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-bold text-gray-900">{admin.nome}</div>
                      {admin.id === currentAdmin?.id && (
                        <span className="ml-2 px-2 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded">
                          Você
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admin.isMaster ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-orange-100 text-orange-800">
                        🔒 Master
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-gray-100 text-gray-800">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                      admin.ativo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      disabled={admin.isMaster && admin.id !== currentAdmin?.id}
                      className={`text-bandfm-orange-600 hover:text-bandfm-orange-900 font-bold ${
                        admin.isMaster && admin.id !== currentAdmin?.id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      disabled={admin.isMaster}
                      className={`text-red-600 hover:text-red-900 font-bold ${
                        admin.isMaster ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
    </AdminLayout>
  )
}

