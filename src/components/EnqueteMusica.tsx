'use client'

import { useState, useEffect } from 'react'
import { EnqueteResultado } from '@/types'

const GENEROS = ['Sertanejo', 'Pagode', 'MBP', 'Gaúcha', 'Latina', 'Rock']

const ICONES_GENERO: { [key: string]: string } = {
  'Sertanejo': '🎸',
  'Pagode': '🥁',
  'MBP': '🎹',
  'Gaúcha': '🎺',
  'Latina': '💃',
  'Rock': '🎤'
}

const CORES_GENERO: { [key: string]: string } = {
  'Sertanejo': 'bg-yellow-500',
  'Pagode': 'bg-blue-500',
  'MBP': 'bg-green-500',
  'Gaúcha': 'bg-red-500',
  'Latina': 'bg-pink-500',
  'Rock': 'bg-gray-700'
}

export default function EnqueteMusica() {
  const [resultados, setResultados] = useState<EnqueteResultado[]>([])
  const [generoSelecionado, setGeneroSelecionado] = useState<string | null>(null)
  const [jaVotou, setJaVotou] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    fetchResultados()
    verificarVoto()
  }, [])

  const verificarVoto = () => {
    const votou = localStorage.getItem('enquete_musica_votou')
    if (votou === 'true') {
      setJaVotou(true)
    }
  }

  const fetchResultados = async () => {
    try {
      const response = await fetch('/api/enquete-musica')
      const data = await response.json()
      setResultados(data)
    } catch (error) {
      console.error('Error fetching results:', error)
    }
  }

  const handleVotar = async () => {
    if (!generoSelecionado || jaVotou) return

    setLoading(true)
    try {
      const response = await fetch('/api/enquete-musica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero: generoSelecionado }),
      })

      const data = await response.json()

      if (response.ok) {
        setJaVotou(true)
        localStorage.setItem('enquete_musica_votou', 'true')
        setMensagem('Voto registrado!')
        // Esperar un poco y actualizar resultados
        setTimeout(async () => {
          await fetchResultados()
          setMensagem('')
        }, 500)
      } else {
        setMensagem(data.message || 'Erro ao votar')
        if (data.jaVotou) {
          setJaVotou(true)
          localStorage.setItem('enquete_musica_votou', 'true')
          await fetchResultados()
        }
      }
    } catch (error) {
      setMensagem('Erro ao registrar voto')
    } finally {
      setLoading(false)
    }
  }

  const totalVotos = resultados.reduce((acc, r) => acc + r.votos, 0)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Título igual al de noticias */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-bandfm-orange-500 text-white text-left py-3 px-6 rounded-full">
            <h2 className="text-lg font-helvetica-black font-extrabold uppercase tracking-wider">
              Qual seu estilo de música favorito?
            </h2>
          </div>
        </div>

        {/* Contenido compacto */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Opciones en fila horizontal */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {GENEROS.map((genero) => (
              <button
                key={genero}
                onClick={() => !jaVotou && setGeneroSelecionado(genero)}
                disabled={jaVotou}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-semibold flex flex-col items-center gap-1 ${
                  generoSelecionado === genero
                    ? 'border-bandfm-orange-500 bg-bandfm-orange-50 text-bandfm-orange-700'
                    : 'border-gray-200 hover:border-bandfm-orange-300 text-gray-700'
                } ${jaVotou ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
              >
                <span className="text-2xl">{ICONES_GENERO[genero]}</span>
                <span>{genero}</span>
              </button>
            ))}
          </div>

          {/* Resultados compactos en línea */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs mb-4">
            {resultados.map((resultado) => (
              <div key={resultado.genero} className="text-center">
                <div className="font-bold text-gray-900 mb-1">{resultado.genero}</div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full ${CORES_GENERO[resultado.genero]} transition-all duration-1000`}
                    style={{ width: `${resultado.porcentagem}%` }}
                  />
                </div>
                <div className="font-bold text-bandfm-orange-600">
                  {resultado.porcentagem.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {/* Botón de votar abajo */}
          <div className="text-center">
            {!jaVotou ? (
              <button
                onClick={handleVotar}
                disabled={!generoSelecionado || loading}
                className={`px-8 py-2 rounded-lg font-bold text-white text-sm transition-all ${
                  !generoSelecionado || loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-bandfm-orange-500 hover:bg-bandfm-orange-600 shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? 'Votando...' : 'Votar'}
              </button>
            ) : (
              <div className="text-sm font-semibold text-green-600">
                ✓ Voto registrado - Obrigado!
              </div>
            )}
          </div>

          {/* Mensaje */}
          {mensagem && (
            <div className="mt-3 text-center text-sm text-green-600 font-semibold">
              {mensagem}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

