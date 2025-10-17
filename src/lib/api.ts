/**
 * Utilidades para Server Components
 * Estas funciones se ejecutan en el servidor y cargan datos con caché
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Función para hacer fetch con caché y revalidación automática
async function fetchAPI<T>(endpoint: string, revalidate: number = 60): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { 
        revalidate, // Revalidar cada X segundos
        tags: [endpoint]
      },
      cache: 'force-cache'
    })
    
    if (!response.ok) {
      console.error(`Error fetching ${endpoint}:`, response.status)
      return [] as T
    }
    
    return response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return [] as T
  }
}

// API functions para cada recurso
export async function getNoticias() {
  return fetchAPI('/api/noticias', 30) // Revalidar cada 30 segundos
}

export async function getNoticia(id: string) {
  return fetchAPI(`/api/noticias/${id}`, 60)
}

export async function getProgramacao() {
  return fetchAPI('/api/programacao', 300) // Revalidar cada 5 minutos
}

export async function getPodcasts() {
  return fetchAPI('/api/podcasts?active=true', 60)
}

export async function getPromocoes() {
  return fetchAPI('/api/promocoes', 60)
}

export async function getBanners() {
  return fetchAPI('/api/banners?active=true', 60)
}

export async function getGaleria() {
  return fetchAPI('/api/galeria', 120)
}

