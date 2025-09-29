'use client'

import { useState, useRef, useEffect } from 'react'

interface RadioPlayerProps {
  streamUrl?: string
  stationName?: string
}

// URLs basadas en radios.com.br y patrones de Band FM 96.1 Livramento
const STREAM_URLS = [
  "https://stm1.srvstm.com:7006/live", // Servidor STM para RS
  "https://servidor29.brlogic.com:7006/live", // BRLogic hosting
  "https://cast1.hoost.com.br:8443/live", // Hoost Brasil  
  "https://s2.stm.com.br:7006/stream", // STM Brasil stream
  "https://cast.hoost.com.br:8443/live", // Hoost principal
  "https://servidor31.brlogic.com:8006/live", // BRLogic alt
  "https://stm3.srvstm.com:8006/stream", // STM alternativo
  "https://radio.streemlion.com:2020/stream", // StreamLion
  "https://centova.svdns.com.br:20012/stream", // Centova
  "https://stream.zeno.fm/bandfm961", // Zeno FM
]

export default function RadioPlayer({ 
  streamUrl,
  stationName = "Band FM 96.1 Livramento"
}: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState<string | null>(null)
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentStreamUrl = streamUrl || STREAM_URLS[currentStreamIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError(`Erro ao conectar. Stream ${currentStreamIndex + 1}/${STREAM_URLS.length} falhou.`)
    }
    const handlePlay = () => {
      setIsPlaying(true)
      setError(null)
    }
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        setIsLoading(true)
        setError(null)
        await audio.play()
      }
    } catch (err) {
      setIsLoading(false)
      setError('Erro ao reproduzir a rádio')
      console.error('Error playing audio:', err)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const tryNextStream = () => {
    if (!streamUrl) { // Solo cambiar stream si no hay URL fija
      const nextIndex = (currentStreamIndex + 1) % STREAM_URLS.length
      setCurrentStreamIndex(nextIndex)
      setError(null)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.load()
      }
    }
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white max-w-md mx-auto">
      <audio ref={audioRef} preload="none">
        <source src={currentStreamUrl} type="audio/mpeg" />
        <source src={currentStreamUrl} type="audio/aac" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Station Info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className={`w-3 h-3 rounded-full mr-2 ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium">
            {isPlaying ? 'AO VIVO' : 'OFFLINE'}
          </span>
        </div>
        <h3 className="text-lg font-bold">{stationName}</h3>
        <p className="text-sm opacity-90">96.1 FM • A sua rádio do seu jeito</p>
        {!streamUrl && (
          <p className="text-xs opacity-75 mt-1">Stream {currentStreamIndex + 1}/{STREAM_URLS.length}</p>
        )}
      </div>

      {/* Play/Pause Button */}
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 rounded-full p-4 transition-all duration-200 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer slider"
        />
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M13.828 7.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 4.828 1 1 0 11-1.414-1.414A3.987 3.987 0 0015 12a3.987 3.987 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg text-center">
          <p className="text-sm">{error}</p>
          <div className="flex gap-2 justify-center mt-2">
            <button 
              onClick={() => setError(null)} 
              className="text-xs underline hover:no-underline"
            >
              Tentar novamente
            </button>
            {!streamUrl && (
              <button 
                onClick={tryNextStream} 
                className="text-xs underline hover:no-underline"
              >
                Próximo stream
              </button>
            )}
          </div>
        </div>
      )}

      {/* Now Playing Info */}
      <div className="mt-4 text-center">
        <p className="text-xs opacity-75">
          {isPlaying ? '♪ Tocando agora...' : 'Clique para ouvir ao vivo'}
        </p>
        {!isPlaying && !isLoading && (
          <div className="text-xs opacity-60 mt-2 space-y-1">
            <p>📻 Testando streams de radios.com.br</p>
            <p className="text-xs opacity-50">
              ✅ Funciona em localhost
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
