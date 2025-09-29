'use client'

import { useState } from 'react'
import Link from 'next/link'
import LoginDropdown from '@/components/LoginDropdown'

interface TeamMember {
  id: number
  nome: string
  cargo: string
  programa: string
  horario: string
  dias: string
  descricao?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    nome: "Luciane Bayon",
    cargo: "Locutora",
    programa: "Manhã Show",
    horario: "09:00 às 11:00 (Seg-Sex) | 09:00 às 12:00 (Sáb)",
    dias: "Segunda a Sábado",
    descricao: "Começe o seu dia com energia e alegria no Manhã Show!"
  },
  {
    id: 2,
    nome: "Neury Antunes",
    cargo: "Locutora",
    programa: "Tamo Junto",
    horario: "15:00 às 17:00",
    dias: "Segunda a Sexta",
    descricao: "A tarde fica mais animada com o Tamo Junto!"
  },
  {
    id: 3,
    nome: "Marquinhos Repeto",
    cargo: "Locutor",
    programa: "Curte Aí",
    horario: "13:00 às 15:00",
    dias: "Segunda a Sábado",
    descricao: "O melhor da música e entretenimento no Curte Aí!"
  },
  {
    id: 4,
    nome: "Ziko Pereira",
    cargo: "Locutor",
    programa: "Fim de Tarde",
    horario: "17:00 às 18:30",
    dias: "Todos os Sábados",
    descricao: "Encerre o sábado com estilo no Fim de Tarde!"
  }
]

export default function EquipePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-black">Band FM</Link>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Início
                </Link>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Notícias
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Programação
                </Link>
                <Link href="/equipe" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
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
                <LoginDropdown />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden bg-white border-t border-gray-200">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black hover:text-bandfm-orange-500 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Início
                </Link>
                <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Notícias
                </Link>
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Programação
                </Link>
                <Link href="/equipe" className="text-black bg-gray-100 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Sobre
                </Link>
                <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Clube Ouvintes
                </Link>
                <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                  Promoções
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link href="/login" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                    Entrar como Admin
                  </Link>
                  <Link href="/login-empresa" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black">
                    Entrar como Empresa
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-green-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              EQUIPE
            </h1>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Locutores da Band FM
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa equipe de locutores trabalha 24 horas para levar até você a melhor programação, 
              com muito profissionalismo, alegria e dedicação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                  {/* Header with gradient based on index */}
                  <div className={`h-32 relative ${
                    index === 0 ? 'bg-gradient-to-br from-pink-400 to-red-500' :
                    index === 1 ? 'bg-gradient-to-br from-purple-400 to-indigo-500' :
                    index === 2 ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                    'bg-gradient-to-br from-green-400 to-teal-500'
                  }`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
                          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <span className="text-black text-sm font-helvetica-black bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {member.cargo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative -mt-16 flex justify-center">
                    <div className="w-24 h-24 bg-white rounded-full shadow-lg border-4 border-white overflow-hidden">
                      <img 
                        src="https://i.imgur.com/ZYqQhXm.png" 
                        alt={member.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 pt-4">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {member.nome}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {member.descricao}
                      </p>
                    </div>

                    {/* Program Info */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0 ? 'bg-pink-500' :
                            index === 1 ? 'bg-purple-500' :
                            index === 2 ? 'bg-blue-500' :
                            'bg-green-500'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {member.programa}
                          </h4>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-helvetica-black">{member.horario}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-helvetica-black">{member.dias}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-black">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Band FM em Números
            </h2>
            <p className="text-xl text-blue-100">
              Nossa equipe trabalhando para você 24 horas por dia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <div className="text-4xl font-bold text-yellow-400 mb-2">4</div>
                <div className="text-blue-100">Locutores</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <div className="text-4xl font-bold text-green-400 mb-2">24h</div>
                <div className="text-blue-100">No Ar</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <div className="text-4xl font-bold text-pink-400 mb-2">6</div>
                <div className="text-blue-100">Programas</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <div className="text-4xl font-bold text-purple-400 mb-2">40+</div>
                <div className="text-blue-100">Anos de História</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ouça Agora a Band FM
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sintonize na frequência da alegria e faça parte da nossa família de ouvintes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programacao"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-helvetica-black rounded-md text-black bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Ver Programação Completa
            </Link>
            <Link 
              href="/sobre"
              className="inline-flex items-center px-8 py-3 border border-orange-500 text-base font-helvetica-black rounded-md text-orange-500 bg-white hover:bg-orange-50 transition-colors"
            >
              Conheça Nossa História
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
              <p className="text-black mt-2 text-sm">
                Desde 1983 fazendo história no rádio brasileiro
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Nossa Equipe</h3>
              <ul className="space-y-2 text-black text-sm">
                {teamMembers.map((member) => (
                  <li key={member.id}>
                    <span className="font-helvetica-black">{member.nome}</span> - {member.programa}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="text-black space-y-1">
                <p>📞 +55 3242 4092</p>
                <p>📱 +11 3743 1313</p>
                <p className="mt-2">Sant'Ana do Livramento</p>
              </div>
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
