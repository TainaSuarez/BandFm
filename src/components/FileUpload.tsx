'use client'

import { useState } from 'react'

interface FileUploadProps {
  accept: string
  label: string
  currentUrl?: string
  onUpload: (url: string) => void
  type?: 'image' | 'audio'
  maxSize?: number // em MB
}

export default function FileUpload({ 
  accept, 
  label, 
  currentUrl, 
  onUpload, 
  type = 'image',
  maxSize = 50 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    if (!file) return

    // Verificar tamanho
    const maxBytes = maxSize * 1024 * 1024
    if (file.size > maxBytes) {
      setError(`Arquivo muito grande. Máximo ${maxSize}MB`)
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onUpload(result.url)
        setError(null)
      } else {
        setError(result.message || 'Erro ao enviar arquivo')
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      setError('Erro de conexão ao enviar arquivo')
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="text-center">
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Enviando arquivo...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {type === 'image' ? (
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6a2 2 0 012-2h8.172a2 2 0 011.414.586L22 6h8a2 2 0 012 2v13M9 19v6a2 2 0 002 2h8m-10-8h10m0 0V9a2 2 0 012-2h2m-4 12v6m0 0v2a2 2 0 002 2h2m-4-4h4" />
                </svg>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                  Clique para selecionar
                </span>
                {' '}ou arraste o arquivo aqui
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Máximo {maxSize}MB • {accept.replace(/\./g, '').toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Current File Preview */}
      {currentUrl && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Arquivo atual:</p>
          {type === 'image' ? (
            <img 
              src={currentUrl} 
              alt="Preview" 
              className="w-full max-w-xs h-32 object-cover rounded border"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded border">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">Arquivo de áudio</p>
                <p className="text-xs text-gray-500">{currentUrl}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
