'use client'

import { useState } from 'react'
import Link from 'next/link'
import LoginDropdown from '@/components/LoginDropdown'
import BandFMLogo from '@/components/BandFMLogo'

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Link href="/">
                <BandFMLogo size="sm" showFrequency={false} className="" />
              </Link>
            </div>
            
            {/* Reproductor de Radio Ficticio */}
            <div className="hidden lg:flex items-center bg-bandfm-green-500 rounded-full px-4 py-2 gap-3 shadow-md">
              {/* Botón Play/Pause */}
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              
              {/* Texto "AO VIVO" */}
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Ao Vivo</span>
                <span className="text-white text-xs opacity-90">96.1 FM</span>
              </div>
              
              {/* Indicador de ondas sonoras */}
              <div className="flex items-center gap-1">
                <div className="w-1 bg-white h-3 rounded-full opacity-60"></div>
                <div className="w-1 bg-white h-5 rounded-full opacity-80"></div>
                <div className="w-1 bg-white h-4 rounded-full opacity-70"></div>
                <div className="w-1 bg-white h-6 rounded-full"></div>
                <div className="w-1 bg-white h-3 rounded-full opacity-60"></div>
              </div>
              
              {/* Control de volumen */}
              <button className="text-white hover:text-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              <a href="#inicio" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                HOME
              </a>
              <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                NOTÍCIAS
              </Link>
              <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PROGRAMAÇÃO
              </Link>
              <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PODCASTS
              </Link>
              <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                EQUIPE
              </Link>
              <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                A RÁDIO
              </Link>
              <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                CLUBE OUVINTES
              </Link>
              <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PROMOÇÕES
              </Link>
              <LoginDropdown />
            </div>
          </div>

          {/* Mobile menu button and player */}
          <div className="md:hidden flex items-center gap-2">
            {/* Reproductor mobile */}
            <div className="lg:hidden flex items-center bg-bandfm-green-500 rounded-full px-3 py-2 gap-2 shadow-md">
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <span className="text-white text-xs font-bold">AO VIVO</span>
            </div>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black hover:text-bandfm-orange-500 px-3 py-2 rounded-md text-sm font-helvetica-black"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#inicio" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                HOME
              </a>
              <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                NOTÍCIAS
              </Link>
              <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PROGRAMAÇÃO
              </Link>
              <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PODCASTS
              </Link>
              <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                EQUIPE
              </Link>
              <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                A RÁDIO
              </Link>
              <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                CLUBE OUVINTES
              </Link>
              <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black font-bold uppercase tracking-widerr">
                PROMOÇÕES
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
  )
}