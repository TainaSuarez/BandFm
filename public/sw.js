self.addEventListener('install', (event) => {
  // Activación inmediata tras instalación
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Tomar control de las páginas abiertas
  event.waitUntil(clients.claim())
})

// Estrategia mínima: pasar las solicitudes sin cachear (placeholder)
self.addEventListener('fetch', () => {})