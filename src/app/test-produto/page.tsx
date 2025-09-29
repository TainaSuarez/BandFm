'use client'

import { useState } from 'react'

export default function TestProdutoPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testCreateProduto = async () => {
    setLoading(true)
    setResult('')

    try {
      const testData = {
        nome: 'Produto Teste',
        descricao: 'Descrição do produto teste',
        imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        preco: 29.90,
        empresaId: 'cmfyka7ve0000riw8e8w8iz7f', // ID do Restaurante Sabor da Casa
        ativo: true
      }

      console.log('Sending test data:', testData)

      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setResult(`✅ SUCCESS: ${JSON.stringify(data, null, 2)}`)
      } else {
        setResult(`❌ ERROR: ${JSON.stringify(data, null, 2)}`)
      }
    } catch (error: any) {
      console.error('Network error:', error)
      setResult(`❌ NETWORK ERROR: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Produto Creation</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <button
            onClick={testCreateProduto}
            disabled={loading}
            className="bg-blue-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Create Produto'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

