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
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Locutores da Band FM
            </h2>
            
            {/* Mensaje destacado */}
            <div className="relative bg-bandfm-green-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 max-w-4xl mx-auto shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl sm:rounded-2xl"></div>
              <div className="relative z-10">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-relaxed">
                  Nossa equipe de locutores trabalha <span className="bg-bandfm-orange-500 px-2 sm:px-3 py-1 rounded-lg text-white font-black">24 horas</span> para levar até você a melhor programação, com muito <span className="text-white font-black">profissionalismo</span>, <span className="text-white font-black">alegria</span> e <span className="text-white font-black">dedicação</span>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Container EQUIPE */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="bg-bandfm-green-500 text-white text-left py-2 sm:py-3 px-4 sm:px-6 rounded-full">
              <h1 className="text-base sm:text-lg font-helvetica-black uppercase tracking-wider text-white">
                EQUIPE
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="group">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-100">
                  {/* Header alternando naranja y verde */}
                  <div className={`h-24 sm:h-28 lg:h-32 relative ${
                    index % 2 === 0 ? 'bg-orange-600' : 'bg-green-600'
                  }`}>
                    <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                      <div className="flex items-center justify-center sm:justify-start">
                        <span className="text-white text-xs sm:text-sm font-helvetica-black bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {member.cargo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Image - Logo de Band FM */}
                  <div className="relative -mt-12 sm:-mt-14 lg:-mt-16 flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-full shadow-xl border-4 border-white overflow-hidden p-2">
                      <img 
                        src="/logo-bandfm.png" 
                        alt={member.nome}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4">
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {member.nome}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                        {member.descricao}
                      </p>
                    </div>

                    {/* Program Info */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 ${
                            index % 2 === 0 ? 'bg-orange-600' : 'bg-green-600'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                            {member.programa}
                          </h4>
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-start text-xs sm:text-sm text-gray-600">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-helvetica-black">{member.horario}</span>
                          </div>
                          
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-10 sm:py-12 lg:py-16 bg-bandfm-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ouça Agora a Band FM
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Sintonize na frequência da alegria e faça parte da nossa família de ouvintes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              href="/programacao"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-helvetica-black rounded-md text-black bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Ver Programação Completa
            </Link>
            <Link 
              href="/sobre"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border border-orange-500 text-sm sm:text-base font-helvetica-black rounded-md text-orange-500 bg-white hover:bg-orange-50 transition-colors"
            >
              Conheça Nossa História
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-black">Band FM</h3>
              <p className="text-black text-xs sm:text-sm">
                A sua rádio do seu jeito. Conectando você com o melhor da música e informação.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-black">Contato</h3>
              <p className="text-black text-xs sm:text-sm">Email: bandfm@bandfmfronteira.com.br</p>
              <p className="text-black text-xs sm:text-sm">Telefone: +55 3242 4092</p>
              <p className="text-black text-xs sm:text-sm">WhatsApp: +11 3743 1313</p>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 text-center">
            <p className="text-xs sm:text-sm text-black">&copy; {new Date().getFullYear()} Band FM 96.1 Livramento. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
