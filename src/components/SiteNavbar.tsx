'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginDropdown from '@/components/LoginDropdown'
import BandFMLogo from '@/components/BandFMLogo'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function SiteNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // No mostrar WhatsApp button en páginas de empresa individual
  const showWhatsAppButton = !pathname?.startsWith('/empresa/')
  
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    // Configurar volumen inicial
    audio.volume = 0.7
    
    const handlePlaying = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }
    
    const handlePause = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }
    
    const handleError = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }
    
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    
    return () => {
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [])
  
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!audioRef.current || isLoading) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      // Recargar el audio antes de reproducir para asegurar conexión fresca
      audioRef.current.load()
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error al reproducir:', error)
          alert('No se pudo conectar con el streaming. Por favor, intente nuevamente.')
          setIsPlaying(false)
          setIsLoading(false)
        })
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                <BandFMLogo size="sm" showFrequency={false} className="" />
              </Link>
            </div>
            
            {/* Reproductor de Radio Ficticio */}
            <div className="hidden lg:flex items-center bg-bandfm-green-500 rounded-full px-4 py-2 gap-3 shadow-md">
              {/* Botón Play/Pause */}
              <button 
                onClick={togglePlay}
                disabled={isLoading}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 text-bandfm-green-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-5 h-5 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              {/* Texto "AO VIVO" */}
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold uppercase tracking-wide">Ao Vivo</span>
                <span className="text-white text-xs opacity-90">96.1 FM</span>
              </div>
              
              {/* Indicador de ondas sonoras */}
              <div className="flex items-center gap-1">
                <div className={`w-1 bg-white h-3 rounded-full opacity-60 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                <div className={`w-1 bg-white h-5 rounded-full opacity-80 ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.1s'}}></div>
                <div className={`w-1 bg-white h-4 rounded-full opacity-70 ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.2s'}}></div>
                <div className={`w-1 bg-white h-6 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.3s'}}></div>
                <div className={`w-1 bg-white h-3 rounded-full opacity-60 ${isPlaying ? 'animate-pulse' : ''}`} style={{animationDelay: '0.4s'}}></div>
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
              <button 
                onClick={togglePlay}
                disabled={isLoading}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="w-4 h-4 text-bandfm-green-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-4 h-4 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-bandfm-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
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
      
      {/* Elemento de audio oculto */}
      <audio 
        ref={audioRef}
        preload="metadata"
        className="hidden"
      >
        <source src="https://stm28.xcast.com.br:11364/stream" type="audio/mpeg" />
        <source src="https://stm28.xcast.com.br:11364/stream" type="audio/aac" />
      </audio>

      {/* WhatsApp Button - No mostrar en páginas de empresa */}
      {showWhatsAppButton && <WhatsAppButton />}
    </nav>
  )
}