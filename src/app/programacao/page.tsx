'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgramacaoRadio } from '@/types'
import SiteNavbar from '@/components/SiteNavbar'

export default function ProgramacaoPage() {
  const [programacao, setProgramacao] = useState<ProgramacaoRadio[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<string>('')

  const diasSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
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

  const filteredProgramacao = selectedDay 
    ? programacao.filter(programa => 
        programa.diasSemana.toLowerCase().includes(selectedDay.toLowerCase()) ||
        programa.diasSemana.includes('Todos os dias') ||
        (selectedDay.includes('Segunda') && programa.diasSemana.includes('Segunda a Sexta')) ||
        (selectedDay.includes('Terça') && programa.diasSemana.includes('Segunda a Sexta')) ||
        (selectedDay.includes('Quarta') && programa.diasSemana.includes('Segunda a Sexta')) ||
        (selectedDay.includes('Quinta') && programa.diasSemana.includes('Segunda a Sexta')) ||
        (selectedDay.includes('Sexta') && programa.diasSemana.includes('Segunda a Sexta')) ||
        (selectedDay.includes('Sábado') && programa.diasSemana.includes('Fins de Semana')) ||
        (selectedDay.includes('Domingo') && programa.diasSemana.includes('Fins de Semana'))
      )
    : programacao

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <SiteNavbar />

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              PROGRAMAÇÃO
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-helvetica-black">Filtrar por dia:</span>
            <button
              onClick={() => setSelectedDay('')}
              className={`px-4 py-2 rounded-md text-sm font-helvetica-black transition-colors ${
                selectedDay === '' 
                  ? 'bg-bandfm-orange-500 text-white hover:bg-bandfm-orange-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos os dias
            </button>
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => setSelectedDay(dia)}
                className={`px-4 py-2 rounded-md text-sm font-helvetica-black transition-colors ${
                  selectedDay === dia 
                    ? 'bg-bandfm-orange-500 text-white hover:bg-bandfm-orange-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programming Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bandfm-orange-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-helvetica-black text-gray-500 uppercase tracking-widerr">
                        Horário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-helvetica-black text-gray-500 uppercase tracking-widerr">
                        Programa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-helvetica-black text-gray-500 uppercase tracking-widerr">
                        Apresentador
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-helvetica-black text-gray-500 uppercase tracking-widerr">
                        Dias
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProgramacao.length > 0 ? (
                      filteredProgramacao.map((programa) => (
                        <tr key={programa.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-helvetica-black text-gray-900">
                            {programa.horarios}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-bandfm-orange-700 font-semibold">
                            {programa.nomePrograma}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {programa.nomeApresentador}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-helvetica-black bg-orange-100 text-bandfm-orange-700">
                              {programa.diasSemana}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            <p className="text-lg font-helvetica-black text-gray-900 mb-1">
                              {selectedDay ? `Nenhum programa para ${selectedDay}` : 'Programação em breve'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedDay ? 'Tente selecionar outro dia da semana' : 'Estamos preparando nossa programação especial para você!'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não perca seus programas favoritos!
          </h2>
          <p className="text-xl mb-8">
            Acompanhe a Band FM e fique por dentro de toda nossa programação especial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/promocoes"
              className="inline-flex items-center px-6 py-3 border border-bandfm-orange-600 text-base font-helvetica-black rounded-md text-white bg-bandfm-orange-500 hover:bg-bandfm-orange-600 transition-colors"
            >
              Ver Promoções
            </Link>
            <Link 
              href="/clube-ouvintes"
              className="inline-flex items-center px-6 py-3 border border-green-700 text-base font-helvetica-black rounded-md text-green-700 hover:bg-green-50 transition-colors"
            >
              Clube Ouvintes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Band FM</h3>
              <p className="text-black text-sm">
                A sua rádio do seu jeito. Conectando você com o melhor da música e informação.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Contato</h3>
              <p className="text-black text-sm">Email: bandfm@bandfmfronteira.com.br</p>
              <p className="text-black text-sm">Telefone: +55 3242 4092</p>
              <p className="text-black text-sm">WhatsApp: +11 3743 1313</p>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 text-center">
            <p className="text-sm text-black">&copy; {new Date().getFullYear()} Band FM 96.1 Livramento. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}



