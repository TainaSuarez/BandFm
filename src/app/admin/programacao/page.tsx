'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { ProgramacaoRadio } from '@/types'

export default function ProgramacaoPage() {
  const [programacao, setProgramacao] = useState<ProgramacaoRadio[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProgramacao, setEditingProgramacao] = useState<ProgramacaoRadio | null>(null)
  const [formData, setFormData] = useState({
    diasSemana: '',
    horarios: '',
    nomePrograma: '',
    nomeApresentador: ''
  })

  const diasSemanaOptions = [
    'Segunda-feira',
    'Terça-feira', 
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
    'Segunda a Sexta',
    'Fins de Semana',
    'Todos os dias'
  ]

  useEffect(() => {
    fetchProgramacao()
  }, [])

  const fetchProgramacao = async () => {
    try {
      const response = await fetch('/api/programacao')
      const data = await response.json()
      setProgramacao(data)
    } catch (error) {
      console.error('Error fetching programacao:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProgramacao ? `/api/programacao/${editingProgramacao.id}` : '/api/programacao'
      const method = editingProgramacao ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProgramacao()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao salvar programação')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const handleEdit = (programa: ProgramacaoRadio) => {
    setEditingProgramacao(programa)
    setFormData({
      diasSemana: programa.diasSemana,
      horarios: programa.horarios,
      nomePrograma: programa.nomePrograma,
      nomeApresentador: programa.nomeApresentador
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta programação?')) return

    try {
      const response = await fetch(`/api/programacao/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchProgramacao()
      } else {
        alert('Erro ao excluir programação')
      }
    } catch (error) {
      alert('Erro de conexão')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProgramacao(null)
    setFormData({
      diasSemana: '',
      horarios: '',
      nomePrograma: '',
      nomeApresentador: ''
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Programação">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestão de Programação">
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Nova Programação
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProgramacao ? 'Editar Programação' : 'Nova Programação'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dias da Semana</label>
                  <select
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.diasSemana}
                    onChange={(e) => setFormData({ ...formData, diasSemana: e.target.value })}
                  >
                    <option value="">Selecione os dias</option>
                    {diasSemanaOptions.map((dia) => (
                      <option key={dia} value={dia}>{dia}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Horários</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 08:00 - 12:00"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.horarios}
                    onChange={(e) => setFormData({ ...formData, horarios: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome do Programa</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.nomePrograma}
                    onChange={(e) => setFormData({ ...formData, nomePrograma: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome do Apresentador</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.nomeApresentador}
                    onChange={(e) => setFormData({ ...formData, nomeApresentador: e.target.value })}
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
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    {editingProgramacao ? 'Atualizar' : 'Adicionar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Programacao List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Programa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apresentador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dias
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programacao.length > 0 ? (
                programacao.map((programa) => (
                  <tr key={programa.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {programa.horarios}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {programa.nomePrograma}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {programa.nomeApresentador}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {programa.diasSemana}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(programa)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(programa.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma programação cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}



