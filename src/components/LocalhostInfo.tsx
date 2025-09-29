'use client'

export default function LocalhostInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            ℹ️ Funcionamento em Localhost
          </h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              <strong>✅ SIM</strong>, a rádio funciona perfeitamente em localhost (http://localhost:3000)
            </p>
            <div className="bg-white bg-opacity-50 rounded p-2 text-xs">
              <p><strong>Como funciona:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>O stream é público e acessível via HTTPS</li>
                <li>Não há restrições CORS para áudio</li>
                <li>Funciona em qualquer navegador moderno</li>
                <li>Não precisa de servidor externo</li>
              </ul>
            </div>
            <p className="text-xs">
              <strong>Fonte:</strong> URLs extraídas de{' '}
              <a 
                href="https://www.radios.com.br/aovivo/radio-band-961-fm/18874" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                radios.com.br
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



