'use client'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Band FM</h1>
        <p className="text-xl text-gray-600">Página de teste funcionando!</p>
        <div className="mt-8 space-y-4">
          <a 
            href="/login" 
            className="block bg-blue-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Login Admin
          </a>
          <a 
            href="/login-empresa" 
            className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Login Empresa
          </a>
          <a 
            href="/admin" 
            className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Admin Dashboard
          </a>
          <a 
            href="/empresa" 
            className="block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Empresa Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
