'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteNavbar from '@/components/SiteNavbar'

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
      <SiteNavbar />

      {/* Team Members Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Locutores da Band FM
            </h2>
            
            {/* Mensaje destacado */}
            <div className="relative bg-bandfm-green-500 rounded-2xl p-8 mb-8 max-w-4xl mx-auto shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl"></div>
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                  Nossa equipe de locutores trabalha <span className="bg-bandfm-orange-500 px-3 py-1 rounded-lg text-white font-black">24 horas</span> para levar até você a melhor programação, com muito <span className="text-white font-black">profissionalismo</span>, <span className="text-white font-black">alegria</span> e <span className="text-white font-black">dedicação</span>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Container EQUIPE */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
            <div className="bg-bandfm-green-500 text-white text-left py-3 px-6 rounded-full">
              <h1 className="text-lg font-helvetica-black uppercase tracking-wider text-white">
                EQUIPE
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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


      {/* Call to Action */}
      <section className="py-16 bg-bandfm-orange-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ouça Agora a Band FM
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
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
