'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgramacaoRadio } from '@/types'

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
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                Band FM
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Início
                </Link>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Notícias
                </Link>
                <Link href="/programacao" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Programação
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Clube Ouvintes
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Promoções
                </Link>
                
                {/* Dropdown Menu with Gear Icon */}
                <div className="relative group">
                  <button className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black flex items-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Entrar como Admin
                    </Link>
                    <Link href="/login-empresa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Entrar como Empresa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              PROGRAMAÇÃO
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-helvetica-black">Filtrar por dia:</span>
            <button
              onClick={() => setSelectedDay('')}
              className={`px-4 py-2 rounded-md text-sm font-helvetica-black transition-colors ${
                selectedDay === '' 
                  ? 'bg-purple-600 text-black' 
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
                    ? 'bg-purple-600 text-black' 
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
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-purple-50">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-semibold">
                            {programa.nomePrograma}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {programa.nomeApresentador}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-helvetica-black bg-purple-100 text-purple-800">
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
      <section className="bg-purple-900 text-black py-16">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não perca seus programas favoritos!
          </h2>
          <p className="text-xl mb-8">
            Acompanhe a Band FM e fique por dentro de toda nossa programação especial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/promocoes"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-helvetica-black rounded-md text-purple-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Ver Promoções
            </Link>
            <Link 
              href="/clube-ouvintes"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-helvetica-black rounded-md text-black hover:bg-purple-800 transition-colors"
            >
              Clube Ouvintes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-12">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Band FM</h3>
              <p className="text-black">
                A sua rádio online com a melhor programação
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-black">
                <li><Link href="/" className="hover:text-bandfm-orange-500">Início</Link></li>
                <li><Link href="/noticias" className="hover:text-bandfm-orange-500">Notícias</Link></li>
                <li><Link href="/promocoes" className="hover:text-bandfm-orange-500">Promoções</Link></li>
                <li><Link href="/clube-ouvintes" className="hover:text-bandfm-orange-500">Clube Ouvintes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-black">
                Email: contato@bandfm.com<br />
                Telefone: (11) 1234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-black">
            <p>&copy; 2024 Band FM. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}



