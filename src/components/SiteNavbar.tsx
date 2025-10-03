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
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <BandFMLogo size="sm" showFrequency={false} className="" />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              <a href="#inicio" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                HOME
              </a>
              <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                NOTÍCIAS
              </Link>
              <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                PROGRAMAÇÃO
              </Link>
              <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                PODCASTS
              </Link>
              <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                EQUIPE
              </Link>
              <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                A RÁDIO
              </Link>
              <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                CLUBE OUVINTES
              </Link>
              <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 px-3 py-2 text-sm font-helvetica-black uppercase tracking-widerr">
                PROMOÇÕES
              </Link>
              <LoginDropdown />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden bg-white border-t border-gray-200">
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
              <a href="#inicio" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                HOME
              </a>
              <Link href="/noticias" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                NOTÍCIAS
              </Link>
              <Link href="/programacao" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                PROGRAMAÇÃO
              </Link>
              <Link href="/podcasts" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                PODCASTS
              </Link>
              <Link href="/equipe" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                EQUIPE
              </Link>
              <Link href="/sobre" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                A RÁDIO
              </Link>
              <Link href="/clube-ouvintes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
                CLUBE OUVINTES
              </Link>
              <Link href="/promocoes" className="text-black hover:text-bandfm-orange-500 block px-3 py-2 rounded-md text-base font-helvetica-black uppercase tracking-widerr">
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