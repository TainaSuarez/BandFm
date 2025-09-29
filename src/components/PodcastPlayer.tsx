'use client'

import { useState, useRef, useEffect } from 'react'

interface PodcastPlayerProps {
  audioUrl: string
  title: string
  duration?: string
}

export default function PodcastPlayer({ audioUrl, title, duration }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration)
    }
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Erro ao carregar o áudio. Verifique se o arquivo existe.')
    }
    const handlePlay = () => {
      setIsPlaying(true)
      setError(null)
    }
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      setIsLoading(true)
      try {
        await audio.play()
        setError(null)
      } catch (err: any) {
        setIsLoading(false)
        setIsPlaying(false)
        setError('Erro ao reproduzir o áudio')
        console.error('Error playing audio:', err)
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const seekTime = parseFloat(e.target.value)
    audio.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <audio ref={audioRef} preload="metadata">
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/mp3" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Title */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 truncate">{title}</h4>
        {duration && (
          <p className="text-sm text-gray-500">Duração: {duration}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          ) : isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Time Display */}
        <div className="text-sm text-gray-600 font-mono flex-shrink-0">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max={totalDuration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
            disabled={!totalDuration}
          />
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-xs text-gray-500 w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 0 2px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0,0,0,0.3);
          border: none;
        }
      `}</style>
    </div>
  )
}
