'use client'

import Link from 'next/link'
import LoginDropdown from '@/components/LoginDropdown'

export default function SobrePage() {
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
                <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Programação
                </Link>
                <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black">
                  Equipe
                </Link>
                <Link href="/sobre" className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-helvetica-black">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-bandfm-orange-500 text-black py-4 px-8 rounded-full text-center max-w-xs mx-auto shadow-lg">
            <h1 className="text-xl font-bold uppercase tracking-wider font-sans">
              A RÁDIO
            </h1>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-100 rounded-full w-16 h-20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-bandfm-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  <span className="font-semibold text-bandfm-green-500">A primeira emissora em FM da fronteira</span>, inaugurada em 
                  <span className="font-semibold"> 30 de julho de 1983</span>, no dia do aniversário de Sant'Ana do Livramento.
                </p>
                <p>
                  Hoje opera, via satélite, com a <span className="font-semibold text-bandfm-green-500">REDE BAND FM</span>, 
                  marca presente em cerca de <span className="font-semibold">40 mercados brasileiros</span>, 
                  sendo a rede que mais cresce no Brasil.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-black">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">1983</div>
                  <div className="text-xl">Ano de fundação</div>
                  <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                    <div className="text-3xl font-bold mb-1">40+</div>
                    <div className="text-sm opacity-90">Mercados brasileiros</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-2xl p-6 text-gray-900 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm">No ar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Nosso Compromisso
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-bandfm-green-500 mb-6">
                "A SUA RÁDIO DO SEU JEITO"
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                O moderno Slogan <span className="font-semibold">BAND FM, A SUA RÁDIO DO SEU JEITO</span>, 
                traduz um estilo de programação leve e descontraído, onde artistas e ouvintes se sentem à vontade. 
                E, para a equipe BAND este slogan não é apenas palavras: locutores, programadores, produtores e técnicos 
                trabalham para levar a seus ouvintes muita alegria, emoção e a cumplicidade de quem se encontra todos os dias 
                por meio de um aparelho de rádio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            O que fazemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programação Local */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Programação Local</h3>
              <p className="text-gray-600">
                Nossa programação local está sempre atenta aos assuntos políticos e sócio-econômicos desta comunidade, 
                proporcionando espaços aos fatos relevantes.
              </p>
            </div>

            {/* Unidade Móvel */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unidade Móvel</h3>
              <p className="text-gray-600">
                A UNIDADE MÓVEL da Band FM atende aos clientes e apoia as causas sociais, 
                fazendo-se presente sempre que solicitada.
              </p>
            </div>

            {/* Tecnologia */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tecnologia de Ponta</h3>
              <p className="text-gray-600">
                Uma programação com tanta qualidade merece a melhor infra-estrutura técnica e é por isso que a 
                Band FM investe no suporte tecnológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-black">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Estamos Sempre no Ar
            </h2>
            <p className="text-xl text-blue-100">
              Na Band FM, sempre tem alguém, ao vivo, conversando com você.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Rede Band FM */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-yellow-400 rounded-full w-16 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M13.828 7.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 4.828 1 1 0 11-1.414-1.414A3.987 3.987 0 0015 12a3.987 3.987 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Rede Band FM</h3>
              <p className="text-blue-100">
                24 horas no ar<br />
                Via satélite em todo o Brasil
              </p>
            </div>

            {/* Contato */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-green-400 rounded-full w-16 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fale Conosco</h3>
              <div className="text-blue-100 space-y-1">
                <p>📞 +55 3242 4092</p>
                <p>📱 +11 3743 1313</p>
                <p className="text-sm mt-2">WhatsApp disponível</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se aos milhares de ouvintes que fazem da Band FM a sua rádio do seu jeito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programacao"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-helvetica-black rounded-md text-black bg-blue-600 hover:bg-gray-600 transition-colors"
            >
              Ver Programação
            </Link>
            <Link 
              href="/clube-ouvintes"
              className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-helvetica-black rounded-md text-bandfm-green-500 bg-white hover:bg-blue-50 transition-colors"
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



